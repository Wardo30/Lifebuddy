// app/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence,} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp5nHoXXvcKlmBfvaGsRcupz8yFgf4-7g",
  authDomain: "lifebuddy-b857c.firebaseapp.com",
  projectId: "lifebuddy-b857c",
  storageBucket: "lifebuddy-b857c.firebasestorage.app",
  messagingSenderId: "440862077299",
  appId: "1:440862077299:web:2224a49bc6fa407f845506"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Firestore (for Planner, Notes, etc.)
const db = getFirestore(app);

export { auth, db };