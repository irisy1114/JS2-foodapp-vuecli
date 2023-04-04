import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA28zI1l7x0lyXmzo3pRd3ktEXw1nDLuHA",
    authDomain: "restaurant-83be1.firebaseapp.com",
    databaseURL: "https://restaurant-83be1-default-rtdb.firebaseio.com",
    projectId: "restaurant-83be1",
    storageBucket: "restaurant-83be1.appspot.com",
    messagingSenderId: "166782472195",
    appId: "1:166782472195:web:4a1c26353d092bc4ee7e36"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();


export {firebase, db, auth};
