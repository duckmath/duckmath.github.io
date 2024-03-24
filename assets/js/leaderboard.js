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
            <div class="score-card">
                <div class="card-text-align">
                    <h1 id="game" class="card-text">Game: ${this.game}</h1>
                    <h2 id="username" class="card-text">Player: ${this.username}</h2>
                    <h2 id="score" class="card-text">Score: ${this.score}</h2>
                </div>
                <a class="game-icon-container" href=${this.link}><img class="game-icon" src=${this.icon} alt="Game Icon"></a>
            </div>
       `;
    }
}

/**
 * Retrieves scores from the specified URL.
 *
 * @return {Promise<string>} The updated code with modified scores.
 */
async function getScores() {
    let response = await fetch("https://raw.githubusercontent.com/duckmath/duckmath-leaderboard/main/scores.js");
    return await response.text(); // is promise for whatever reason
}

async function main() {
    let js_code = await getScores();
    eval(js_code); // never use eval
}

main();






