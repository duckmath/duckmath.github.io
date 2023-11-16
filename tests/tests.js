import {checkUsersStreak, getLoginDates} from "../firebase/main_firebase.js";
// must be logged in to run these test cases
// if you are not logged in, you will get an error/TESTS WILL FAIL
let run_tests_button;

if(window.location.href.includes("dev.html")){ // if ur in dev.html
    run_tests_button = document.getElementById("run_tests_button");
    run_tests_button.addEventListener("click", () => {
        runTestCases().then(result => {
            console.log(result); // This will log the return value of runTestCases()
            if(result === true){
                run_tests_button.style.color = "green";
                run_tests_button.innerHTML = "Tests Passed";
            }
        });
    });
}
async function hasStreakSeverReadTest() {
    return checkUsersStreak("MIMSxtxbGjeBBdFos5O0xXDGCjx1") // state I am going to return this value
}
async function loginDatesSeverReadTest() {
    return getLoginDates("MIMSxtxbGjeBBdFos5O0xXDGCjx1") // state I am going to return this value
}
/**
 * Check if the test cases pass
 *
 * @returns {boolean} True if the user all test cases pass, false otherwise.
 */
async function runTestCases() {
    let success = false;
    let hasStreakResult = await hasStreakSeverReadTest();
    if(hasStreakResult){
        success = true;
    }
    else{
        return false;
    }
    let loginDatesResult = await loginDatesSeverReadTest();
    if(loginDatesResult.length !== 0){
        success = true;
    }
    else{
        return false;
    }
    return success;
}





