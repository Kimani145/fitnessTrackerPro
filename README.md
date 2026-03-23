# FitnessTrackerPro

A React + TypeScript fitness platform with Firebase Authentication + Firestore, seeded workout tracks, and authenticated app experience.

## What Is Implemented

- Public landing page for non-authenticated users at `/`
- Authenticated users are redirected directly to `/app/workouts`
- Firestore workout seeding for:
  - Chest (Beginner, Intermediate, Advanced)
  - Abs (Beginner, Intermediate, Advanced)
  - Legs (Beginner, Intermediate, Advanced)
  - Kegels (Beginner, Intermediate, Advanced)
- Firestore production rules for `users`, `posts`, and `workouts`
- Theme support (light/dark/system) with global switcher
- Console logging utility for app/auth/theme/data flow

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Firebase Auth
- Cloud Firestore
- React Router

## Environment Setup

Create `.env` in project root:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

## Local Development

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
npm run preview
```

## Firestore Rules (Production)

Rules file: `firestore.rules`

Deploy rules:

```bash
firebase deploy --only firestore:rules
```

If needed, first initialize Firebase in this repo:

```bash
firebase login
firebase use <your-project-id>
```

## Firestore Data Model (Current)

### `users/{uid}`

- `uid: string`
- `email: string`
- `name: string`
- `createdAt`
- `updatedAt`

### `posts/{postId}`

- `content: string`
- `userId: string`
- `userName: string`
- `createdAt`

### `workouts/{workoutId}`

- `name: string`
- `description: string`
- `type: string`
- `category: 'Chest' | 'Abs' | 'Legs' | 'Kegels'`
- `level: 'Beginner' | 'Intermediate' | 'Advanced'`
- `difficulty: string`
- `duration: number`
- `calories: number`
- `image: string`
- `lastPerformed: string | null`
- `exercises: ExerciseDetail[]`
- `createdBy: string`

## Seeding Behavior

Workout seeding runs after authenticated session restore:

- If `workouts` collection is empty, app inserts the 12 starter workouts
- If collection already has data, no additional seed writes are made

## UX Routing Behavior

- Guest user:
  - `/` => Landing page
  - Can navigate to `/login` or `/signup`
- Authenticated user:
  - `/` => redirected to `/app/workouts`
  - `/login` and `/signup` => redirected to `/app/workouts`

## Troubleshooting

### `Missing or insufficient permissions`

1. Deploy the latest `firestore.rules`
2. Confirm your app is using the correct Firebase project ID
3. Sign out/in again to refresh auth token
4. Ensure requests match allowed data shape (especially for `users` and `workouts`)

### Workouts not appearing

1. Ensure user is authenticated
2. Check Firestore `workouts` collection in Firebase Console
3. Check browser console logs for seed/read failures

### Offline message visible

1. Verify internet connection
2. Check browser devtools Network tab
3. Re-open app after network returns

## Important Files

- `src/App.tsx` - auth routing + landing/workout redirect + seed trigger
- `src/pages/LandingPage.tsx` - guest-first entry page
- `src/firebase/workouts.ts` - Firestore workouts read + seed logic
- `src/components/features/Workouts.tsx` - loads workouts from Firestore
- `src/components/services/workoutService.ts` - local cache helpers
- `firestore.rules` - production security rules

