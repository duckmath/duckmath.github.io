const templatetopnav = document.createElement("template");

templatetopnav.innerHTML = `
<div class="topnav" id="topnav">
<div class="dropdown">
  <a href="/more/index.html" class="topnavbutton">MORE↓</a>
  <div class="dropdown-content">
    <a href="/more/Proxies.html" class="first">Proxies</a>
    <a href="/more/discord.html" class="dis">Discord</a>
    <a href="/more/Game_help.html" class="vm">Game Help</a>
    <a href="/more/takedown.html" class="vm">DMCA</a>
    <a href="/more/blank.html" class="gr last">about:blank</a>
  </div>
</div>
<a href="/about.html">📝ABOUT</a>
<a href="/leaderboard.html">🏆LEADERBOARD</a>
<a href="/games_list.html">🎮GAMES</a>
<div class="centered-fixed-blur"></div>
<div class="centered-fixed">
     <img src="/assets/img/scaled_goose_pixel.png" onmouseover="spin(this)"
    onmouseout="unspin(this)" alt="Duck" onClick="home()" width="40px" height="40px" />
      <span id="duckmath-header" class="duckmath-header" onmouseenter="showchildren(this);" onmouseleave="hidechildren(this);">Duck<span class="small-text" style="visibility: hidden">.com</span></span>
</div>


</div>



<div id="hamburger-icon" onclick="toggleMobileMenu(this)">
<div class="bar1"></div>
<div class="bar2"></div>
<div class="bar3"></div>
<ul class="mobile-menu">
  <li><a href="/index.html">HOME</a></li>
  <li><a href="/games_list.html">GAMES</a></li>
  <li><a href="/leaderboard.html">LEADERBOARD</a></li>
  <li><a href="/about.html">ABOUT</a></li>
  <li>
    <a class="topnavbutton">MORE↓</a>
    <div class="dropdown-content">
      <a href="/more/Proxies.html">Proxies</a>
      <a href="/more/Virtual_Machines.html" class="vm">Virtual Machines</a>
      <a href="/more/discord.html" class="dis">Discord</a>
      <a href="/more/Game_help.html" class="gr">Game Help</a>
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

// Inject global footer on every page
const templatefooter = document.createElement("template");
templatefooter.innerHTML = `
<footer id="site-footer" class="site-footer" style="margin-top: 24px; padding: 20px 16px; border-top: 1px solid rgba(255,255,255,0.1);">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; gap: 16px;">
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="/assets/img/duck.webp" alt="DuckMath" width="40" height="40" style="border-radius: 6px;"/>
        <div>
          <div style="font-weight: 700; font-size: 1.05rem;">DuckMath.org — Actually Unblocked Games</div>
          <div style="opacity: 0.9; font-size: 0.95rem;">1,000,000+ active users since 2022</div>
        </div>
      </div>
      <div style="max-width: 680px; opacity: 0.9; font-size: 0.95rem;">
        DuckMath.org hosts 250+ browser games, updates daily, and features leaderboards, coins, a seasonal battlepass, cloaking tools, and multiple proxy integrations so you can play from school or work networks.
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
      <div>
        <div style="font-weight: 600; margin-bottom: 8px;">Quick Links</div>
        <div style="display: grid; gap: 6px;">
          <a href="/about.html" style="text-decoration: none; color: inherit; opacity: 0.95;">About</a>
          <a href="/leaderboard.html" style="text-decoration: none; color: inherit; opacity: 0.95;">Leaderboard</a>
          <a href="/games_list.html" style="text-decoration: none; color: inherit; opacity: 0.95;">Games</a>
          <a href="/more/Proxies.html" style="text-decoration: none; color: inherit; opacity: 0.95;">Proxies & Cloak Mode</a>
          <a href="/more/discord.html" style="text-decoration: none; color: inherit; opacity: 0.95;">Discord (In‑Site)</a>
          <a href="/more/Game_help.html" style="text-decoration: none; color: inherit; opacity: 0.95;">Help & Requests</a>
          <a href="/more/takedown.html" style="text-decoration: none; color: inherit; opacity: 0.95;">DMCA</a>
        </div>
      </div>
      <div>
        <div style="font-weight: 600; margin-bottom: 8px;">Socials</div>
        <div style="display: grid; gap: 6px;">
          <a href="https://github.com/duckmath/duckmath.github.io" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; opacity: 0.95;">GitHub</a>
          <a href="https://discord.gg/aMUVSARrEy" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; opacity: 0.95;">Discord</a>
          <a href="https://www.tiktok.com/@rockyf2p" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; opacity: 0.95;">TikTok</a>
          <a href="https://www.youtube.com/@duckmathgames" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; opacity: 0.95;">YouTube</a>
          <a href="https://www.instagram.com/duckmath/reels/" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; opacity: 0.95;">Instagram</a>
        </div>
      </div>
      <div>
        <div style="font-weight: 600; margin-bottom: 8px;">Security & Privacy</div>
        <div style="opacity: 0.9; font-size: 0.95rem;">Minimal PII with Supabase Auth. Leaderboard uploads are scanned and reviewed. Proxies are third‑party—use responsibly and follow local rules.</div>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; opacity: 0.85; font-size: 0.9rem; padding-top: 8px;">
      <div>© <span id="footer-year"></span> DuckMath.org</div>
      <div>Built for fast, accessible, unblocked gaming.</div>
    </div>
  </div>
</footer>
`;

document.body.appendChild(templatefooter.content);

// Set footer year dynamically
const footerYearSpan = document.getElementById("footer-year");
if (footerYearSpan) {
  const now = new Date();
  footerYearSpan.textContent = now.getFullYear();
}

// Ensure body layout supports a sticky footer at the bottom in natural flow
(function ensureFooterLayout() {
  if (!document.getElementById("global-footer-layout-style")) {
    const style = document.createElement("style");
    style.id = "global-footer-layout-style";
    style.textContent = `
      html, body { min-height: 100%; }
      body { display: flex; flex-direction: column; min-height: 100vh; }
      #site-footer { margin-top: auto !important; }
    `;
    document.head.appendChild(style);
  }
})();

// Ensure footer stays as the last element in <body> across pages that inject content late
function placeFooterAtEnd() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  if (document.body.lastElementChild !== footer) {
    document.body.appendChild(footer);
  }
}

document.addEventListener("DOMContentLoaded", placeFooterAtEnd);
window.addEventListener("load", placeFooterAtEnd);

const bodyObserver = new MutationObserver(function () {
  placeFooterAtEnd();
});
bodyObserver.observe(document.body, { childList: true });
