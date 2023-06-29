// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyEE7lL0RDNqt-ttESq-pz9KTTYAyl2EI",
  authDomain: "react-firebase-77265.firebaseapp.com",
  projectId: "react-firebase-77265",
  storageBucket: "react-firebase-77265.appspot.com",
  messagingSenderId: "560590388980",
  appId: "1:560590388980:web:fd2c48c5dfa7adccffe8a1",
  measurementId: "G-JEGSDLWMD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
