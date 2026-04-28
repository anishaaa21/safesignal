import { db, auth } from '../firebase';
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, getDoc, getDocs, onSnapshot,
  serverTimestamp, increment, query, where
} from 'firebase/firestore';

// ── REPORTS ──────────────────────────────────────

export async function submitReport(reportData) {
  try {
    const docRef = await addDoc(collection(db, 'reports'), {
      userId: auth.currentUser.uid,
      ...reportData,
      upvotes: 0,
      downvotes: 0,
      timestamp: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function listenToReports(callback) {
  return onSnapshot(collection(db, 'reports'), (snapshot) => {
    const reports = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(reports);
  });
}

export async function upvoteReport(reportId) {
  await updateDoc(doc(db, 'reports', reportId), { upvotes: increment(1) });
}

export async function downvoteReport(reportId) {
  await updateDoc(doc(db, 'reports', reportId), { downvotes: increment(1) });
}

// ── TRUSTED CONTACTS ─────────────────────────────

export async function addTrustedContact(contact) {
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    const currentContacts = userSnap.data()?.trustedContacts || [];

    if (currentContacts.find(c => c.email === contact.email)) {
      return { success: false, error: 'Contact already added' };
    }

    await updateDoc(userRef, {
      trustedContacts: [...currentContacts, contact]
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function removeTrustedContact(email) {
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    const updated = (userSnap.data()?.trustedContacts || [])
      .filter(c => c.email !== email);

    await updateDoc(userRef, { trustedContacts: updated });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getTrustedContacts() {
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    return userSnap.data()?.trustedContacts || [];
  } catch (error) {
    return [];
  }
}

// ── JOURNEYS ─────────────────────────────────────

export async function createJourney(journeyData) {
  try {
    const docRef = await addDoc(collection(db, 'journeys'), {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      ...journeyData,
      status: 'active',
      startedAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateJourneyLocation(journeyId, location) {
  try {
    await updateDoc(doc(db, 'journeys', journeyId), {
      currentLocation: location,
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error('Location update error:', error);
  }
}

export async function completeJourney(journeyId) {
  await updateDoc(doc(db, 'journeys', journeyId), {
    status: 'completed'
  });
}

export async function getJourneyByToken(shareToken) {
  try {
    const q = query(
      collection(db, 'journeys'),
      where('shareToken', '==', shareToken)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}

export function listenToJourney(journeyId, callback) {
  return onSnapshot(doc(db, 'journeys', journeyId), (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    }
  });
}