import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// Server-only. All Firestore/Storage access goes through this Admin SDK
// instance from API routes and Server Components — the browser never talks
// to Firebase directly, so there is nothing to configure in Firestore/
// Storage security rules (the Admin SDK bypasses them entirely).

function getApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey || !storageBucket) {
    throw new Error(
      "Faltan variables de entorno de Firebase. Define FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY y FIREBASE_STORAGE_BUCKET " +
        "(ver README.md)."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });
}

let firestore: Firestore | null = null;

export function getDb(): Firestore {
  if (!firestore) firestore = getFirestore(getApp());
  return firestore;
}

export function getBucket() {
  return getStorage(getApp()).bucket();
}
