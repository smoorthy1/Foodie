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

export function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const promise = auth.createUserWithEmailAndPassword(email, password);
        
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;

    promise.then((value) => {
        window.uid = value.user.uid;
        let usersRef = db.collection('users').doc(value.user.uid);
        usersRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
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
            signIn();
        })
    })
    promise.catch(e => alert(e.message));
}

export function signIn(){
    var email = null;
    var password = null;

    if(document.getElementById("email").value && document.getElementById("password").value) {
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
    } else {
        email = document.getElementById("emailLogin").value;
        password = document.getElementById("passwordLogin").value;
    }

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then((value) => {
        window.location.href = "profilepage.html"; 
    })
    promise.catch(e => alert(e.message)); 
}

export function signOut(){ 
    auth.signOut();
}

export function deleteUser() {
    auth.onAuthStateChanged(function(user) {
        if(user) {
            var email = user.email;
            auth.currentUser.delete().then(function() {
            }).catch(function(error) {
                console.log(error);
                console.log("unexpected user deletion error");  
            });
        }
        else {
            console.log("No Active User");
        }
        
    });
}




