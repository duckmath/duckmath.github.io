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
const APP_VER = "apps7";
const REQUERY_TIME = 2; // in days
async function get_all_apps() {
  const date_last_queryed = JSON.parse(localStorage.getItem("dlq"));
  const local_apps = JSON.parse(localStorage.getItem(APP_VER));
  console.log((new Date().getTime() - date_last_queryed) / 1000 / 60 / 60 / 24);

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
  remove_all_children(element);
  query.sort((a, b) => (a.is_featured === true ? -1 : 0));
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
    a.href = `/games/?title=${appTitle}`;
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

  if (!apps) {
    console.error("Error fetching app:", error);
    window.alert(
      "Error fetching exact app. Please try again later. If the problem persists, please contact support."
    );
    return null;
  }
  const app = apps.find((app) => app.title === title);
  if (!app) {
    console.error("App not found:", title);
    window.alert("App not found. Trying going back to home page.");
    window.location.href = "/g404.html";
    return null;
  }

  return app;
}

async function hydrateAppPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const appTitle = urlParams.get("title");

  if (!appTitle) {
    console.error("No app title provided in the URL.");
    return;
  }

  const appData = await get_app_by_title(appTitle);

  if (!appData) {
    console.error("Class not found:", appTitle);
    window.alert("Class not found. Trying going back to home page.");
    window.location.href = "/g404.html";
    return;
  }
  window.document.title =
    appTitle.replaceAll("-", " ") +
    ` - ${window.location.hostname.split(".")[0]}`;

  // Populate the page with app data
  // Create span for description with inline CSS
  const descSpan = document.createElement("span");
  descSpan.textContent = appData.desc;
  descSpan.style.fontSize = "0.85rem";
  descSpan.style.color = "rgb(0, 240, 255)";
  descSpan.style.display = "block";
  descSpan.style.lineHeight = "1";
  document.getElementById("main_div").prepend(descSpan);

  document
    .getElementById("main_div")
    .prepend(appData.title.replaceAll("-", " "));
  document.getElementById("gameFrame").src = appData.link;

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
        .slice(0, 3);
      const finalList =
        scored.length > 0 ? scored.map((x) => x.app) : allApps.slice(0, 3);

      for (const rel of finalList) {
        const a = document.createElement("a");
        a.href = `/games/?title=${rel.title}`;
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
    list_all_apps(appListElement);
  }
  if (
    window.location.pathname.includes("games") &&
    window.location.search.includes("title")
  ) {
    hydrateAppPage();
  } else if (window.location.pathname.includes("games")) {
    alert("No app title provided in the URL.");
    window.location.href = "/g404.html";
  }
});
