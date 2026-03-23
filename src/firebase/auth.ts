import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AppError, toAppError } from '../lib/errors';
import { auth, db, assertFirebaseConfigured } from './config';

export type UserProfile = {
  uid: string;
  email: string;
  name: string;
};

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/missing-password': 'Please enter your password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/user-disabled': 'This account has been disabled. Contact support.',
  'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
  'auth/email-already-in-use': 'This email is already in use. Please sign in instead.',
  'auth/weak-password': 'Use a stronger password with at least 6 characters.',
  'auth/network-request-failed': 'Network issue detected. Check your connection and retry.',
  'auth/user-not-found': 'No account found for this email.',
};

function mapFirebaseAuthError(error: unknown, fallbackMessage: string): AppError {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String((error as { code?: string }).code || '');
    const message = AUTH_ERROR_MESSAGES[code] || fallbackMessage;
    return new AppError(message, { code, cause: error });
  }

  return toAppError(error, fallbackMessage);
}

function getSafeName(user: User) {
  const emailName = user.email?.split('@')[0] || 'Member';
  return user.displayName || emailName;
}

async function upsertAndGetUserProfile(user: User): Promise<UserProfile> {
  assertFirebaseConfigured();

  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  const inferredName = getSafeName(user);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || '',
      name: inferredName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await setDoc(
      userRef,
      {
        email: user.email || '',
        name: snapshot.data().name || inferredName,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  const updated = await getDoc(userRef);
  const data = updated.data() || {};

  return {
    uid: user.uid,
    email: (data.email as string) || user.email || '',
    name: (data.name as string) || inferredName,
  };
}

export async function signUpWithEmailPassword(name: string, email: string, password: string) {
  assertFirebaseConfigured();

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    if (name.trim()) {
      await updateProfile(credential.user, { displayName: name.trim() });
    }

    await setDoc(
      doc(db, 'users', credential.user.uid),
      {
        uid: credential.user.uid,
        email: credential.user.email || email,
        name: name.trim() || credential.user.displayName || email.split('@')[0],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return upsertAndGetUserProfile(credential.user);
  } catch (error) {
    throw mapFirebaseAuthError(error, 'Unable to create account right now. Please try again.');
  }
}

export async function signInWithEmailPassword(email: string, password: string) {
  assertFirebaseConfigured();

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return upsertAndGetUserProfile(credential.user);
  } catch (error) {
    throw mapFirebaseAuthError(error, 'Unable to sign in right now. Please try again.');
  }
}

export async function sendPasswordReset(email: string) {
  assertFirebaseConfigured();

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw mapFirebaseAuthError(error, 'Unable to send reset link right now. Please try again.');
  }
}

export async function signOutCurrentUser() {
  assertFirebaseConfigured();

  try {
    await signOut(auth);
  } catch (error) {
    throw mapFirebaseAuthError(error, 'Unable to sign out right now. Please try again.');
  }
}

export async function getCurrentUserProfile(user: User): Promise<UserProfile> {
  try {
    return await upsertAndGetUserProfile(user);
  } catch (error) {
    throw toAppError(error, 'Could not load your profile.');
  }
}

export function observeAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
