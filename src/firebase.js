import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSGZv8-xB2AH9Snq7dtHPjmi3SNZErHWA",
  authDomain: "promptwarswarmpup.firebaseapp.com",
  projectId: "promptwarswarmpup",
  storageBucket: "promptwarswarmpup.firebasestorage.app",
  messagingSenderId: "599051473410",
  appId: "1:599051473410:web:d68499628cbe096adc8d1b",
  measurementId: "G-6P9M6GR4H7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "promptwars");
