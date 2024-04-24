const templatetopnav = document.createElement("template");

templatetopnav.innerHTML = `
<div class="topnav" id="topnav">
<div class="dropdown">
  <a href="/more/index.html" class="topnavbutton">MORE↓</a>
  <div class="dropdown-content">
    <a href="/more/Unbl0ck3rs.html" class="first">Unbl0ck3rs</a>
    <!--<a href="/more/Virtual_Machines.html" class="vm">Virtual Machines</a>-->
    <a href="/more/chat.html" class="dis">D1sc0rd</a>
    <a href="/more/G4m3-help.html" class="vm">G4m3 Help</a>
    <a href="/more/takedown.html" class="vm">DMCA</a>
    <a href="/more/blank.html" class="gr last">about:blank</a>
  </div>
</div>
<a href="/about.html">📝ABOUT</a>
<a href="/leaderboard.html">🏆LEADERBOARD</a>
<a href="/index.html">🎮G4M3S</a>
<div class="centered-fixed">
     <img src="/assets/img/scaled_goose_pixel.png" onmouseover="spin(this)"
    onmouseout="unspin(this)" alt="Duck" onClick="home()" width="40px" height="40px" />
      <span class="duckmath-header" onmouseenter="showchildren(this);" onmouseleave="hidechildren(this);">DuckMath<span class="small-text" style="visibility: hidden">.org</span></span>
</div>


</div>



<div id="hamburger-icon" onclick="toggleMobileMenu(this)">
<div class="bar1"></div>
<div class="bar2"></div>
<div class="bar3"></div>
<ul class="mobile-menu">
  <li><a href="/index.html">HOME</a></li>
  <li><a href="/g4m3s.html">G4M3S</a></li>
  <li><a href="/leaderboard.html">LEADERBOARD</a></li>
  <li><a href="/about.html">ABOUT</a></li>
  <li>
    <a class="topnavbutton">MORE↓</a>
    <div class="dropdown-content">
      <a href="/more/Unbl0ck3rs.html">Unbl0ck3rs</a>
      <a href="/more/Virtual_Machines.html" class="vm">Virtual Machines</a>
      <a href="/more/chat.html" class="dis">D1sc0rd</a>
      <a href="/more/G4m3-help.html" class="gr">G4m3 Requests</a>
    </div>
  </li>
</ul>
</div>
`;

function spin(element) {
  element.style.transform = "rotate(360deg)";
  element.style.transition = "transform 0.25s ease";
}

function unspin(element) {
  element.style.transform = "";
}

function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

document.body.appendChild(templatetopnav.content);

// <footer class="footer">Copyright 2021-2023 duckmath.org</footer>
