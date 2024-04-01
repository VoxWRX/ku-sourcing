
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyAOlhHFV-09QQGA9N5WJBPFhJGRfth9i2c",
  authDomain: "kuaisourcing.firebaseapp.com",
  projectId: "kuaisourcing",
  storageBucket: "kuaisourcing.appspot.com",
  messagingSenderId: "409819588969",
  appId: "1:409819588969:web:02087774c951fda7f6b5f8",
  measurementId: "G-0JKS27WHWW"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();


