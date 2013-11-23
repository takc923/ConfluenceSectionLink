var settings = {
    H1: "19px",
    H2: "16px",
    H3: "15px",
    H4: "13px",
    H5: "12px",
    H6: "10px"
};

function initialize() {
    var content = document.getElementsByClassName("wiki-content")[0];
    if (document.getElementsByName("confluence-request-time").length === 0 // not confluence page
       || content == undefined) { // non content page like dashboard
        return;
    }

    chrome.storage.sync.get("enableEscapeUrl", function(items){
        var headingList = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
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
    anchor.href = "javascript:void(0);";
    anchor.dataset.rawHash = (heading.id) ? heading.id : heading.querySelector("a").name;
    anchor.dataset.encodedHash = encodeURI(anchor.dataset.rawHash);
    anchor.addEventListener("click", function() {
        switch(location.hash) {
            case '#' + this.dataset.rawHash:
            location.hash = this.dataset.encodedHash;
            break;
            case '#' + this.dataset.encodedHash:
            location.hash = this.dataset.rawHash;
            break;
            default:
            location.hash = (enableEscapeUrl) ? this.dataset.encodedHash : this.dataset.rawHash;
            break;
        }
    });
    anchor.style.display = "none";
    anchor.appendChild(imgElement);

    return anchor;
}

initialize();
