var swfobject = {};

swfobject.embedSWF = function (url, cont, width, height) {
  let ruffle = window.RufflePlayer.newest(),
    player = Object.assign(
      document.getElementById(cont).appendChild(ruffle.createPlayer()),
      {
        width: width,
        height: height,
        style: "width: " + width + "px; height: " + height + "px",
      }
    );

  player.load({ url: url });
};

function iframe_focus(iframe) {
  iframe.focus();
  console.log("iframe focused");
}

function instaFocusIFrame(iframe) {
  if (window.location.href.includes("g4m3s/")) {
    if (iframe !== null && iframe !== undefined) {
      iframe_focus(iframe);
      // Check if iframe is focused
      if (document.activeElement !== iframe) {
        // if iframe is not focused...
        //set another timeout to try again
        setTimeout(instaFocusIFrame, 1000);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // when the page loads
  const iframe = document.getElementById("gameFrame"); // get the iframe game element
  if (iframe) {
    iframe.addEventListener("mouseenter", () => {
      iframe_focus(iframe);
    }); // add event listeners to the iframe that focus it when the mouse enters
    window.onload = () => {
      instaFocusIFrame(iframe);
      iframe_focus(iframe);
    };
    iframe_focus(iframe); // focus the iframe (for some reason this doesn't work without the onload event)
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("sorter")) {
    const topnav = document.getElementById("topnav");
    if (document.body.scrollHeight <= window.innerHeight) {
      document.body.classList.add("no-scroll");
      topnav.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      topnav.classList.remove("no-scroll");
    }
  }
});

let prevScrollPos = window.pageYOffset;
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      const topnav = document.getElementById("topnav");
      if (topnav) {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos > 0 && prevScrollPos === 0) {
          topnav.classList.add("header-scrolled");
        } else if (currentScrollPos === 0 && prevScrollPos > 0) {
          topnav.classList.remove("header-scrolled");
        }
        prevScrollPos = currentScrollPos;
      }
      ticking = false;
    });
    ticking = true;
  }
}

document.addEventListener("scroll", onScroll);

function openFullscreen() {
  // open the game in fullscreen
  let elem = document.getElementById("gameFrame");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
function ruffleFullscreen() {
  alert("To Fullscreen, Right Click the Application and hit Enter Fullscreen");
}

function searchbar1() {
  const searchvalue = document.getElementById("query");
  const icon_divs = document.getElementById("icon_image");
  const elem = icon_divs.getElementsByTagName("a");
  const ads = document.getElementsByClassName("ad");
  if (searchvalue.value === "") {
    console.log("Nothing Searched");
    for (let i = 0; i < ads.length; i++) {
      ads[i].style.visibility = "visible";
      ads[i].style.display = "inline-block";
    }
  } else {
    for (let i = 0; i < ads.length; i++) {
      ads[i].style.visibility = "hidden";
      ads[i].style.display = "none";
    }
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].id.toLowerCase().includes(searchvalue.value.toLowerCase())) {
        elem[i].style.visibility = "visible";
        elem[i].style.display = "inline-block";
      } else {
        elem[i].style.visibility = "collapse";
        elem[i].style.display = "none";
      }
    }
  }
}

function sorterbuttons(button) {
  const title = document.getElementById("title");
  const elem = title.getElementsByTagName("button");
  for (let i = 0; i < elem.length; i++) {
    if (elem[i] !== button) {
      if (elem[i].id !== "New") {
        elem[i].style.backgroundColor = "#fff";
      } else {
        elem[i].style.background =
          "linear-gradient(90deg, #f3f520, #59d102, #f3f520)";
        elem[i].style.backgroundSize = "400%";
      }
      elem[i].style.color = "#000";
    } else {
      if (elem[i].id !== "New") {
        elem[i].style.backgroundColor = "#ff0000";
      } else {
        elem[i].style.background =
          "linear-gradient(90deg, #f74c06, #f9bc2c, #f74c06)";
        elem[i].style.backgroundSize = "400%";
      }
      elem[i].style.color = "#fff";
    }
  }
}

function hide_all_ads() {
  let ads = document.getElementsByClassName("ad");
  let more_ads = document.getElementsByClassName("google-auto-placed");

  let all_ads = [];
  for (let i = 0; i < ads.length; i++) {
    all_ads.push(ads[i]);
  }
  for (let i = 0; i < more_ads.length; i++) {
    all_ads.push(more_ads[i]);
  }
  for (let i = 0; i < ads.length; i++) {
    all_ads[i].style.visibility = "hidden";
    all_ads[i].style.display = "none";
  }
}

function show_all_ads() {
  let ads = document.getElementsByClassName("ad");
  let more_ads = document.getElementsByClassName("google-auto-placed");

  let all_ads = [];
  for (let i = 0; i < ads.length; i++) {
    all_ads.push(ads[i]);
  }
  for (let i = 0; i < more_ads.length; i++) {
    all_ads.push(more_ads[i]);
  }
  for (let i = 0; i < ads.length; i++) {
    all_ads[i].style.visibility = "visible";
    all_ads[i].style.display = "inline-block";
  }
}

function sorter(category) {
  const icon = document.getElementById("icon_image");
  const elem = icon.getElementsByTagName("a");
  hide_all_ads()

  for (let i = 0; i < elem.length; i++) {
    if (!elem[i].className.includes(category)) {
      // if the element is not the category
      elem[i].style.visibility = "collapse";
      elem[i].style.display = "none";
    } else {
      elem[i].style.visibility = "visible";
      elem[i].style.display = "inline-block";
    }
  }
}

function showchildren(parent) {
  const children = parent.children;
  for (let i = 0; i < children.length; i++) {
    children[i].style.visibility = "visible";
  }
}

function hidechildren(parent) {
  const children = parent.children;
  for (let i = 0; i < children.length; i++) {
    children[i].style.visibility = "hidden";
  }
}

function showall() {
  const icon = document.getElementById("icon_image");
  const elem = icon.getElementsByTagName("a");
  const all = document.getElementById("All");

  sorterbuttons(all); // remove ad
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.visibility = "visible";
    elem[i].style.display = "inline-block";
  }
  show_all_ads()
}

function viewFig(elem) {
  const fig = elem.parentElement.querySelector("figcaption");
  if (fig) {
    fig.style.visibility = "visible";
    fig.style.opacity = "1";
  }
}

function hideFig(elem) {
  const fig = elem.parentElement.querySelector("figcaption");
  if (fig) {
    fig.style.visibility = "hidden";
    fig.style.opacity = "0";
  }
}

function spin(element) {
  element.style.transform = "rotate(359deg)";
  element.style.transition = "transform 0.25s ease";
}

function unspin(element) {
  element.style.transform = "rotate(0deg)";
}

function home() {
  window.location.href = "/";
}
