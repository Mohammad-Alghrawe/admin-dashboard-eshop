// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwV72h1eMz2rdRT3K1Hxdn2YUVfOH1gFw",
  authDomain: "admin-dashbaord-eshop.firebaseapp.com",
  projectId: "admin-dashbaord-eshop",
  storageBucket: "admin-dashbaord-eshop.appspot.com",
  messagingSenderId: "793494810649",
  appId: "1:793494810649:web:94b7b419ce33e6071bfa88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
