import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtWMZZ-HCNZOPGO1Qq6Wci2oTqe4Ah0rM",
  authDomain: "flipkart-clone-a10be.firebaseapp.com",
  projectId: "flipkart-clone-a10be",
  storageBucket: "flipkart-clone-a10be.firebasestorage.app",
  messagingSenderId: "257219436074",
  appId: "1:257219436074:web:70b3a172f5c728982eed53",
  measurementId: "G-G3WY8QZWM4"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);