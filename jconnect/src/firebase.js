// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKyYBc5dmsAinRn-4jh1nAx8Fcz4CFE8k",
  authDomain: "jiitconnect-362d4.firebaseapp.com",
  projectId: "jiitconnect-362d4",
  storageBucket: "jiitconnect-362d4.firebasestorage.app",
  messagingSenderId: "281170551989",
  appId: "1:281170551989:web:2913dedd7cbf73638b4afc",
  measurementId: "G-14NXDKVWBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app,auth };