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





driftBoss = new Score("Drift Boss", "nevamian", "20230", "/assets/img/icons/driftboss.webp", "/g4m3s/driftboss.html");
driftBoss.add_new_score();

Slope = new Score("Slope", "roshie", "230", "/assets/img/icons/slope.webp", "/g4m3s/slope.html");
Slope.add_new_score();

TanukiSunset = new Score("Tanuki Sunset", "Solarrelic", "703", "/assets/img/icons/tanuki.webp", "/g4m3s/TanukiSunset.html");
TanukiSunset.add_new_score();

SubwaySurfers = new Score("Subway Surfers", "jonny p", "40674", "/assets/img/icons/subway.webp", "/g4m3s/subway_surfers.html");
SubwaySurfers.add_new_score();

MemeDylan = new Score("", "Dylan", "68", "/assets/img/squiddy.gif", "/g4m3s/club-penguin.html");
MemeDylan.add_new_score();

new Score("Club Penguin", "Maddox", "1337", "/assets/img/club-penguin-dance.gif", "/g4m3s/club-penguin.html").add_new_score();


