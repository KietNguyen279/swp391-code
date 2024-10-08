// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbVzPg3hXFYrYLBoYvduUxeSQc4dDtZ98",
  authDomain: "koicaresystemathome.firebaseapp.com",
  projectId: "koicaresystemathome",
  storageBucket: "koicaresystemathome.appspot.com",
  messagingSenderId: "620586504016",
  appId: "1:620586504016:web:1a7901dbfdba891801a655",
  measurementId: "G-PZNWDMZX59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = new getStorage(app);

export { storage };
