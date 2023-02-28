const template = document.createElement('template');

template.innerHTML = `
  <div class ="topnav">
    <div class="dropdown">
        <a class = "topnavbutton">More</a>
        <div class="dropdown-content">
            <a href="#">List 1</a>
            <a href="#">List 2</a>
            <a href="#">List 3</a>
        </div>
    </div>
    <a href ="/about.html">About</a>
    <a href ="/changelog.html">Changelog</a>
    <a href ="/leaderboard.html">Leaderboard</a>
    <a href ="/games.html">Games</a>
    <a href="/index.html">Home</a>
</div>
<div class = "bottom_text">Copyright © 2022-2023 Duck Math - All Rights Reserved.</div>
<div class ="icon">
    <a href ="/index.html"><img onmouseover="spin(this)" onmouseout="unspin(this)" src="/assets/img/goose.png" alt="Icon" width="60" height="60"></a>
</div>
`;

document.body.appendChild(template.content);