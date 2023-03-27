const templatetopnav = document.createElement('template');

templatetopnav.innerHTML = `
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
