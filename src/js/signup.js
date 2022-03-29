import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import * as util from './utilities.js';

const emailField = util.qs('#userSIEmail');
const passwordField = util.qs('#userSIPassword');
const signUp = util.qs('#signUp');
const login = util.qs('#login');

// Firebase project configuration
const fireConfig = {
    apiKey: "AIzaSyAn42KtGuMSwPZ-n-7duZScVYU01TK7IMk",
    authDomain: "scripturechase-46976.firebaseapp.com",
    projectId: "scripturechase-46976",
    storageBucket: "scripturechase-46976.appspot.com",
    messagingSenderId: "51330554814",
    appId: "1:51330554814:web:8943dc84fc3bd5391537ef",
    measurementId: "G-HE9YJ49Y12"
};

// Initialize Firebase
const firebase = initializeApp(fireConfig);

const auth = getAuth(firebase);
//console.log(auth);

//Sends verification emails in the same language as the language used in the user's device
auth.useDeviceLanguage();

//Function wrapping all the sign up parts including the email verification email
//triggered once the user clicks on the signup button
const signUpFunction = () => {
    const email = emailField.value;
    const password = passwordField.value;
    //console.log(email, password);

    //Built in Firebase function responsible for signing up a user
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        console.log('Signed Up Successfully !');
        sendVerificationEmail();
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

//Function called right after the signUpWithEmailAndPassword to send verification emails
const sendVerificationEmail = () => {
    //Built in firebase function responsible for sending the verification email
    auth.currentUser.sendEmailVerification()
    .then(() => {
        console.log('Verification Email Sent Successfully !');
    })
    .catch(error => {
        console.error(error);
    });
}
signUp.addEventListener('click', signUpFunction);