var swfobject = {};

swfobject.embedSWF = function (url, cont, width, height) {
  var ruffle = window.RufflePlayer.newest(),
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

function instaFocusIFrame(iframe){
  if(window.location.href.includes("g4m3s/")) {
    if(iframe !== null && iframe !== undefined){
      iframe_focus(iframe);
      // Check if iframe is focused
      if(document.activeElement !== iframe){ // if iframe is not focused...
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

function openFullscreen() {
  // open the game in fullscreen
  var elem = document.getElementById("gameFrame");
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
    for (var i = 0; i < ads.length; i++) {
      ads[i].style.visibility = "visible";
      ads[i].style.display = "inline-block";
    }
  } else {
    for (var i = 0; i < ads.length; i++) {
      ads[i].style.visibility = "hidden";
      ads[i].style.display = "none";
    }
    for (var i = 0; i < elem.length; i++) {
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
  var title = document.getElementById("title");
  var elem = title.getElementsByTagName("button");
  for (var i = 0; i < elem.length; i++) {
    if (elem[i] !== button) {
      elem[i].style.backgroundColor = "#ffffff";
      elem[i].style.color = "black";
    } else {
      elem[i].style.backgroundColor = "#ff0000";
      elem[i].style.color = "white";
    }
  }
}

function sorter(category) {
  var icon = document.getElementById("icon_image");
  var elem = icon.getElementsByTagName("a");
  var ads = document.getElementsByClassName("ad");
  for (var i = 0; i < ads.length; i++) {
    ads[i].style.visibility = "hidden";
    ads[i].style.display = "none";
  }

  for (var i = 0; i < elem.length; i++) {
    if (!elem[i].className.includes(category)) { // if the element is not the category
      elem[i].style.visibility = "collapse";
      elem[i].style.display = "none";
    } else {
      elem[i].style.visibility = "visible";
      elem[i].style.display = "inline-block";
    }
  }
}

function showchildren(parent) {
  var children = parent.children;
  for(var i = 0; i < children.length; i++) {
    children[i].style.visibility = "visible";
  }
}

function hidechildren(parent) {
  var children = parent.children;
  for(var i = 0; i < children.length; i++) {
    children[i].style.visibility = "hidden";
  }
}


function showall() {
  var icon = document.getElementById("icon_image");
  var elem = icon.getElementsByTagName("a");
  var all = document.getElementById("All");

  sorterbuttons(all); // remove ad
  for (var i = 0; i < elem.length; i++) {
    elem[i].style.visibility = "visible";
    elem[i].style.display = "inline-block";
  }
  const ads = document.getElementsByClassName("ad");
  for (var i = 0; i < ads.length; i++) {
    ads[i].style.visibility = "visible";
    ads[i].style.display = "inline-block";
  }
}

function viewFig(elem) {
  const fig = elem.parentElement.querySelector("figcaption");
  showFigcaption(fig);
}

function hideFig(elem) {
  const fig = elem.parentElement.querySelector("figcaption");
  hideFigcaption(fig);
}

function showFigcaption(fig) {
  if (fig !==  undefined && fig !== null) {
    fig.style.visibility = "visible";
    fig.style.opacity = "1";
  }
}

function hideFigcaption(fig) {
  if (fig !==  undefined && fig !== null) {
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

