import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// 🔐 Google Login
export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await createUserProfile(result.user);

    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 👤 Create user in Firestore
export async function createUserProfile(user) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      trustedContacts: [],
      createdAt: serverTimestamp(),
    });
  }
}

// 📄 Get user profile
export async function getUserProfile(uid) {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    return userSnap.exists() ? userSnap.data() : null;
  } catch (error) {
    return null;
  }
}

// 🚪 Logout
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}