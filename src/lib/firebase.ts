import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase config for hs3-blog visitor counter
const firebaseConfig = {
  apiKey: "AIzaSyCgW7Kj8xMhN2pQ4rT6vU9wX0yZ1aB3cDe",
  authDomain: "hs3-blog.firebaseapp.com",
  databaseURL: "https://hs3-blog-default-rtdb.firebaseio.com",
  projectId: "hs3-blog",
  storageBucket: "hs3-blog.firebasestorage.app",
  messagingSenderId: "235028134912",
  appId: "1:235028134912:web:746a1211681a0484872ce5"
};

// Initialize Firebase - wrap in try/catch to prevent startup errors
// when the config is invalid or placeholder
let db: ReturnType<typeof getDatabase> | null = null;
let firebaseReady = false;
try {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  firebaseReady = true;
  console.log('[firebase] Initialized successfully.');
} catch (e) {
  console.warn('[firebase] Initialization failed. ViewCounter will use fallback mode.', e);
  db = null;
  firebaseReady = false;
}

export { db, firebaseReady };
