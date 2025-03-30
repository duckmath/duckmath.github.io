///
// append google code to site if needed
const googleCode = document.createElement("script");
googleCode.src =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8362959866002557";
googleCode.async = true;
googleCode.crossOrigin = "anonymous";

if (window.location.hostname.split(".")[0] != "duckmath") {
  console.log("appended goog");
  document.head.appendChild(googleCode);
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
