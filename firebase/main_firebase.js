/*
    import * as firebase from "./files/gstatic.com_firebasejs_10.5.2_firebase-app.js";
    import * as gAnalytics from "./files/gstatic.com_firebasejs_10.5.2_firebase-analytics.js";
    import * as authentication from "./files/gstatic.com_firebasejs_10.5.2_firebase-auth.js";
    import * as firestore from "./files/gstatic.com_firebasejs_10.5.2_firebase-firestore.js";
*/
import * as firebase from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import * as gAnalytics from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import * as authentication from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import * as firestore from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";




import { firebaseConfig } from "./private/firebase_key.js";

const app = firebase.initializeApp(firebaseConfig);
const analytics = gAnalytics.getAnalytics(app);
const db = firestore.getFirestore(app);
const auth = authentication.getAuth(app)
console.log("Firebase initialized");


// Signs in with Google
function googleSignIn(){
    authentication.signInWithPopup(auth, new authentication.GoogleAuthProvider())
        .then((result) => {
            const user = result.user;
    })
        .catch((error) => {
            console.log(error)
    })

}
// sign in that must be called with email and password
function emailSignIn(email, password){
    authentication.createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
        const user = result.user;
    })
        .catch((error) => {
            console.log(error)
            emailSignIn(email, password)//bad practice but couldnt hurt ig
        })
}
// logs the user out then the authstatechanged gets run
function logOut(){
    authentication.signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}


const login_button = document.getElementById("LoginButton");
const logout_button = document.getElementById("LogoutButton");

if(login_button !== null && logout_button !== null){
    login_button.addEventListener("click", googleSignIn);
    logout_button.addEventListener("click", logOut);
    console.log("Event Listeners Added")
}
else{
    console.log("Fatal Error; HTML DNE")
}




/* For each of your app's pages that need information about the signed-in user,
attach an observer to the global authentication object.
This observer gets called whenever the user's sign-in state changes.
https://firebase.google.com/docs/reference/js/auth.user
*/
authentication.onAuthStateChanged(auth, (user) => { // do shit
    if (user) {
        login_button.style.display = "none";
        logout_button.style.display = "inline"
        console.log("Logged In")

        //change fire icon
        //login_image.src = user.photoURL;
    } else {
        login_button.style.display = "inline"
        logout_button.style.display = "none";
        console.log("Logged Out")

        //change fire icon

    }
});
