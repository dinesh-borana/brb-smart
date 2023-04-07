// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALdkM6k4ELWDWb37M1YonLHMFCgI2KN0U",
  authDomain: "task-manager-e5ba5.firebaseapp.com",
  projectId: "task-manager-e5ba5",
  storageBucket: "task-manager-e5ba5.appspot.com",
  messagingSenderId: "304671042810",
  appId: "1:304671042810:web:585a772582dcc3572c2d43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
