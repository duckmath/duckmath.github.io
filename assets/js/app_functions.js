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

/**
 *
 * @param {Element} element
 */
async function list_all_apps(element) {
  const { data, error } = await supabaseClient.rpc("get_apps_ordered_by_title");
  const query = data;

  for (let i = 0; i < query.length; i++) {
    /**
     * <a id="Retro Bowl" class="Sports 2D" href="g4m3s/retro_bowl.html"
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
  const { data, error } = await supabaseClient
    .from("apps")
    .select("*")
    .eq("title", title)
    .single();

  if (error) {
    console.error("Error fetching app:", error);
    return null;
  }

  return data;
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
    console.error("App not found:", appTitle);
    return;
  }

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
}

document.addEventListener("DOMContentLoaded", function () {
  const appListElement = document.getElementById("icon_image");
  if (appListElement) {
    list_all_apps(appListElement);
  }
  if (
    window.location.pathname.includes("g4m3s") &&
    window.location.search.includes("title")
  ) {
    hydrateAppPage();
  } else if (window.location.pathname.includes("g4m3s")) {
    alert("No app title provided in the URL.");
    window.location.href = "/404.html";
  }
});
