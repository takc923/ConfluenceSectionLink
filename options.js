window.onload = function(){
    restore_options();
    document.getElementById("save-button").addEventListener("click",save_options);
};

// Saves options to chrome.storage.
function save_options() {
    chrome.storage.sync.set({
        enableEscapeUrl: document.getElementById("enable-escape-url").checked
    },function() {
        if (chrome.runtime.lastError) {
            showMessage("<font color='#FF0000'>Failed to save...</font>");
        } else {
            showMessage("Saved!");
        }
    });
}

// Restores select box state to saved value from chrome.storage.
function restore_options() {
    chrome.storage.sync.get(["enableEscapeUrl"],function(items){
        document.getElementById("enable-escape-url").checked = items.enableEscapeUrl || false;
    });
}

function showMessage(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
    setTimeout(function() {
        status.innerHTML = "";
    }, 3000);
}
