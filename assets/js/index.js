const templatetopnav = document.createElement('template');

template.innerHTML = `
  <div class ="topnav">
    <div class="dropdown">
        <a class = "topnavbutton">MORE↓</a>
        <div class="dropdown-content">
            <a href="/more/Pr0x!es.html">Pr0x!es</a>
            <a href="/more/Virtual_Machines.html">Virtual Machines</a>
        </div>
    </div>
    <a href ="/about.html">ABOUT</a>
    <a href ="/changelog.html">CHANGELOG</a>
    <a href ="/leaderboard.html">LEADERBOARD</a>
    <a href ="/g4m3s.html">G4M3S</a>
    <a href="/index.html">HOME</a>
</div>
<div class = "bottom_text">Copyright © 2022-2023 Duck Math - All Rights Reserved.</div>
<div class ="icon">
    <a href ="/index.html"><img onmouseover="spin(this)" onmouseout="unspin(this)" src="/assets/img/goose.png" alt="Icon" width="60" height="60"></a>
</div>
`;

document.body.appendChild(templatetopnav.content);