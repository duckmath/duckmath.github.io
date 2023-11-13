import { checkUsersStreak } from "/firebase/main_firebase.js";
async function serverConnectionTest() {
    checkUsersStreak("MIMSxtxbGjeBBdFos5O0xXDGCjx1")
        .then((result) => {
            if (result === true) {
                console.log("passed test case 1");
            } else {
                console.log("failed test case 1");
            }
        })
        .catch((error) => {
            console.log("failed test case 1");
        });
}

setTimeout(serverConnectionTest, 2000);