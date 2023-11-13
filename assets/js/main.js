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

document.addEventListener("DOMContentLoaded", function () {
  // when the page loads
  var iframe = document.getElementById("gameFrame"); // get the iframe game element
  if (iframe) {
    iframe.addEventListener("mouseenter", () => {
      iframe_focus(iframe);
    }); // add event listeners to the iframe that focus it when the mouse enters
    window.onload = () => {
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
  alert("To Fullscreen, Right Click the Game and hit Enter Fullscreen");
}

function searchbar1() {
  const searchvalue = document.getElementById("query");
  var icon_divs = document.getElementById("icon_image");
  var elem = icon_divs.getElementsByTagName("a");
  var ads = document.getElementsByClassName("ad");
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
    if (elem[i].className !== category) {
      elem[i].style.visibility = "collapse";
      elem[i].style.display = "none";
    } else {
      elem[i].style.visibility = "visible";
      elem[i].style.display = "inline-block";
    }
  }
}

function showall() {
  var icon = document.getElementById("icon_image");
  var elem = icon.getElementsByTagName("a");
  var all = document.getElementById("All");

  sorterbuttons(all);
  for (var i = 0; i < elem.length; i++) {
    elem[i].style.visibility = "visible";
    elem[i].style.display = "inline-block";
  }
  var ads = document.getElementsByClassName("ad");
  for (var i = 0; i < ads.length; i++) {
    ads[i].style.visibility = "visible";
    ads[i].style.display = "inline-block";
  }
}

function enlargeimage(image) {
  image.style.transform = "scale(1.15)";
  image.style.transition = "transform 0.25s ease";
  var fig = image.parentElement.getElementsByTagName("figcaption")[0];
  if (fig !== undefined) {
    fig.style.visibility = "visible";
  }
}

function notlarge(image) {
  image.style.transform = "scale(1)";
  image.style.transition = "transform 0.25s ease";
  var fig = image.parentElement.getElementsByTagName("figcaption")[0];
  if (fig !== undefined) {
    fig.style.visibility = "hidden";
  }
}

function showimage(element) {
  var child = element.parentElement.getElementsByTagName("a")[0];
  child.style.visibility = "visible";
}
function unimage(element) {
  var child = element.parentElement.getElementsByTagName("a")[0];
  child.style.visibility = "hidden";
}
function showimagea(element) {
  element.style.visibility = "visible";
}
function unimagea(element) {
  element.style.visibility = "hidden";
}

function spin(image) {
  image.style.transform = "rotate(359deg)";
  image.style.transition = "transform 0.25s ease";
}

function unspin(image) {
  image.style.transform = "rotate(0deg)";
}
