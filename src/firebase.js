import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJdR5ASC4lDhD4AF_-CMwYqSLci9xdiVI",
  authDomain: "safesignal-hackathon-f0709.firebaseapp.com",
  projectId: "safesignal-hackathon-f0709",
  storageBucket: "safesignal-hackathon-f0709.firebasestorage.app",
  messagingSenderId: "174334234620",
  appId: "1:174334234620:web:ee35402a92926108e42c79"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;