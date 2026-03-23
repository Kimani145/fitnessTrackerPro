import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, assertFirebaseConfigured } from './config';
import { AppError, toAppError } from '../lib/errors';

export type SocialPost = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    uid: string;
    name: string;
  };
};

function toIsoString(timestamp: unknown): string {
  if (timestamp && typeof timestamp === 'object' && 'toDate' in (timestamp as object)) {
    const date = (timestamp as { toDate: () => Date }).toDate();
    return date.toISOString();
  }

  return new Date().toISOString();
}

export async function getPosts(): Promise<SocialPost[]> {
  assertFirebaseConfigured();

  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(100));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docItem) => {
      const data = docItem.data();
      return {
        id: docItem.id,
        content: String(data.content || ''),
        createdAt: toIsoString(data.createdAt),
        user: {
          uid: String(data.userId || ''),
          name: String(data.userName || 'User'),
        },
      };
    });
  } catch (error) {
    throw toAppError(error, 'Failed to load posts. Please refresh and try again.');
  }
}

export async function createPost(content: string) {
  assertFirebaseConfigured();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new AppError('Please sign in before posting.', { code: 'auth/not-authenticated' });
  }

  const trimmed = content.trim();
  if (!trimmed) {
    throw new AppError('Post content cannot be empty.', { code: 'post/empty-content' });
  }

  try {
    await addDoc(collection(db, 'posts'), {
      content: trimmed,
      userId: currentUser.uid,
      userName: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw toAppError(error, 'Unable to publish your post right now.');
  }
}
