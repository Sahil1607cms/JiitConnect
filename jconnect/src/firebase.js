import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKyYBc5dmsAinRn-4jh1nAx8Fcz4CFE8k",
  authDomain: "jiitconnect-362d4.firebaseapp.com",
  projectId: "jiitconnect-362d4",
  storageBucket: "jiitconnect-362d4.appspot.com",
  messagingSenderId: "281170551989",
  appId: "1:281170551989:web:2913dedd7cbf73638b4afc",
  measurementId: "G-14NXDKVWBX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
