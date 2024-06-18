// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIMWZOms72Ib90KhSh7_f0cm26QMEQqZ4",
  authDomain: "netflixgpt-15c1a.firebaseapp.com",
  projectId: "netflixgpt-15c1a",
  storageBucket: "netflixgpt-15c1a.appspot.com",
  messagingSenderId: "794109380425",
  appId: "1:794109380425:web:03c9dd81454fc2be073c98",
  measurementId: "G-Y4QKYM3J7D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
