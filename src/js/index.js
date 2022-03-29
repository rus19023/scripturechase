import * as app from './app.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { } from 'firebase/database';
import { } from 'firebase/firestore';
import { } from 'firebase/analytics';

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

const login = () => {
    const email = util.qs('#userSIEmail').value;
    const password = util.qs('#userSIPassword').value;

    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user);
    })
    .catch((err) => {
        alert(err.message);
        console.log(err.code);
        console.log(err.message);
    })
}

const saveData = () => {
    const email = util.qs('#userSIEmail').value;
    const password = util.qs('#userSIPassword').value;

    db.collection('users')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const readData = () => {
    db.collection('users')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return { ...item.data(), id: item.id }
        }));
    });
}

const updateData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag')
    .update({
        email: 'ashishisagoodboy1234@gmail.com',
        password: '123456'
    })
    .then(() => {
        alert('Data Updated')
    })
}

const deleteData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag').delete()
    .then(() => {
        alert('Data Deleted')
    })
    .catch((err) =>{
        console.log(err)
    })
}
