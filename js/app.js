import * as sc from "./scripturechase.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { } from 'firebase/database';
import { } from 'firebase/storage';

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
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = app.auth();
const db = app.firestore();
const analytics = app.analytics();

// Sign Up Form
// Full Name Validation
function checkUserFullName() {
    var userLastname = sc.qs("#userFullName").value;
    var flag = false;
    if (userLastname === "") {
        flag = true;
    }
    if (flag) {
        sc.qs("#userFullNameError").style.display = "block";
    } else {
        sc.qs("#userFullNameError").style.display = "none";
    }
}

// Validate last name
function checkUserLastname() {
    var userLastname = sc.qs("#userLastname").value;
    var flag = false;
    if (userLastname === "") {
        flag = true;
    }
    if (flag) {
        sc.qs("#userLastnameError").style.display = "block";
    } else {
        sc.qs("#userLastnameError").style.display = "none";
    }
}

// Validate email
function checkUserEmail() {
    var userEmail = sc.qs("#userEmail");
    var userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        sc.qs("#userEmailError").style.display = "block";
    } else {
        sc.qs("#userEmailError").style.display = "none";
    }
}

// Validate password
function checkUserPassword() {
    var userPassword = sc.qs("#userPassword");
    var userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        sc.qs("#userPasswordError").style.display = "block";
    } else {
        sc.qs("#userPasswordError").style.display = "none";
    }
}

// Check user bio for future use
function checkUserBio() {
    var userBio = sc.qs("#userBio").value;
    var flag = false;
    if (flag) {
        sc.qs("#userBioError").style.display = "block";
    } else {
        sc.qs("#userBioError").style.display = "none";
    }
}

// Create new user in firebase auth
function signUp() {
    var userFullName = sc.qs("#userFullName").value;
    var userLastname = sc.qs("#userLastname").value;
    var userEmail = sc.qs("#userEmail").value;
    var userPassword = sc.qs("#userPassword").value;
    var userFullNameFormat = /^([A-Za-z.\s_-])/;
    var userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormat);
    var checkUserEmailValid = userEmail.match(userEmailFormat);
    var checkUserPasswordValid = userPassword.match(userPasswordFormat);

    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    }else if (userLastname === "") {
        return checkUserLastname();
    }else if (checkUserEmailValid == null) {
        return checkUserEmail();
    }else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userLastname: userLastname,
                userEmail: userEmail,
                userPassword: userPassword,
                userFb: "https://www.facebook.com/",
                userTw: "https://twitter.com/",
                userGp: "https://plus.google.com/",
                userBio: "User biography",
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfuly, you can log in now.', 'success')
            .then((value) => {
                setTimeout(function() {
                    window.location.replace("../index.html");
                }, 1000)
            });
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}

//  Working For Sign In Form 
//  Sign In Email Validation 
function checkUserSIEmail() {
    var userSIEmail = sc.qs("#userSIEmail");
    var userSIEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        sc.qs("#userSIEmailError").style.display = "block";
    } else {
        sc.qs("#userSIEmailError").style.display = "none";
    }
}

//  Sign In Password Validation 
function checkUserSIPassword() {
    var userSIPassword = sc.qs("#userSIPassword");
    var userSIPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        sc.qs("#userSIPasswordError").style.display = "block";
    } else {
        sc.qs("#userSIPasswordError").style.display = "none";
    }
}

//  Check email or password exsist in firebase authentication 
function signIn() {
    var userSIEmail = sc.qs("#userSIEmail").value;
    var userSIPassword = sc.qs("#userSIPassword").value;
    var userSIEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormat);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormat);

    if (checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successful',
                title: 'Succesfully signed in',
            }).then((value) => {
                setTimeout(function() {
                    window.location.replace("./pages/profile.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}

//  Working For Profile Page
//  Get data from server and show in the page
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if (user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (data) => {
            sc.qs("#userPfFullName").innerHTML = data.val().userFullName;
            sc.qs("#userPfLastname").innerHTML = data.val().userLastname;
            sc.qs("#userPfLang").innerHTML = data.val().userLang;
            // userEmail = data.val().userEmail;
            // userPassword = data.val().userPassword;
            sc.qs("#userPfFb").setAttribute('href', data.val().userFb);
            sc.qs("#userPfTw").setAttribute('href', data.val().userTw);
            sc.qs("#userPfGp").setAttribute('href', data.val().userGp);
            sc.qs("#userPfBio").innerHTML = data.val().userBio;
        })
    } else {
    //   No user is signed in.
    }
});

//  Show edit profile form with detail
function showEditProfileForm() {
    sc.qs("#profileSection").style.display = "none";
    sc.qs("#editProfileForm").style.display = "block";
    var userPfFullName = sc.qs("#userPfFullName").innerHTML;
    var userPfLastname = sc.qs("#userPfLastname").innerHTML;
    var userPfFb = sc.qs("#userPfFb").getAttribute("href");
    var userPfTw = sc.qs("#userPfTw").getAttribute("href");
    var userPfGp = sc.qs("#userPfGp").getAttribute("href");
    var userPfBio = sc.qs("#userPfBio").innerHTML;
    sc.qs("#userFullName").value = userPfFullName;
    sc.qs("#userLastname").value = userPfLastname;
    sc.qs("#userFacebook").value = userPfFb;
    sc.qs("#userTwitter").value = userPfTw;
    sc.qs("#userGooglePlus").value = userPfGp;
    sc.qs("#userBio").value = userPfBio;
}

//  Hide edit profile form
function hideEditProfileForm() {
    sc.qs("#profileSection").style.display = "block";
    sc.qs("#editProfileForm").style.display = "none";
}

//  Save profile and update database
function saveProfile() {
    let userFullName = sc.qs("#userFullName").value
    let userLastname = sc.qs("#userLastname").value
    let userFacebook = sc.qs("#userFacebook").value
    let userTwitter = sc.qs("#userTwitter").value
    let userGooglePlus = sc.qs("#userGooglePlus").value
    let userBio = sc.qs("#userBio").value
    var userFullNameFormat = /^([A-Za-z.\s_-])/;
    var checkUserFullNameValid = userFullName.match(userFullNameFormat);
    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (userLastname === "") {
        return checkUserLastname();
    } else {
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userFullName: userFullName,
            userLastname: userLastname,
            userFb: userFacebook,
            userTw: userTwitter,
            userGp: userGooglePlus,
            userBio: userBio,
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'successful',
            title: 'Update successful',
            text: 'Profile updated.',
        })
        .then((value) => {
            setTimeout(function() {
                sc.qs("#profileSection").style.display = "block";

                sc.qs("#editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}

//  Logout
function signOut() {
    firebase.auth().signOut()
    .then(function() {
        // Logout successful.
        swal({
            type: 'successful',
            title: 'Logged Out',
        }).then((value) => {
            setTimeout(function() {
                window.location.replace("../index.html");
            }, 1000)
        });
    })
    .catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}