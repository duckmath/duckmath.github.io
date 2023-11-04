const templatetopnav = document.createElement("template");

templatetopnav.innerHTML = `
  <div class ="topnav">
    <a href="#" id="LoginButton" style="color: #D30000;">LOGIN</a>
    <a href="#" id="LogoutButton" style="color: #D30000; display: none">LOGOUT</a>
    <div class="dropdown">
        <a class = "topnavbutton">MORE↓</a>
        <div class="dropdown-content">
            <a href="/more/Unbl0ck3rs.html">Unbl0ck3rs</a>
            <a href="/more/Virtual_Machines.html" style="background-color: #FFFF00">Virtual Machines</a>
            <a href="/more/chat.html" style="background-color: #0000FF">D1sc0rd</a>
            <a href="/more/G4m3-Requests.html" style="background-color: #00FF00">G4m3 Requests</a>
        </div>
    </div>
    <a href ="/about.html">ABOUT</a>
    <a href ="/changelog.html">CHANGELOG</a>
    <a href ="/leaderboard.html">LEADERBOARD</a>
    <a href ="/g4m3s.html">G4M3S</a>
    <a href="/index.html">HOME</a>
    <!-- streak -->
    <button style="justify-content: center; place-content: center; text-align: center; float: right; background: none; display: none"><img src="/assets/img/streak-placeholder-removebg-preview.webp" alt="Login" width="50" height="50"></button>
</div>
<div id="hamburger-icon" onclick="toggleMobileMenu(this)">
  <div class="bar1"></div>
  <div class="bar2"></div>
  <div class="bar3"></div>
  <ul class="mobile-menu">
    <li><a href="/index.html">HOME</a></li>
    <li><a href ="/g4m3s.html">G4M3S</a></li>
    <li><a href ="/leaderboard.html">LEADERBOARD</a></li>
    <li><a href ="/changelog.html">CHANGELOG</a></li>
    <li> <a href ="/about.html">ABOUT</a></li>
    <li>
    <a class = "topnavbutton">MORE↓</a>
    <div class="dropdown-content">
        <a href="/more/Unbl0ck3rs.html">Unbl0ck3rs</a>
        <a href="/more/Virtual_Machines.html" style="background-color: #FFFF00">Virtual Machines</a>
        <a href="/more/chat.html" style="background-color: #0000FF">D1sc0rd</a>
        <a href="/more/G4m3-Requests.html" style="background-color: #00FF00">G4m3 Requests</a>
    </div>
    </li>
  </ul>
</div>
<div class ="icon">
    <a href ="/index.html"><img onmouseover="spin(this)" onmouseout="unspin(this)" src="/assets/img/goose.webp" alt="Home" width="60" height="60"></a>
</div>

`;
function toggleMobileMenu(menu){
  menu.classList.toggle('open');
}

document.body.appendChild(templatetopnav.content);

// <footer class="footer">Copyright 2021-2023 duckmath.org</footer>
