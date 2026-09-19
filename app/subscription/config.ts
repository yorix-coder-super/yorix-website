// Public runtime configuration of the storefront. Nothing here is secret:
// the Firebase web config (web app «yorix-app.com» of project yorix-app) is
// meant to ship in the bundle, and the worker decides who may buy.
// NEXT_PUBLIC_* at build time overrides the defaults for previews.
export const API_BASE =
  process.env.NEXT_PUBLIC_YORIX_API ?? 'https://babysleepcoach-ai-proxy.babysleepcoach.workers.dev';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyAOqDC4AbndHSGlUc5-EmMVCcTf-zIYbvo',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'yorix-app.firebaseapp.com',
  projectId: 'yorix-app',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:157471939686:web:d6b18db76907048469e1a7',
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.appId);

// Cloudflare Turnstile guards the contact form once the owner sets a key
// here and TURNSTILE_SECRET in the worker; empty means the form runs plain.
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
