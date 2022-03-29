import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import * as util from './utilities.js';

const emailField = util.qs('#userSIEmail');
const passwordField = util.qs('#userSIPassword');
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


//Sign in function
const signInWithEmailFunction = () => {
    const email = emailField.value;
    const password = passwordField.value;

    //Built in firebase function responsible for authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log('You\'re successfully signed in !');
    })
    .catch(error => {
      console.error(error);
    })
}
login.addEventListener('click', signInWithEmailFunction);

// const signInWithGoogleBtn = document.getElementById('signInWithGoogle');

// const signInWithGoogle = () => {
//   const googleProvider = new firebase.auth.GoogleAuthProvider();

//   auth.signInWithPopup(googleProvider)
//   .then(() => {
//     console.log('You\'re now signed in !');
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }
// signInWithGoogleBtn.addEventListener('click', signInWithGoogle);