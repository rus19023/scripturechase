import {} from './fsconfig';
import { getAuth, signInWithEmailFunction } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import * as util from './utilities';

// TODO: check for logged in user on page load, if logged in, show navbar & profile
const emailField = util.qs('#userSIEmail');
const passwordField = util.qs('#userSIPassword');
const login = util.qs('#login');

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
          navbar.classList.remove('hide');
          profile.classList.remove('hide');
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