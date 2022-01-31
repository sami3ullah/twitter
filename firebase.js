// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// importing functions from firebae SDK
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJol0rXOBeRD9tF5y5CkeGeYfCUP2kYts",
  authDomain: "twitter-8eb9b.firebaseapp.com",
  projectId: "twitter-8eb9b",
  storageBucket: "twitter-8eb9b.appspot.com",
  messagingSenderId: "948255647823",
  appId: "1:948255647823:web:e5ca159ba3fc84bd7b623a",
  measurementId: "G-10NBBYBECV",
};

// initialize firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };