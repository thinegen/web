var hoverNotes;


window.addEventListener("load", function () {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }

    var sups = document.getElementsByTagName("sup");
    for (var i = 0; i < sups.length; i++) {
        var sup = sups[i];
        if (sup.id && sup.id.startsWith("fnref")) {
            sup.style.position = "relative";

            var footnote = document.getElementById(sup.id.replace("fnref", "fn"));

            var hoverNote = document.createElement("span");
            hoverNote.innerHTML = footnote.innerHTML;
            hoverNote.className = "hoverNote";

            var backRef = hoverNote.querySelector(".footnote-backref");
            backRef.remove();

            sup.appendChild(hoverNote);

            sup.firstChild.addEventListener("click", function (event) {
                this.nextSibling.style.visibility = "visible";
                event.preventDefault();
            });
        }
    }
    hoverNotes = document.getElementsByClassName("hoverNote");

    document.addEventListener("mousedown", function (event) {
        if (event.target.className == "footnote-ref"
            || event.target.className == "hoverNote"
            || event.target.parentNode.className == "hoverNote") {
            return;
        }

        for (var i = 0; i < hoverNotes.length; i++) {
            if(hoverNotes[i].contains(event.target)) {
                return;
            }
        }

        for (var i = 0; i < hoverNotes.length; i++) {
            hoverNotes[i].style.visibility = "hidden";
        }
    });

    var footnoteSec = document.querySelector(".footnotes");
    if (footnoteSec) {
        footnoteSec.style.display = "none";
    }
});
