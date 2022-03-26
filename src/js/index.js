// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { } from 'firebase/database';
import { } from 'firebase/firestore';
import { } from 'firebase/analytics';

// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn42KtGuMSwPZ-n-7duZScVYU01TK7IMk",
    authDomain: "scripturechase-46976.firebaseapp.com",
    projectId: "scripturechase-46976",
    storageBucket: "scripturechase-46976.appspot.com",
    messagingSenderId: "51330554814",
    appId: "1:51330554814:web:8943dc84fc3bd5391537ef",
    measurementId: "G-HE9YJ49Y12"
};

// Initialize Firebase
const FBapp = initializeApp(firebaseConfig);
// Initialize Firebase services and get references to the service
const auth = getAuth(FBapp);
const fs = getFirestore(FBapp);
const db = getDatabase(FBapp);
const analytics = getAnalytics(FBapp);

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user) {
        // User is signed in.
        console.log('User is signed in');
        console.log(user);
    } else {
        // No user is signed in.
        console.log('No user is signed in');
    }
});
