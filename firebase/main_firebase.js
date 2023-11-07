/*
import * as firebase from "./files/gstatic.com_firebasejs_10.5.2_firebase-app.js";
import * as gAnalytics from "./files/gstatic.com_firebasejs_10.5.2_firebase-analytics.js";
import * as authentication from "./files/gstatic.com_firebasejs_10.5.2_firebase-auth.js";
import * as firestore from "./files/gstatic.com_firebasejs_10.5.2_firebase-firestore.js";
*/



import * as firebase from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
//import * as gAnalytics from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import * as authentication from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import * as firestore from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";




let user_object = null

import { firebaseConfig } from "./private/firebase_key.js";

const app = firebase.initializeApp(firebaseConfig);
//const analytics = gAnalytics.getAnalytics(app);
const auth = authentication.getAuth(app)
const db = firestore.getFirestore(app);
console.log("Firebase initialized");


//Returns Boolean
function isSignedIn(){
    if(user_object == null){
        return false;
    }
    else{
        return true
    }
}



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

/**
 * Check the user's streak and return a boolean value.
 *
 * @returns {boolean} True if the user has a streak, false otherwise.
 */
function checkUsersStreak(current_user) { // may need to take current user
    //how tf I get current user
    if(isSignedIn()){

    }
    return true;
}

function streakPopUp(streak_object){
    if(streak_object.firstChild.getAttribute("src") === "/assets/img/gray-streak-icon.webp" && checkUsersStreak(user_object)){ // means I'm not signed in, I can also just check user
        console.log("You must be signed in to use streaks") // show the user this
        googleSignIn();
    }
    else{
        window.location = "../streak.html";
    }
}
const login_button = document.getElementById("LoginButton");
const logout_button = document.getElementById("LogoutButton");
const streak_icon = document.getElementById("StreakIcon");
if(streak_icon !== null){
    login_button.addEventListener("click", googleSignIn);
    logout_button.addEventListener("click", logOut);
    streak_icon.addEventListener("click", function(){
        streakPopUp(this)
    });
    console.log("Event Listeners Added")

}
else {
    console.log("FATAL ERROR ICONS COULD NOT ADD JS CODE")
}



/* For each of your app's pages that need information about the signed-in user,
attach an observer to the global authentication object.
This observer gets called whenever the user's sign-in state changes.
https://firebase.google.com/docs/reference/js/auth.user
*/
authentication.onAuthStateChanged(auth, (user) => { // do shit
    if (user) {
        // somehow if I came here from streaks it could know, maybe use html post req or url parameters
        user_object = user
        login_button.style.display = "none";
        logout_button.style.display = "inline"
        streak_icon.firstChild.src ="/assets/img/streak-icon.webp"
        console.log("Logged In")



    } else {
        user_object = null
        login_button.style.display = "inline"
        logout_button.style.display = "none"
        console.log("Logged Out")
        streak_icon.firstChild.src ="/assets/img/gray-streak-icon.webp"

        //change fire icon

    }
});



/*


database shit should be on another page but idk how in js


*/

const user_streaks_collection = collection(db, "/user_streaks"); // maybe no slash

