import { } from './fsconfig';
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import * as util from './utilities.js';

const emailField = util.qs('#userSIEmail');
const passwordField = util.qs('#userSIPassword');
const signUp = util.qs('#signUp');


//Function wrapping all the sign up parts including the email verification email
//triggered once the user clicks on the signup button
const signUpFunction = () => {
    const email = emailField.value;
    const password = passwordField.value;d
    //console.log(email, password);

    //Built in Firebase function responsible for signing up a user
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        console.log(`Signed Up Successfully ${user}!`);
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