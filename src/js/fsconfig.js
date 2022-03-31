import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';

// Firebase project configuration
export const fireConfig = {
    apiKey: "AIzaSyAn42KtGuMSwPZ-n-7duZScVYU01TK7IMk",
    authDomain: "scripturechase-46976.firebaseapp.com",
    projectId: "scripturechase-46976",
    storageBucket: "scripturechase-46976.appspot.com",
    messagingSenderId: "51330554814",
    appId: "1:51330554814:web:8943dc84fc3bd5391537ef",
    measurementId: "G-HE9YJ49Y12"
};

// Initialize Firebase
export const firebase = initializeApp(fireConfig);

export const auth = getAuth(firebase);
//console.log(auth);

//Sends verification emails in the same language as the language used in the user's device
export const devlang = auth.useDeviceLanguage();