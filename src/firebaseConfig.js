// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCug6v9b7SVTgY6SXLDZCJoL0IaeUUAlqI",
  authDomain: "proyecto-software-i.firebaseapp.com",
  projectId: "proyecto-software-i",
  storageBucket: "proyecto-software-i.appspot.com", // <- corregido
  messagingSenderId: "114465650952",
  appId: "1:114465650952:web:5df0491adc131660b294bd",
  measurementId: "G-D3VCSWDZZ4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
