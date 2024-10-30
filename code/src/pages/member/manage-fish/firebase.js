// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "koicareathome",
    storageBucket: "gs://koicareathome.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:958335011387:web:57e47a6f96619a5ba62a1e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;