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

// init firebase on contruct
const app = firebase.initializeApp(firebaseConfig);
//const analytics = gAnalytics.getAnalytics(app);
const auth = authentication.getAuth(app);
const db = firestore.getFirestore(app);
const user_streaks_collection = firestore.collection(db, "user_streaks");
console.log("Firebase initialized");

class FirebaseInstance{

  constructor() {
    this.user_object = null;

  }
  isSignedIn() {
    if (this.user_object == null) {
      return false;
    } else {
      return true;
    }
  }

  // Signs in with Google
  googleSignIn() {
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
  emailSignIn(email, password) {
    authentication
        .createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
        })
        .catch((error) => {
          console.log(error);
          //emailSignIn(email, password); //bad practice but couldnt hurt ig
        });
  }
  // logs the user out then the authstatechanged gets run
  logOut() {
    authentication.signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
  }

  streakPopUp(streak_object) {
    if (streak_object.firstChild.getAttribute("src") === "/assets/img/gray-streak-icon.webp" && this.checkUsersStreak(current_firebase_instance.user_object)) {
      // means I'm not signed in, I can also just check user
      console.log("You must be signed in to use streaks"); // show the user this
      this.googleSignIn();
    } else {
      window.location = "/streak.html";
    }
  }



  /**
   * Check if the user has a streak;
   *
   * @returns {boolean} True if the user has a streak, false otherwise.
   */
  async checkUsersStreak(current_user_id) {
    if (this.isSignedIn()) {
      const query_items = await firestore.query(
          // just find where doc id == user id each user should have their own doc.
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
  async getLoginDates(current_user_id) {
    if (this.isSignedIn()) {
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
            if (doc.data().dates_logged_in === undefined) {
              return [];
            }
            return doc.data().dates_logged_in;
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
   * @returns {boolean} boolean if user has streak or not
   */
  async streak(current_user_id) {
    if (this.isSignedIn()) {
      const query_items = await firestore.query(
          user_streaks_collection,
          firestore.where("__name__", "==", current_user_id)
      );
      try {
        const querySnapshot = await firestore.getDocs(query_items);
        if (querySnapshot.docs.length === 0) {
          this.createStreak(current_user_id); // create new user doc
          return false;
        } else { // may not work
          this.updateStreak(current_user_id, firestore.FieldValue.serverTimestamp()); // if user alr has streak then update there's
          return true;
        }
      } catch (error) {
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
  async getTotalCurrentStreaks() {
    // adds up all the users with streaks
    const query_items = await firestore.query(
        user_streaks_collection,
        firestore.where("has_streak", "==", true)
    );
    const querySnapshot = await firestore.getDocs(query_items);
    return querySnapshot.docs.length;
  }

  /**
   * Returns number for highest streak
   *
   * @returns {int} int of the highest streak amount
   */
  async getHighestStreak() {
    const query_items = await firestore.query(
        user_streaks_collection,
        firestore.where("highest_streak_amt", ">", 9)
    );
    const querySnapshot = await firestore.getDocs(query_items);
    let highest_streak = 0;
    for (const doc of querySnapshot.docs) {
      if (doc.data().highest_streak_amt > highest_streak) {
        highest_streak = doc.data().highest_streak_amt;
      }
    }
    return highest_streak;
  }


}


// class ends
var current_firebase_instance = new FirebaseInstance(firebaseConfig);




const login_button = document.getElementById("LoginButton");
const logout_button = document.getElementById("LogoutButton");
const streak_icon = document.getElementById("StreakIcon");
if (streak_icon !== null) {
  login_button.addEventListener("click", current_firebase_instance.googleSignIn);
  logout_button.addEventListener("click", current_firebase_instance.logOut);
  streak_icon.addEventListener("click", function () {
    current_firebase_instance.streakPopUp(this);
  });
  console.log("Event Listeners Added");
} else {
  console.log("FATAL ERROR ICONS COULD NOT ADD JS CODE");
}
/**
 * checks if on streak page and does stats for it
 */
if (window.location.href.includes("streak.html")) {
  // if on streak page
  const statsDiv = document.getElementById("stats_div");
  const statsClass = statsDiv.classList;

  current_firebase_instance.getTotalCurrentStreaks().then((result) => {
    statsDiv.innerHTML += "<br />Total current streaks: " + result;
  });
  current_firebase_instance.getHighestStreak().then((result) => {
    statsDiv.innerHTML += "<br />Highest streak: " + result;
    statsClass.add("loaded");
  });
}


/* For each of your app's pages that need information about the signed-in user,
attach an observer to the global authentication object.
This observer gets called whenever the user's sign-in state changes.
https://firebase.google.com/docs/reference/js/auth.user
*/
authentication.onAuthStateChanged(auth, (user) => { // when auth state changes
  // do shit
  if (user) {
    // somehow, if I came here from streaks it could know, maybe use html post req or url parameters
    current_firebase_instance.user_object = user;
    login_button.style.display = "none";
    logout_button.style.display = "inline";
    streak_icon.firstChild.src = "/assets/img/streak-icon.webp";
    console.log("Logged In");
  } else {
    current_firebase_instance.user_object = null;
    login_button.style.display = "inline";
    logout_button.style.display = "none";
    console.log("Logged Out");
    streak_icon.firstChild.src = "/assets/img/gray-streak-icon.webp";

    //change fire icon
  }
});


