var settings = {
    H1: "19px",
    H2: "16px",
    H3: "15px",
    H4: "13px",
    H5: "12px",
    H6: "10px"
};

var setIntervalId = setInterval(function(){
    if (document.readyState == "complete") {
        initialize();
        clearInterval(setIntervalId);
    }
}, 1000);

function initialize() {
    if (document.getElementsByName("confluence-request-time").length === 0) {
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
    var hash = (heading.id) ? heading.id : heading.querySelector("a").name;
    hash = (enableEscapeUrl) ? encodeURI(hash) : hash;
    anchor.href = '#' + hash;
    anchor.style.display = "none";
    anchor.appendChild(imgElement);

    return anchor;
}
