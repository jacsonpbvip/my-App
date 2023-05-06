import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD-iv3FRXdBLDEZSxzP5DV2wdRkd03xdcs",
    authDomain: "firesilicon-20849.firebaseapp.com",
    projectId: "firesilicon-20849",
    storageBucket: "firesilicon-20849.appspot.com",
    messagingSenderId: "978357416067",
    appId: "1:978357416067:web:27fc90fe4a6b0bad0fabb6",
    measurementId: "G-W01RHYL7QV"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

async function getData() {
    const usersRef = firestore.collection('values');
    const usersSnapshot = await usersRef.get();
    const users = [];
    usersSnapshot.forEach((doc) => {
        users.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return users;
}

export { firestore, getData, auth };
