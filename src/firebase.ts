// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBouvJsvh_4VTK88A4D4gXJL5Qd7SN7KpE",
  authDomain: "fir-crud-app-70357.firebaseapp.com",
  projectId: "fir-crud-app-70357",
  storageBucket: "fir-crud-app-70357.appspot.com",
  messagingSenderId: "842000590282",
  appId: "1:842000590282:web:c5069bd2cf55f26c93db33",
  measurementId: "G-45ZLTP8TNW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const db = getFirestore(app)

// console.log('firebase initializeApp');