const sitename = window.location.hostname.split(".")[0];
const googleAna = document.createElement("script");
googleAna.async = true;
const duckmath_tag = "G-63K8BHHS38";
const nullxiety_tag = "G-5GCMDH3FDB";
const quizquack_tag = "G-55QC47N5PZ";
const ducksum_tag = "G-P9P8QKJZGL";

console.log("Sitename:", sitename);

function getTagFromSiteName() {
  switch (window.location.hostname.split(".")[0]) {
    case "duckmath":
      return duckmath_tag;
    case "nullxiety":
      return nullxiety_tag;
    case "quizquack":
      return quizquack_tag;
    case "ducksum":
      return ducksum_tag;
    default:
      console.log("Unknown site name:", sitename);
      return null;
  }
}

googleAna.src = `https://www.googletagmanager.com/gtag/js?id=${getTagFromSiteName()}`;

document.head.appendChild(googleAna);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", getTagFromSiteName());

if (sitename != "duckmath") {
  ///
  // append google code to site if needed
  const googleCode = document.createElement("script");
  googleCode.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8362959866002557";
  googleCode.async = true;
  googleCode.crossOrigin = "anonymous";
  document.head.appendChild(googleCode);
  console.log("appended goog");
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
}
///
