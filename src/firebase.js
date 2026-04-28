import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAv47CuLYkyvkn6dOqHu9JoDlooc-qREng",
  authDomain: "safesignal-ec077.firebaseapp.com",
  projectId: "safesignal-ec077",
  appId: "1:298284500715:web:35f1221b850d96a72e20ae",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;