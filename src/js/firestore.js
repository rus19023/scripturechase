import { } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAn42KtGuMSwPZ-n-7duZScVYU01TK7IMk",
    authDomain: "scripturechase-46976.firebaseapp.com",
    projectId: "scripturechase-46976",
    storageBucket: "scripturechase-46976.appspot.com",
    messagingSenderId: "51330554814",
    appId: "1:51330554814:web:8943dc84fc3bd5391537ef",
    measurementId: "G-HE9YJ49Y12"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const saveData = () => {
    const volume = util.qs('#volume').value;
    const book = util.qs('#book').value;

    db.collection('scripturechase')
    .add({
        volume: volume,
        book: book
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const readData = () => {
    db.collection('scripturechase')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return {...item.data(), id: item.id}
        }))
    })
}

const updateData = () => {
    const newVolume = util.qs('#newvolume').value;
    const newBook = util.qs('#newbook').value;
    db.collection('scripturechase').doc(itemId)
    .update({
        volume: newVolume,
        book: newBook
    })
    .then(() => {
        alert('Data Updated')
    })
}

const deleteData = () => {
    db.collection('scripturechase').doc(itemId).delete()
    .then(() => {
        alert('Data Deleted')
    })
    .catch((err) =>{
        console.log(err)
    })
}

