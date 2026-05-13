
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAFygHP6i6RTgRaO44ls_iLHnTLk2VjIv4",
  authDomain: "hs3-blog.firebaseapp.com",
  databaseURL: "https://hs3-blog-default-rtdb.firebaseio.com",
  projectId: "hs3-blog",
  storageBucket: "hs3-blog.firebasestorage.app",
  messagingSenderId: "235028134912",
  appId: "1:235028134912:web:746a1211681a0484872ce5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
