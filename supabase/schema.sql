-- ==============================================================================
-- SALESPOINT 3D & VOICE AI — SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT,
    phone TEXT,
    city TEXT,
    pincode TEXT,
    preferred_stores TEXT[] DEFAULT '{}',
    notification_settings JSONB DEFAULT '{"priceDrops": true, "backInStock": true, "weeklyDeals": false, "instantNotifications": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Wishlist Table
CREATE TABLE IF NOT EXISTS public.wishlist (
    id BIGSERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    product_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Price Drop Alerts Table
CREATE TABLE IF NOT EXISTS public.price_alerts (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    product_id TEXT NOT NULL,
    target_price NUMERIC NOT NULL,
    current_price NUMERIC NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Shopping Assistant Chat Sessions (Optional telemetry/analytics)
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT,
    user_email TEXT,
    role TEXT CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    input_mode TEXT CHECK (input_mode IN ('text', 'voice')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR FAST LOOKUPS
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_wishlist_email ON public.wishlist(user_email);
CREATE INDEX IF NOT EXISTS idx_wishlist_product ON public.wishlist(product_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_email ON public.price_alerts(user_email);
CREATE INDEX IF NOT EXISTS idx_price_alerts_product ON public.price_alerts(product_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public access via anon key for demonstration & client sync
CREATE POLICY "Public profiles access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public wishlist access" ON public.wishlist FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public price alerts access" ON public.price_alerts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public chat messages access" ON public.chat_messages FOR ALL USING (true) WITH CHECK (true);
