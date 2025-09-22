const supabaseUrl = "https://hqlgppguxhqeaonjzinv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxbGdwcGd1eGhxZWFvbmp6aW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MjYwNDQsImV4cCI6MjA0ODIwMjA0NH0.4LuWk4qxp0NRZ5_erEIJq5BHq5qZiSE4zTUFS1ioZw8";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

function create_in_article_ad() {
  /**
   * <div class="ad">
          <ins
            class="adsbygoogle"
            style="display: block"
            data-ad-client="ca-pub-8362959866002557"
            data-ad-slot="8239998772"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
   */
  const adDiv = document.createElement("div");
  adDiv.className = "ad";
  const ins = document.createElement("ins");
  ins.className = "adsbygoogle";
  ins.style.display = "block";
  ins.setAttribute("data-ad-client", "ca-pub-8362959866002557");
  ins.setAttribute("data-ad-slot", "8239998772");
  ins.setAttribute("data-ad-format", "auto");
  ins.setAttribute("data-full-width-responsive", "true");
  const script = document.createElement("script");
  script.innerHTML = "(adsbygoogle = window.adsbygoogle || []).push({});";
  adDiv.appendChild(ins);
  adDiv.appendChild(script);
  return adDiv;
}
const APP_VER = "apps9";
const REQUERY_TIME = 2; // in days
async function get_all_apps() {
  const date_last_queryed = JSON.parse(localStorage.getItem("dlq"));
  const local_apps = JSON.parse(localStorage.getItem(APP_VER));
  // console.log((new Date().getTime() - date_last_queryed) / 1000 / 60 / 60 / 24);

  const onLocalHost = false; // window.location.includes("localhost");
  if (
    !onLocalHost &&
    Array.isArray(local_apps) &&
    date_last_queryed &&
    (new Date().getTime() - date_last_queryed) / 1000 / 60 / 60 / 24 <=
      REQUERY_TIME &&
    local_apps?.[0] !== null
  ) {
    console.log("Using local apps data.");
    return local_apps;
  } else {
    console.log("Fetching apps data from Supabase.");
    const { data, error } = await supabaseClient.rpc(
      "get_apps_ordered_by_title"
    );
    if (error) {
      console.error("Error fetching apps:", error);
      window.alert(
        "Error fetching apps. Please try again later. If the problem persists, please contact support."
      );
      return null;
    }
    // Store the data in local storage with a timestamp
    localStorage.setItem(APP_VER, JSON.stringify(data));
    localStorage.setItem("dlq", JSON.stringify(new Date().getTime()));
    return data;
  }
}

function remove_all_children(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 *
 * @param {Element} element
 */
async function list_all_apps(element) {
  const query = await get_all_apps();
  if (!Array.isArray(query)) {
    return;
  }
  remove_all_children(element);
  for (let i = 0; i < query.length; i++) {
    /**
     * <a id="Retro Bowl" class="Sports 2D" href="games/retro_bowl.html"
          ><img
            onmouseover="viewFig(this)"
            onmouseout="hideFig(this)"
            src="assets/img/icons/retro_bowl_icon.webp"
            alt="Icon"
            loading="lazy"
          />
          <figcaption>Retro Bowl</figcaption></a
        >
        re create this code with the data from the query
     */
    const app = query[i];
    const appTitle = app.title;
    const appCategory = app.categories;
    const appId = app.id;
    const appIcon = app.icon;

    // now create the element
    const a = document.createElement("a");
    a.id = appTitle;
    a.className = appCategory;
    a.href = `/g4m3s/?title=${appTitle}`;
    const img = document.createElement("img");
    img.onmouseover = function () {
      viewFig(this);
    };
    img.onmouseout = function () {
      hideFig(this);
    };
    img.src = appIcon;
    img.alt = appTitle;
    img.loading = "lazy";
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = appTitle.replaceAll("-", " ");
    a.appendChild(img);
    a.appendChild(figcaption);

    element.appendChild(a);
    if (i % 40 === 0 && i !== 0) {
      const adDiv = create_in_article_ad();
      element.appendChild(adDiv);
    }
  }
}

async function get_app_by_title(title) {
  const apps = await get_all_apps();

  if (!Array.isArray(apps)) {
    console.error("Error fetching apps list");
    return null;
  }
  const app = apps.find(
    (app) => app.title.toLowerCase() === title.toLowerCase()
  );
  if (!app) {
    console.error("App not found:", title);
    return null;
  }

  return app;
}

function renderGameNotFound(message) {
  try {
    const reason =
      message ||
      "We couldn't find that game. It may have been moved or removed.";
    const pagePrefix = window.location.hostname.split(".")[0];
    try {
      window.document.title = `Game Not Found - ${pagePrefix}`;
    } catch (_) {}

    const titleEl = document.getElementById("game-title");
    if (titleEl) {
      titleEl.textContent = "Game not found";
    }

    const iframeWrap = document.querySelector(".game-iframe-container");
    if (iframeWrap) {
      iframeWrap.innerHTML =
        '<div style="padding:24px; text-align:center; min-height:200px; display:flex; align-items:center; justify-content:center;">' +
        `<div>` +
        `<div style="font-size:1.25rem; font-weight:600; margin-bottom:8px;">Game not found</div>` +
        `<div style="opacity:0.9; margin-bottom:12px;">${reason}</div>` +
        `<a href="/" style="color:#ff6b6b; text-decoration:none;">\u2190 Back to games</a>` +
        `</div>` +
        `</div>`;
    }

    const descTarget = document.getElementById("game-description");
    if (descTarget) {
      descTarget.textContent = "";
    }

    const relatedWrap = document.getElementById("related-games");
    if (relatedWrap) {
      try {
        get_all_apps()
          .then((all) => {
            if (!Array.isArray(all)) return;
            remove_all_children(relatedWrap);
            const picks = all.slice(0, 3);
            for (const rel of picks) {
              const a = document.createElement("a");
              a.href = `/g4m3s/?title=${rel.title}`;
              const img = document.createElement("img");
              img.src = rel.icon;
              img.alt = rel.title;
              img.loading = "lazy";
              img.style.width = "120px";
              img.style.height = "120px";

              a.appendChild(img);
              relatedWrap.appendChild(a);
            }
          })
          .catch(() => {});
      } catch (_) {}
    }
  } catch (e) {
    // As a last resort, fall back to 404 page
    try {
      window.location.href = "/g404.html";
    } catch (_) {}
  }
}

async function hydrateAppPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const appTitle = urlParams.get("title");

  if (!appTitle) {
    console.error("No app title provided in the URL.");
    renderGameNotFound("No game specified in the URL.");
    return;
  }

  const appData = await get_app_by_title(appTitle);

  if (!appData) {
    console.error("Game not found:", appTitle);
    renderGameNotFound(
      `We couldn't find "${appTitle.replaceAll(
        "-",
        " "
      )}". It may have been moved or renamed.`
    );
    return;
  }

  // remove current canonical and add new one
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  if (existingCanonical) {
    existingCanonical.remove();
  }

  const canonicalLink = document.createElement("link");
  canonicalLink.rel = "canonical";
  canonicalLink.href = `https://duckmath.org/g4m3s/?title=${appData.title}`;
  document.head.appendChild(canonicalLink);

  window.document.title =
    appTitle.replaceAll("-", " ") +
    ` - ${window.location.hostname.split(".")[0]}`;

  // Populate the page with app data
  // Render markdown description safely under the game
  try {
    const descTarget = document.getElementById("game-description");
    if (descTarget && appData.desc) {
      const rawHtml =
        typeof window !== "undefined" && window.marked && window.marked.parse
          ? window.marked.parse(appData.desc)
          : appData.desc;
      const safeHtml =
        typeof window !== "undefined" &&
        window.DOMPurify &&
        window.DOMPurify.sanitize
          ? window.DOMPurify.sanitize(rawHtml)
          : rawHtml;
      descTarget.innerHTML = safeHtml;
    }
  } catch (e) {
    console.warn(
      "Failed to render markdown description; falling back to text.",
      e
    );
    const descTarget = document.getElementById("game-description");
    if (descTarget && appData.desc) {
      descTarget.innerText = appData.desc;
    }
  }

  document
    .getElementById("game-title")
    .prepend(appData.title.replaceAll("-", " ") + " Unblocked");

  // Add small text under title about .top_message property
  if (appData?.top_message) {
    const titleElement = document.getElementById("game-title");
    const infoText = document.createElement("div");
    infoText.style.fontSize = ".6rem";
    infoText.style.color = "#666";
    infoText.style.marginTop = ".5rem";
    infoText.textContent = appData?.top_message;
    titleElement.appendChild(infoText);
  }
  const GAMES_PAGE_URL = "https://r2.maddox.page";
  let app_link = appData.link;
  if (window.location.hostname === "duckmath.org") {
    app_link = app_link.replace(GAMES_PAGE_URL, "https://db.duckmath.org");
  }
  document.getElementById("gameFrame").src = app_link;

  // Populate minimal related games (3 items) after fullscreen button
  try {
    const allApps = await get_all_apps();
    const relatedWrap = document.getElementById("related-games");
    if (relatedWrap && Array.isArray(allApps)) {
      remove_all_children(relatedWrap);
      const currentCats = new Set(
        Array.isArray(appData.categories)
          ? appData.categories
          : typeof appData.categories === "string"
          ? appData.categories.split(" ")
          : []
      );
      const scored = allApps
        .filter((a) => a.title !== appData.title)
        .map((a) => {
          const aCats = Array.isArray(a.categories)
            ? a.categories
            : typeof a.categories === "string"
            ? a.categories.split(" ")
            : [];
          const overlap = aCats.some((c) => currentCats.has(c));
          return { app: a, score: overlap ? 1 : 0 };
        })
        .filter((x) => x.score > 0)
        .slice(0, 6);
      const finalList =
        scored.length > 0 ? scored.map((x) => x.app) : allApps.slice(0, 3);

      for (const rel of finalList) {
        const a = document.createElement("a");
        a.href = `/g4m3s/?title=${rel.title}`;
        const img = document.createElement("img");
        img.src = rel.icon;
        img.alt = rel.title;
        img.loading = "lazy";
        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "10px";
        a.appendChild(img);
        relatedWrap.appendChild(a);
      }
    }
  } catch (e) {
    console.warn("Unable to populate related games", e);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const appListElement = document.getElementById("icon_image");
  if (appListElement) {
    list_all_apps(appListElement).then(() => {
      document.dispatchEvent(new Event("GamesLoaded"));
    });
  }

  if (
    window.location.pathname.includes("g4m3s") &&
    window.location.search.includes("title")
  ) {
    hydrateAppPage();
  } else if (window.location.pathname.includes("g4m3s")) {
    renderGameNotFound("No game specified in the URL.");
  }
});
