
const firebaseConfig = {
    apiKey: "AIzaSyCbHtGeJVWb96JDYZWx5y1HmXY6QIo98UQ",
    authDomain: "foodie-8bb79.firebaseapp.com",
    databaseURL: "https://foodie-8bb79.firebaseio.com",
    projectId: "foodie-8bb79",
    storageBucket: "foodie-8bb79.appspot.com",
    messagingSenderId: "730394226966",
    appId: "1:730394226966:web:a9ccef4db533d83ecda037",
    measurementId: "G-NTTL4D6JH3"
};
firebase.initializeApp(firebaseConfig);
window.dbg = firebase.firestore();
const db = firebase.firestore();
window.authg = firebase.auth();
const auth = firebase.auth();
