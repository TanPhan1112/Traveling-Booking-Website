window.onscroll = function () { myFunction() };

var header = document.getElementById("mysecondmenu");
var tour_Detail = document.querySelector(".tour-detail");
var sticky = header.offsetTop;

function myFunction() {
    if (header !== null) {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
    if (tour_Detail !== null) {
        if (window.pageYOffset > sticky) {
            tour_Detail.classList.add("stickySide");
        } else {
            tour_Detail.classList.remove("stickySide");
        }
    }
}