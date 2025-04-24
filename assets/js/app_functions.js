const supabaseUrl = "https://hqlgppguxhqeaonjzinv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxbGdwcGd1eGhxZWFvbmp6aW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MjYwNDQsImV4cCI6MjA0ODIwMjA0NH0.4LuWk4qxp0NRZ5_erEIJq5BHq5qZiSE4zTUFS1ioZw8";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

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

  document.getElementById("main_div").prepend(appData.title);
  document.getElementById("gameFrame").src = appData.link;
}

document.addEventListener("DOMContentLoaded", function () {
  const appListElement = document.getElementById("icon_image");
  if (appListElement) {
    list_all_apps(appListElement);
  }
  if (window.location.pathname.includes("g4m3s")) {
    hydrateAppPage();
  }
});
