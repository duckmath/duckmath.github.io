
const firebaseConfig = {
  apiKey: "AIzaSyBzv3i9lYIhyiQrfYnELlf2OesAhKMIbdk",
  authDomain: "duckmath-6e834.firebaseapp.com",
  projectId: "duckmath-6e834",
  storageBucket: "duckmath-6e834.appspot.com",
  messagingSenderId: "239032497719",
  appId: "1:239032497719:web:2fdd4271eddaf08897b1b2",
  measurementId: "G-R6ZHT5H49D",
};

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

let user_object = null;

const app = firebase.initializeApp(firebaseConfig);
//const analytics = gAnalytics.getAnalytics(app);
const auth = authentication.getAuth(app);
const db = firestore.getFirestore(app);
console.log("Firebase initialized");

//Returns Boolean
function isSignedIn() {
  if (user_object == null) {
    return false;
  } else {
    return true;
  }
}

// Signs in with Google
function googleSignIn() {
  authentication
    .signInWithPopup(auth, new authentication.GoogleAuthProvider())
    .then((result) => {
      const user = result.user;
    })
    .catch((error) => {
      console.log(error);
    });
}
// sign in that must be called with email and password
function emailSignIn(email, password) {
  authentication
    .createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
    })
    .catch((error) => {
      console.log(error);
      emailSignIn(email, password); //bad practice but couldnt hurt ig
    });
}
// logs the user out then the authstatechanged gets run
function logOut() {
  authentication
    .signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

function streakPopUp(streak_object) {
  if (
    streak_object.firstChild.getAttribute("src") ===
      "/assets/img/gray-streak-icon.webp" &&
    checkUsersStreak(user_object)
  ) {
    // means I'm not signed in, I can also just check user
    console.log("You must be signed in to use streaks"); // show the user this
    googleSignIn();
  } else {
    window.location = "/streak.html";
  }
}
const login_button = document.getElementById("LoginButton");
const logout_button = document.getElementById("LogoutButton");
const streak_icon = document.getElementById("StreakIcon");
if (streak_icon !== null) {
  login_button.addEventListener("click", googleSignIn);
  logout_button.addEventListener("click", logOut);
  streak_icon.addEventListener("click", function () {
    streakPopUp(this);
  });
  console.log("Event Listeners Added");
} else {
  console.log("FATAL ERROR ICONS COULD NOT ADD JS CODE");
}

/* For each of your app's pages that need information about the signed-in user,
attach an observer to the global authentication object.
This observer gets called whenever the user's sign-in state changes.
https://firebase.google.com/docs/reference/js/auth.user
*/
authentication.onAuthStateChanged(auth, (user) => {
  // do shit
  if (user) {
    // somehow if I came here from streaks it could know, maybe use html post req or url parameters
    user_object = user;
    login_button.style.display = "none";
    logout_button.style.display = "inline";
    streak_icon.firstChild.src = "/assets/img/streak-icon.webp";
    console.log("Logged In");
  } else {
    user_object = null;
    login_button.style.display = "inline";
    logout_button.style.display = "none";
    console.log("Logged Out");
    streak_icon.firstChild.src = "/assets/img/gray-streak-icon.webp";

    //change fire icon
  }
});

/*





database shit should be on another page but idk how in js





*/

const user_streaks_collection = firestore.collection(db, "user_streaks");

/**
 * Check if the user has a streak;
 *
 * @returns {boolean} True if the user has a streak, false otherwise.
 */
export async function checkUsersStreak(current_user_id) {
  if (isSignedIn()) {
    const query_items = await firestore.query( // just find where doc id == user id each user should have their own doc.
      user_streaks_collection,
      firestore.where("__name__", "==", current_user_id)
    );
    try {
      const querySnapshot = await firestore.getDocs(query_items);
      if (querySnapshot.docs.length === 0) {
        console.log("No doc found");
        return false;
      }
      for (const doc of querySnapshot.docs) {
        if (doc.id === current_user_id) {
          if (doc.data().has_streak === true) {
            // new line verify it works
            return true;
          }
        }
      }
    } catch (error) {
      console.error("Error querying Firestore:\n", error);
    }
  }
  return false;
}
/**
 * Returns a list of strings of dates the user had logged in.
 *
 * @returns {list} list of dates the user had logged in.
 */
export async function getLoginDates(current_user_id) {
if (isSignedIn()) {
    const query_items = await firestore.query(
      user_streaks_collection,
      firestore.where("__name__", "==", current_user_id)
    );
    try {
      const querySnapshot = await firestore.getDocs(query_items);
      if (querySnapshot.docs.length === 0) {
        console.log("No doc found");
        return [];
      }
      for (const doc of querySnapshot.docs) {
        if (doc.id === current_user_id) {
          if(doc.data().dates_logged_in === undefined){
            return [];
          }
          return (doc.data().dates_logged_in);
        }
      }
    } catch (error) {
      console.error("Error querying Firestore:\n", error);
    }
  }
  return [];
}

/**
 * creates or updates a user streak
 *
 * @returns {void} no return for now
 */
async function streak(current_user_id) {
    if (isSignedIn()) {
        const query_items = await firestore.query(user_streaks_collection, firestore.where("__name__", "==", current_user_id));
        try {
          const querySnapshot = await firestore.getDocs(query_items);
          if (querySnapshot.docs.length === 0) {
            createStreak(current_user_id); // create new user doc
            return false; // making streak now
          }
          else{
            updateStreak(current_user_id, firestore.FieldValue.serverTimestamp()); // if user alr has streak then update there's
          }
        }
        catch (error) {
            console.error("Error querying Firestore:\n", error);
          }

    }
    return false;
}

/**
 * Returns an amount of total streaks
 *
 * @returns {int} int of how many users have streaks currently.
 */
async function getTotalCurrentStreaks(){ // adds up all the users with streaks
  const query_items = await firestore.query(user_streaks_collection, firestore.where("has_streak", "==", true));
  const querySnapshot = await firestore.getDocs(query_items);
  return querySnapshot.docs.length;
}

/**
 * Returns number for highest streak
 *
 * @returns {int} int of the highest streak amount
 */
async function getHighestStreak(){
  const query_items = await firestore.query(user_streaks_collection, firestore.where("highest_streak_amt", ">", 9));
  const querySnapshot = await firestore.getDocs(query_items);
  let highest_streak = 0;
  for(const doc of querySnapshot.docs){
    if(doc.data().highest_streak_amt > highest_streak){
      highest_streak = doc.data().highest_streak_amt;
    }
  }
  return highest_streak;
}

/**
 * checks if on streak page and does stats for it
 */
if(window.location.href.includes("streak.html")){ // if on streak page
  const statsDiv = document.getElementById("stats_div");

      getTotalCurrentStreaks().then((result) => {
          statsDiv.innerHTML += "<br>Total Current Streaks: " + result;
      });
      getHighestStreak().then((result) => {
        statsDiv.innerHTML += "<br>Highest Streak: " + result;
      });
}
