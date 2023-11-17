class Score {
    game; // Game name
    username; // Username
    score; // Score
    icon; // Icon
    link; // Link
    constructor(game, username, score, icon, link) {
        this.game = game;
        this.username = username;
        this.score = score;
        this.icon = icon;
        this.link = link;
    }
    add_new_score() {
        let main_tag = document.getElementById("main");
        main_tag.innerHTML += `
            <div style = "
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 70px;
            color: white;
            border: 2px white solid;
            border-radius: 10px;
            padding-top: 10px;
            font-family: monospace;
            background: rgba(255, 0, 0, 1);
            width: 65%;
            transform: translate(27.5%, 27.5%);
            ">
                <div>
                    <h1 id = "game" style="color: black;">${this.game}</h1>
                    <h2 id = "username" style="color: black;">${this.username}</h2>
                    <h2 id = "score" style="color: black;">${this.score}</h2>
                </div>
                <a href=${this.link}><img src = ${this.icon} style = "width: 200px; height: 200px;" alt="Game Icon"></a>
            </div>
            <br>
       `;
    }
}


/**
 * Goes to the leaderboard code and gets the scores.
 *
 * @returns {String} String that holds the js code to be evaluated.
 */
async function getScores() {
    let response = await fetch("https://raw.githubusercontent.com/maddox0S/duckmath-scores/main/scores-class.js");
    return await response.text();
}
async function main() {
    let js_code = await getScores();
    eval(js_code); // never use eval
}
main();






