var swfobject = {};

swfobject.embedSWF = function(url, cont, width, height){
    var ruffle = window.RufflePlayer.newest(),
        player = Object.assign(document.getElementById(cont).appendChild(ruffle.createPlayer()), {
            width: width,
            height: height,
            style: 'width: ' + width + 'px; height: ' + height + 'px',
        });

    player.load({ url: url });
}

function openFullscreen() {
    var elem = document.getElementById("gameFrame");
    console.log(elem)
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
function sorter(category) {
    var elem = document.getElementsByClassName(category);
    console.log(elem)
}
function enlargeimage(image) {
    image.style.transform = "scale(1.15)";
    image.style.transition = "transform 0.25s ease";
    var fig = image.parentElement.getElementsByTagName("figcaption")[0];
    fig.style.visibility = "visible";



}

function notlarge(image) {
    image.style.transform = "scale(1)";
    image.style.transition = "transform 0.25s ease";
    var fig = image.parentElement.getElementsByTagName("figcaption")[0];
    fig.style.visibility = "hidden";


}

function spin(image){
    image.style.transform = "rotate(359deg)";
    image.style.transition = "transform 0.25s ease";


}

function unspin(image){
    image.style.transform = "rotate(0deg)";
}



