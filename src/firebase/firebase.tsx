import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),

  // apiKey: String(process.env.VITE_FIREBASE_API_KEY),
  // authDomain: String(process.env.VITE_FIREBASE_AUTH_DOMAIN),
  // projectId: String(process.env.VITE_FIREBASE_PROJECT_ID),
  // storageBucket: String(process.env.VITE_FIREBASE_STORAGE_BUCKET),
  // messagingSenderId: String(process.env.VITE_FIREBASE_MESSAGE_SENDER_ID),
  // appId: String(process.env.VITE_FIREBASE_APP_ID),
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
