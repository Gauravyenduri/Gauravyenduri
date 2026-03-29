import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjDuqzVlUra3tGXT0ySN4uqfzIBAuSJRk",
  authDomain: "gaurav-portfolio-7ad50.firebaseapp.com",
  projectId: "gaurav-portfolio-7ad50",
  storageBucket: "gaurav-portfolio-7ad50.firebasestorage.app",
  messagingSenderId: "647439974429",
  appId: "1:647439974429:web:82b41c487721514cbc46f4",
  measurementId: "G-2LBTEB9F6X"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
