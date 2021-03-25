window.addEventListener("load", function () {

    var tocDiv = document.querySelector("#TOCHeader");
    var tocNav = document.querySelector("nav#TableOfContents");

    var hamburgerBtn = document.querySelector("#TOC-button");
    hamburgerBtn.addEventListener("click", function (event) {
        if(tocNav.style.display === "none") {
            tocNav.style.display = "unset";
            tocDiv.style.marginBottom = "0.75em";
            hamburgerBtn.classList.add("is-active");
        } else {
            tocNav.style.display = "none";
            tocDiv.style.marginBottom = "";
            hamburgerBtn.classList.remove("is-active");
        }
        event.preventDefault();
    });

    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        tocNav.style.display = "unset";
        tocDiv.style.marginBottom = "0.75em";
        hamburgerBtn.classList.add("is-active");
    }
});