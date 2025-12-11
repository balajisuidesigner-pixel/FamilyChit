// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVprJQQ9lO_aGJHtwKvaVIkqpjhGeyPmg",
  authDomain: "familychit-501e5.firebaseapp.com",
  projectId: "familychit-501e5",
  storageBucket: "familychit-501e5.firebasestorage.app",
  messagingSenderId: "569624572010",
  appId: "1:569624572010:web:cdae81fe069480389c9a13",
  measurementId: "G-15HBFNXJWS"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
export { db };