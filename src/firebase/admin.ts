import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEdSPwAig02H7GyJnh8KM-Ug7tapLW-rE",
  authDomain: "grow-simple-a6bae.firebaseapp.com",
  projectId: "grow-simple-a6bae",
  storageBucket: "grow-simple-a6bae.appspot.com",
  messagingSenderId: "477276060540",
  appId: "1:477276060540:web:04baf5ba93eebb487f02f9",
  measurementId: "G-189B6PHGCP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
