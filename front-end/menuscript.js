window.onscroll = function () { myFunction() };

var header = document.getElementById("mysecondmenu");
var tourDetail = document.querySelector(".tourdetail");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        tourDetail.classList.add("stickySide");
    } else {
        header.classList.remove("sticky");
        tourDetail.classList.remove("stickySide");
    }
}