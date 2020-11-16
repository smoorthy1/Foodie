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

function signUp() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    promise.then(signIn());
    alert("Signed up, please sign in to start working");
}

function signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.then((value) => {
        console.log(value.user.uid);
        window.uid = value.user.uid;
        let usersRef = db.collection('users').doc(value.user.uid);
        usersRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    console.log("ID already exists in database");
                });
            }
            else {
                usersRef.set({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                })
            }
        })
    })
    promise.catch(e => alert(e.message)); 
    alert("Signed In");
}

function signOut(){ 
    auth.signOut();
    alert("Signed Out");
}

auth.onAuthStateChanged(function(user) {
    if(user) {
        var email = user.email;
        alert("Active User " + email);
        // console.log("Display Name = " + firebase.auth().currentUser.displayName);
        //Take user to app page
        //window.location.href = "app.html";
        //is signed in
    }
    else {
        alert("No Active User");
        //no user is signed in
    }
    
});