import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  getDocs,
  query,
  orderBy 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ProduceBatch, Waybill, UserAccount } from '../types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth instance
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore instance (with named database ID from config)
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Google Sign-In helper
export const signInWithGoogle = async (): Promise<UserAccount | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    
    const userAccount: UserAccount = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'Authenticated User',
      email: firebaseUser.email || '',
      role: 'Quality Control Inspector',
      assignedDepot: 'Goaso Central Depot',
      phone: firebaseUser.phoneNumber || '+233 24 123 4567'
    };

    // Save profile to Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      role: userAccount.role,
      assignedDepot: userAccount.assignedDepot,
      phone: userAccount.phone,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return userAccount;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign Out helper
export const logoutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// Auth State Observer
export const subscribeAuthState = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Real-time Batches Listener
export const subscribeBatches = (callback: (batches: ProduceBatch[]) => void) => {
  const batchesRef = collection(db, 'batches');
  return onSnapshot(batchesRef, (snapshot) => {
    const batchesData: ProduceBatch[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as ProduceBatch));
    
    if (batchesData.length > 0) {
      callback(batchesData);
    }
  }, (error) => {
    console.warn('Firestore batches snapshot listener notice:', error);
  });
};

// Real-time Waybills Listener
export const subscribeWaybills = (callback: (waybills: Waybill[]) => void) => {
  const waybillsRef = collection(db, 'waybills');
  return onSnapshot(waybillsRef, (snapshot) => {
    const waybillsData: Waybill[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Waybill));
    
    if (waybillsData.length > 0) {
      callback(waybillsData);
    }
  }, (error) => {
    console.warn('Firestore waybills snapshot listener notice:', error);
  });
};

// Save or Update Produce Batch in Firestore
export const saveBatchToFirestore = async (batch: ProduceBatch) => {
  try {
    const docRef = doc(db, 'batches', batch.id);
    await setDoc(docRef, { ...batch, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.error('Error saving batch to Firestore:', error);
  }
};

// Save or Update Waybill in Firestore
export const saveWaybillToFirestore = async (waybill: Waybill) => {
  try {
    const docRef = doc(db, 'waybills', waybill.id);
    await setDoc(docRef, { ...waybill, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.error('Error saving waybill to Firestore:', error);
  }
};

// Seed Initial Data to Firestore if collections are empty
export const seedFirestoreIfEmpty = async (initialBatches: ProduceBatch[], initialWaybills: Waybill[]) => {
  try {
    const batchesSnap = await getDocs(collection(db, 'batches'));
    if (batchesSnap.empty) {
      console.log('Seeding initial cocoa produce batches to Firestore...');
      for (const batch of initialBatches) {
        await saveBatchToFirestore(batch);
      }
    }

    const waybillsSnap = await getDocs(collection(db, 'waybills'));
    if (waybillsSnap.empty) {
      console.log('Seeding initial waybills to Firestore...');
      for (const waybill of initialWaybills) {
        await saveWaybillToFirestore(waybill);
      }
    }
  } catch (error) {
    console.warn('Firestore initial seeding notice:', error);
  }
};
