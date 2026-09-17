// Public runtime configuration of the storefront. Nothing here is secret:
// the Firebase web config is meant to ship in the bundle, and the worker
// decides who may buy. Values come from NEXT_PUBLIC_* at build time so the
// same code serves preview and production.
export const API_BASE =
  process.env.NEXT_PUBLIC_YORIX_API ?? 'https://babysleepcoach-ai-proxy.babysleepcoach.workers.dev';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'yorix-app.firebaseapp.com',
  projectId: 'yorix-app',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.appId);
