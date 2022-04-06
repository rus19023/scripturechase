import { fbApp, auth, langpref } from './fsconfig.js';
import {  } from './signup.js';
import {  } from './signin.js';
import { quizlist } from './quiz.js';
import {  } from './storage.js';
import { qs } from './utilities.js';

//const quiz = JSON.stringify(getQuiz());
console.log(quiz);
// todo: get all selected quiz units from storage, format for quiz, and display

const getUnits = qs('#get-unit');

getUnits.addEventListener('click', () => {
    // get the values of any selected units
    const unit = qs('.chkbtn').value;
    console.log(unit);
});

// onTouch('#get-unit', () => {
//     const unit = qs('.chkbtn').value;
//     console.log(unit);
// });

// // Initialize Firebase services and get references to the service
// const auth = getAuth(fbApp);
// const fs = getFirestore(fbApp);
// const db = getDatabase(fbApp);
// const analytics = getAnalytics(fbApp);

const mailField = qs('#mail');
const passwordField = qs('#password');
const displayNameField = qs('#displayName');
const photoField = qs('#photo');
const labels = document.getElementsByTagName('label');
const signUp = qs('#signUp');
const failureModal = qs('.failure');

//Sends verification emails in the same language as the language used in the
//user's device
//auth.useDeviceLanguage();  //TODO: use lang pref to send emails in the user's language   (https://firebase.google.com/docs/auth/web/language-selection)

// // Detect auth state
// onAuthStateChanged(auth, user => {
//     if (user) {
//         // User is signed in.
//         console.log('User is signed in');
//         console.log(user);
//     } else {
//         // No user is signed in.
//         console.log('No user is signed in');
//     }
// });


// Sign Up Form
// First Name Validation
export function checkUserFirstName() {
    var userLastName = sc.qs("#userFirstName").value;
    var flag = false;
    if (userLastName === "") {
        flag = true;
    }
    if (flag) {
        qs("#userFirstNameError").style.display = "block";
    } else {
        qs("#userFirstNameError").style.display = "none";
    }
}

// Validate last name
export function checkUserLastName() {
    var userLastName = sc.qs("#userLastName").value;
    var flag = false;
    if (userLastName === "") {
        flag = true;
    }
    if (flag) {
        sc.qs("#userLastNameError").style.display = "block";
    } else {
        sc.qs("#userLastNameError").style.display = "none";
    }
}

// Validate email
export function checkUserEmail() {
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
export function checkUserPassword() {
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
export function checkUserBio() {
    var userBio = sc.qs("#userBio").value;
    var flag = false;
    if (flag) {
        sc.qs("#userBioError").style.display = "block";
    } else {
        sc.qs("#userBioError").style.display = "none";
    }
}

// Create new user in firebase auth
export function signUp2() {
    var userFirstName = sc.qs("#userFirstName").value;
    var userLastName = sc.qs("#userLastName").value;
    var userEmail = sc.qs("#userEmail").value;
    var userPassword = sc.qs("#userPassword").value;
    var userFirstNameFormat = /^([A-Za-z.\s_-])/;
    var userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormat);
    var checkUserEmailValid = userEmail.match(userEmailFormat);
    var checkUserPasswordValid = userPassword.match(userPasswordFormat);

    if (checkUserFirstNameValid == null) {
        return checkUserFirstName();
    }else if (userLastName === "") {
        return checkUserLastName();
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
                userFirstName: userFirstName,
                userLastName: userLastName,
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
export function checkUserSIEmail() {
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
export function checkUserSIPassword() {
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
export function signIn() {
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
                title: 'SuccesFirsty signed in',
            })
            .then((value) => {
                setTimeout(function() {
                    window.location.replace("../pages/profile.html");
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

// //  Working For Profile Page
// //  Get data from server and show in the page
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//     //   User is signed in.
//         let user = firebase.auth().currentUser;
//         let uid
//         if (user != null) {
//             uid = user.uid;
//         }
//         let firebaseRefKey = firebase.database().ref().child(uid);
//         firebaseRefKey.on('value', (data) => {
//             sc.qs("#userPfFirstName").innerHTML = data.val().userFirstName;
//             sc.qs("#userPfLastName").innerHTML = data.val().userLastName;
//             sc.qs("#userPfLang").innerHTML = data.val().userLang;
//             // userEmail = data.val().userEmail;
//             // userPassword = data.val().userPassword;
//             sc.qs("#userPfFb").setAttribute('href', data.val().userFb);
//             sc.qs("#userPfTw").setAttribute('href', data.val().userTw);
//             sc.qs("#userPfGp").setAttribute('href', data.val().userGp);
//             sc.qs("#userPfBio").innerHTML = data.val().userBio;
//         })
//     } else {
//     //   No user is signed in.
//     }
// });

//  Show edit profile form with detail
export function showEditProfileForm() {
    sc.qs("#profileSection").style.display = "none";
    sc.qs("#editProfileForm").style.display = "block";
    var userPfFirstName = sc.qs("#userPfFirstName").innerHTML;
    var userPfLastName = sc.qs("#userPfLastName").innerHTML;
    var userPfFb = sc.qs("#userPfFb").getAttribute("href");
    var userPfTw = sc.qs("#userPfTw").getAttribute("href");
    var userPfGp = sc.qs("#userPfGp").getAttribute("href");
    var userPfBio = sc.qs("#userPfBio").innerHTML;
    sc.qs("#userFirstName").value = userPfFirstName;
    sc.qs("#userLastName").value = userPfLastName;
    sc.qs("#userFacebook").value = userPfFb;
    sc.qs("#userTwitter").value = userPfTw;
    sc.qs("#userGooglePlus").value = userPfGp;
    sc.qs("#userBio").value = userPfBio;
}

//  Hide edit profile form
export function hideEditProfileForm() {
    sc.qs("#profileSection").style.display = "block";
    sc.qs("#editProfileForm").style.display = "none";
}

//  Save profile and update database
export function saveProfile() {
    let userFirstName = sc.qs("#userFirstName").value
    let userLastName = sc.qs("#userLastName").value
    let userFacebook = sc.qs("#userFacebook").value
    let userTwitter = sc.qs("#userTwitter").value
    let userGooglePlus = sc.qs("#userGooglePlus").value
    let userBio = sc.qs("#userBio").value
    var userFirstNameFormat = /^([A-Za-z.\s_-])/;
    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormat);
    if (checkUserFirstNameValid == null) {
        return checkUserFirstName();
    } else if (userLastName === "") {
        return checkUserLastName();
    } else {
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userFirstName: userFirstName,
            userLastName: userLastName,
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
export function signOut() {
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

// TODO: programmatically add footer, if logged in, show logout button/icon, if not, show login button/icon
const loggedin = qs('#loggedin');
if (firebase.auth().currentUser) {
    // logged in, show logout button/icon
    const logout = document.createElement("button");
    logout.innerText = "Log Out";
    const logoutIcon = document.createElement("img");
    logout.addEventListener("click", function() {
        signIn();
    });
    logoutIcon.setAttribute("src", "..img/icons/icons8-logout-64.png");
    logoutIcon.setAttribute("alt", "logout icon");
    logoutIcon.classList.add("icon");
    logoutIcon.classList.add("whitebg");
    logout.appendChild(logoutIcon);
    loggedin.appendChild(logout);
} else {
    // not logged in, show login button/icon
    const login = document.createElement("button");
    const loginIcon = document.createElement("img");
    login.innerText = "Log In";
    login.addEventListener("click", function() {
        signIn();
    });
    loginIcon.setAttribute("src", "..img/icons/icons8-login-50.png");
    loginIcon.setAttribute("alt", "login icon");
    loginIcon.classList.add("icon");
    loginIcon.classList.add("whitebg");
    login.appendChild(loginIcon);
    loggedin.appendChild(login);
}