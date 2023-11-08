function add_new_score(game_text, username_text, score_text, image_path, game_path) {

    let main_tag = document.getElementById("main");
    main_tag.innerHTML += `
        <div style = "
            grid-column: 2 /5 ;
            margin-top: 70px;
            text-align: center;
            color: white;
            border: 2px white solid;
            border-radius: 10px;
            padding-top: 10px;
            font-family: monospace;
            display: grid;
            justify-content: center;
            align-content: center;
            align-items: center;
            "> 
            <h1 id = "game" style="float: left;">${game_text}</h1>
            <h2 id = "username" style="float: left">${username_text}</h2>
            <h2 id = "score" style="float: left">${score_text}</h2>
            <a style="justify-content: center; justify-items: center" href=${game_path}><img src = ${image_path} style = "width: 200px; height: 200px; float: left;" alt="Game Icon"></a>
        </div>
    `;
}

add_new_score("Drift Boss", "nevamian", "20230", "/assets/img/icons/driftboss.webp", "/g4m3s/driftboss.html")
add_new_score("Slope", "roshie", "230", "/assets/img/icons/slope.webp", "/g4m3s/slope.html")
add_new_score("Tanuki Sunset", "Solarrelic", "703", "/assets/img/icons/tanuki.webp", "/g4m3s/TanukiSunset.html")
add_new_score("Subway Surfers", "bella", "12190", "/assets/img/icons/subway.webp", "/g4m3s/subway_surfers.html")




add_new_score("", "Dylan", "68", "/assets/img/squiddy.gif", "/g4m3s/club-penguin.html")
add_new_score("Club Penguin", "Maddox", "1337", "/assets/img/club-penguin-dance.gif", "/g4m3s/club-penguin.html")



