import { createClient } from '@supabase/supabase-js';
import type { User, PriceAlertItem } from '$lib/auth/store';

// Support both standard Vite and SvelteKit public env naming conventions
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  '';

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// ==========================================
// SUPABASE DATABASE SYNC HELPERS
// ==========================================

export interface SupabaseProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  city?: string;
  pincode?: string;
  preferred_stores?: string[];
  notification_settings?: Record<string, boolean>;
  updated_at?: string;
}

/**
 * Upsert user profile into Supabase
 */
export async function syncUserProfile(user: User): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        phone: user.phone || '',
        city: user.city || '',
        pincode: user.pincode || '',
        preferred_stores: user.preferredStores || [],
        notification_settings: user.notificationPreferences || {
          email: true,
          whatsapp: true,
          priceDropInstant: true
        },
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' });

    if (error) {
      console.warn('[Supabase] Failed to sync profile:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Error syncing profile:', err);
    return false;
  }
}

/**
 * Fetch profile from Supabase by email
 */
export async function fetchUserProfile(email: string): Promise<Partial<User> | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      phone: data.phone,
      city: data.city,
      pincode: data.pincode,
      preferredStores: data.preferred_stores,
      notificationPreferences: data.notification_settings
    };
  } catch (err) {
    console.warn('[Supabase] Error fetching profile:', err);
    return null;
  }
}

/**
 * Sync Wishlist items to Supabase
 */
export async function syncWishlistToSupabase(userEmail: string, productIds: string[]): Promise<boolean> {
  if (!supabase || !userEmail) return false;
  try {
    // 1. Clear existing items for this user
    await supabase.from('wishlist').delete().eq('user_email', userEmail);

    // 2. Insert new items if any
    if (productIds.length > 0) {
      const records = productIds.map(productId => ({
        user_email: userEmail,
        product_id: productId,
        created_at: new Date().toISOString()
      }));
      const { error } = await supabase.from('wishlist').insert(records);
      if (error) {
        console.warn('[Supabase] Failed to sync wishlist:', error.message);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Error syncing wishlist:', err);
    return false;
  }
}

/**
 * Fetch Wishlist items from Supabase
 */
export async function fetchWishlistFromSupabase(userEmail: string): Promise<string[] | null> {
  if (!supabase || !userEmail) return null;
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .select('product_id')
      .eq('user_email', userEmail);

    if (error || !data) return null;
    return data.map(row => row.product_id);
  } catch (err) {
    console.warn('[Supabase] Error fetching wishlist:', err);
    return null;
  }
}

/**
 * Sync Price Alerts to Supabase
 */
export async function syncPriceAlertsToSupabase(userEmail: string, alerts: PriceAlertItem[]): Promise<boolean> {
  if (!supabase || !userEmail) return false;
  try {
    // Upsert alerts
    if (alerts.length > 0) {
      const rows = alerts.map((a, idx) => ({
        id: `${userEmail}_${a.productId}_${idx}`,
        user_email: userEmail,
        product_id: a.productId,
        target_price: a.targetPrice,
        current_price: 0,
        created_at: a.createdAt
      }));
      const { error } = await supabase.from('price_alerts').upsert(rows, { onConflict: 'id' });
      if (error) {
        console.warn('[Supabase] Failed to sync alerts:', error.message);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Error syncing alerts:', err);
    return false;
  }
}

/**
 * Fetch Price Alerts from Supabase
 */
export async function fetchPriceAlertsFromSupabase(userEmail: string): Promise<PriceAlertItem[] | null> {
  if (!supabase || !userEmail) return null;
  try {
    const { data, error } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('user_email', userEmail);

    if (error || !data) return null;
    return data.map(row => ({
      productId: row.product_id,
      targetPrice: Number(row.target_price),
      createdAt: row.created_at
    }));
  } catch (err) {
    console.warn('[Supabase] Error fetching alerts:', err);
    return null;
  }
}
