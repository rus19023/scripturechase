import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { collection, doc, addDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import * as util from './utilities.js';

const fbconfig = {
    apiKey: "AIzaSyAn42KtGuMSwPZ-n-7duZScVYU01TK7IMk",
    authDomain: "scripturechase-46976.firebaseapp.com",
    projectId: "scripturechase-46976",
    storageBucket: "scripturechase-46976.appspot.com",
    messagingSenderId: "51330554814",
    appId: "1:51330554814:web:8943dc84fc3bd5391537ef",
    measurementId: "G-HE9YJ49Y12"
};

const fbapp = initializeApp(fbconfig);

const auth = getAuth(fbapp);

const fdb = firebase(firestore);
//console.log(auth);

//Sends verification emails in the same language as the language used in the user's device
auth.useDeviceLanguage();

const url1 = 'https://raw.githubusercontent.com/rus19023/scripturechase/main/json/scripturechase.json';

const uploadScriptures = async (url) => {
    if (!('fetch' in window)) {
        console.log('Your browser does not support this app. Please use a modern browser such as Chrome, Safari, Opera, Brave, FireFox or Edge.');
        return;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
        } else {
            const getScriptures = await response.json();
            let newArray = [];
            console.log(getScriptures);
            // getScriptures.forEach(el => {
            //     console.log(el);
            //    fdb.collection('scripturechase')
            //     .add({
            //         volume: el.volume_title,
            //         // book blank for D & C
            //         book: el.book_title,
            //         //bookShort: book.substring(0, 3) + '.',
            //         // chapter is section for D & C
            //         chapter: el.chapter_number,
            //         verseNums: el.verse_numbers,
            //         //ref: `${volume} ${book} ${chapter}:${verseNums}`,
            //         //refShort: `${volume} ${bookShort} ${chapter}:${verseNums}`,
            //         content: el.scripture_text,
            //         mastery: true,
            //         descrip: el.descrip,
            //         keywords: el.keywords,
            //         context: el.context,
            //         topic: el.topic,
            //         date: firebase.firestore.FieldValue.serverTimestamp()
            //     })
            //     .then((docRef) => {
            //         console.log("Document written with ID: ", docRef.id);
            //     })
            //     .catch((error) => {
            //         console.error("Error adding document: ", error);
            //     });
            // });
        }
        return response;
    } catch (error) {
        console.log('Looks like there was a problem: ', error);
    }
};
const uploadButton = util.qs('#upload');
upload.addEventListener('click', () => {
    uploadScriptures(url1);
});


const saveData = () => {
    const volume = util.qs('#volume').value;
    const book = util.qs('#book').value;

   fdb.collection('scripturechase')
    .add({
        volume: volume,
        // book blank for D & C
        book: book,
        //bookShort: book.substring(0, 3) + '.',
        // chapter is section for D & C
        chapter: chapter,
        verseNums: verseNums,
        //ref: `${volume} ${book} ${chapter}:${verseNums}`,
        //refShort: `${volume} ${bookShort} ${chapter}:${verseNums}`,
        content: content,
        mastery: true,
        descrip: descrip,
        keywords: keywords,
        context: context,
        topic: topic,
        date: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const readData = () => {
   fdb.collection('scripturechase')
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
   fdb.collection('scripturechase').doc(itemId)
    .update({
        volume: newVolume,
        book: newBook
    })
    .then(() => {
        alert('Data Updated')
    })
}

const deleteData = () => {
   fdb.collection('scripturechase').doc(itemId).delete()
    .then(() => {
        alert('Data Deleted')
    })
    .catch((err) =>{
        console.log(err)
    })
}

