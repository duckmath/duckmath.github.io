const templatetopnav = document.createElement('template');

templatetopnav.innerHTML = `
  <div class ="topnav">
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
</div>
<div class ="icon">
    <a href ="/index.html"><img onmouseover="spin(this)" onmouseout="unspin(this)" src="/assets/img/goose.webp" alt="Icon" width="60" height="60"></a>
</div>

`;

const templategoogleany = document.createElement('template');

templategoogleany.innerHTML = `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1533872335883359"
     crossorigin="anonymous"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HXPPJLK5JN"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HXPPJLK5JN');
</script>
`;

document.body.appendChild(templatetopnav.content);

// <footer class="footer">Copyright 2021-2023 duckmath.org</footer>
