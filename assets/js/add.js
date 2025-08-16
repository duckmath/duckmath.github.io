const sitename = window.location.hostname.split(".")[0];
const googleAna = document.createElement("script");
googleAna.async = true;
const duckmath_tag = "G-63K8BHHS38";

console.log("Sitename:", sitename);

function getTagFromSiteName() {
  switch (window.location.hostname.split(".")[0]) {
    case "duckmath":
      return duckmath_tag;

    default:
      console.log("Unknown site name:", sitename);
      return null;
  }
}

const tagId = getTagFromSiteName();
if (tagId) {
  googleAna.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;

  document.head.appendChild(googleAna);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  let adVariant = "None";

  if (sitename != "duckmath" || true) {
    // always run for now
    ////
    ///
    // append google code to site if needed
    const googleCode = document.createElement("script");
    googleCode.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8362959866002557";
    googleCode.async = true;
    googleCode.crossOrigin = "anonymous";
    document.head.appendChild(googleCode);
    console.log("appended goog");
    adVariant = "Adsense";
  } else {
    //  <link rel="dns-prefetch" href="https://universal.wgplayer.com" />
    // this should be in no matter what ^
    !(function (e, t) {
      (a = e.createElement("script")),
        (m = e.getElementsByTagName("script")[0]),
        (a.async = 1),
        (a.src = t),
        (a.fetchPriority = "high"),
        m.parentNode.insertBefore(a, m);
    })(
      document,
      "https://universal.wgplayer.com/tag/?lh=" +
        window.location.hostname +
        "&wp=" +
        window.location.pathname +
        "&ws=" +
        window.location.search
    );
    console.log("appended wee");
    adVariant = "Weegoo";
  }

  gtag("config", tagId, {
    m_ad_variant: adVariant,
  });
}
///
