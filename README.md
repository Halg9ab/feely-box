# The Feely Mood Box

A nail design idea generator based on your mood. Type how you're feeling — "soft and dreamy", "bold and confident", "autumn cozy" — and discover beautiful nail art to match.

## Getting Your Unsplash API Key

1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Sign in or create a free account
3. Click **New Application** and fill in the app details
4. Copy your **Access Key** (not the Secret Key)

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Unsplash key

Open `.env.local` in the project root and paste in your key:

```
UNSPLASH_ACCESS_KEY=your_actual_key_here
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

1. Push your code to GitHub — `.env.local` is git-ignored, so your key stays private
2. Go to [vercel.com](https://vercel.com) and click **Import Project**, then select your repo
3. In the Vercel project settings, open **Environment Variables**
4. Add a variable: **Name** `UNSPLASH_ACCESS_KEY`, **Value** your Unsplash Access Key
5. Click **Deploy**

## Tech Stack

- [Next.js 14+](https://nextjs.org/) — App Router, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) — icons
- [Unsplash API](https://unsplash.com/developers) — photos

## Features

- Mood-based nail design search powered by Unsplash
- "Surprise Me" button for random nail inspiration
- Heart any design to save it to your Favorites page
- Favorites persisted in localStorage — no account needed
- Responsive masonry grid: 1 column mobile → 4 columns desktop
- Loading skeletons and smooth fade-in animations
- All API calls server-side — your Unsplash key is never exposed to the browser

---

Photos provided by [Unsplash](https://unsplash.com/?utm_source=feely_mood_box&utm_medium=referral)
