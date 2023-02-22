
function enlargeimage(image) {
    image.style.transform = "scale(1.15)";
    image.style.transition = "transform 0.25s ease";


}

function notlarge(image) {

    image.style.transform = "scale(1)";
    image.style.transition = "transform 0.25s ease";

}

function spin(image){
    image.style.transform = "rotate(359deg)";
    image.style.transition = "transform 0.25s ease";


}

function unspin(image){
    image.style.transform = "rotate(0deg)";
}
