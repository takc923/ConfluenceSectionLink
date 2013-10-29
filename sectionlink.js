var settings = {
    H1: "19px",
    H2: "16px",
    H3: "15px",
    H4: "13px",
    H5: "12px",
    H6: "10px"
};

document.onreadystatechange = function () {
    if (document.readyState != "complete"
        || ! document.getElementById("confluence-base-url")) {
        return;
    }

    chrome.storage.sync.get("enableEscapeUrl", function(items){
        var headingList = document.getElementsByClassName("wiki-content")[0].querySelectorAll("h1, h2, h3, h4, h5, h6");
        for (var i = 0; i < headingList.length; i++) {
            var iconAnchor = createIconAnchor(headingList[i], items.enableEscapeUrl);
            headingList[i].appendChild(iconAnchor);

            headingList[i].addEventListener("mouseover", function(){
                this.lastChild.style.display = "inline";
            });

            headingList[i].addEventListener("mouseout", function(){
                this.lastChild.style.display = "none";
            });
        }
    });
};

function createIconAnchor(heading, enableEscapeUrl) {
    var imgElement = document.createElement("img");
    imgElement.src = chrome.extension.getURL("link.png");
    imgElement.style.height = settings[heading.tagName];

    var anchor = document.createElement("a");
    var hash = (enableEscapeUrl) ? encodeURI(heading.id) : heading.id;
    anchor.href = '#' + hash;
    anchor.style.display = "none";
    anchor.appendChild(imgElement);

    return anchor;
}
