# SalesPoint 🛍️✨
### Immersive 3D Shopping Experience & Voice AI Price Comparison Engine

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgauravkr2209%2Fsalespoint&env=PUBLIC_SUPABASE_URL,PUBLIC_SUPABASE_ANON_KEY)

SalesPoint is India's smartest multi-store price-comparison engine comparing **400+ real verified products across 8 major instant delivery and e-commerce platforms**:
**Blinkit, Zepto, Flipkart Minutes, Amazon India, Flipkart, Instamart, Croma, and Myntra.**

---

## 🌟 Key Features

- 🎮 **Immersive 3D Product Stage**: Three.js interactive 3D showcase with dynamic procedural products (Cold Soda Can, Flagship Smartphone, Crisp Snack Bag, ANC Headphones), neon pedestal, and mouse drag orbit.
- 🎙️ **Voice AI Shopping Assistant**: Integrated Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with real-time transcription, audio waveforms, unit-economics intelligence (₹/100g, ₹/L), and voice read-aloud.
- 📦 **Multi-Store Price Spread Visualizer**: Interactive 3D comparison bars highlighting the lowest verified offer, delivery speed, and instant savings across 8 stores.
- 🔍 **Spotify-Style Instant Search**: Keyboard-navigable fast search with live entity chips, recent searches, category cards, and instant filtering.
- 👤 **Customer Profiles & Wishlist**: Dedicated `/profile` dashboard with wishlist management, instant price-drop alerts, 10-minute delivery pincode locator, and merchant filters.
- ⚡ **Supabase Cloud Database Ready**: Pre-configured database layer in `src/lib/supabase/client.ts` for cloud persistence of profiles, wishlists, and price alerts with local storage fallback.
- 🖱️ **Magnetic 3D Cursor**: Custom dual-layer interactive cursor with smooth spring damping and pointer-aware card tilt physics.
- 📱 **Fully Flexible & Responsive**: Adaptive layout engineered for mobile phones, iPads/tablets, laptops, and ultra-wide desktop displays.

---

## 🚀 One-Click Deployment to Vercel

Click the button below to deploy this repository directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgauravkr2209%2Fsalespoint&env=PUBLIC_SUPABASE_URL,PUBLIC_SUPABASE_ANON_KEY)

Alternatively, deploy using the Vercel CLI:
```bash
npm install -g vercel
vercel
```

---

## 🗄️ Supabase Database Setup

SalesPoint comes with a production-ready schema migration script located in [`supabase/schema.sql`](supabase/schema.sql).

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In your Supabase Dashboard, go to the **SQL Editor**.
3. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
   This automatically provisions:
   - `public.profiles`: Stores customer profile, delivery address, and store preferences.
   - `public.wishlist`: Persists wishlisted products.
   - `public.price_alerts`: Tracks target price alerts for instant notifications.
   - `public.chat_messages`: Optional telemetry for voice AI shopping conversations.

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your project credentials from **Project Settings > API**:
```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(When deploying to Vercel, add these same two variables in the **Environment Variables** section of your Vercel project settings).*

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/gauravkr2209/salespoint.git
cd salespoint

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` to explore the app.

---

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5 Runes (`$state`, `$derived`, `$effect`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Database & Sync**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Voice Engine**: HTML5 Web Speech API (`webkitSpeechRecognition` & `SpeechSynthesis`)
- **Charts**: [Chart.js](https://www.chartjs.org/) for 90-day price trends
- **Hosting**: [Vercel](https://vercel.com/)
