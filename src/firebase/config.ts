import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AppError } from '../lib/errors';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

if (!isFirebaseConfigured) {
  console.warn('Firebase env vars are missing. Auth/data features will not work until configured.');
}

const app = initializeApp(
  isFirebaseConfigured
    ? firebaseConfig
    : {
        apiKey: 'demo-key',
        authDomain: 'demo.firebaseapp.com',
        projectId: 'demo-project',
        storageBucket: 'demo-project.appspot.com',
        messagingSenderId: '000000000000',
        appId: '1:000000000000:web:demo000000000000000',
      }
);

export const auth = getAuth(app);
export const db = getFirestore(app);

export function assertFirebaseConfigured() {
  if (!isFirebaseConfigured) {
    throw new AppError(
      'Firebase is not configured. Add VITE_FIREBASE_* values to your .env file.',
      { code: 'firebase/not-configured' }
    );
  }
}
