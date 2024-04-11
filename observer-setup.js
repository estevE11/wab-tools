const wablog = (msg) => {
    console.log("[WAB Tools]: " + msg);
}


var observer = new WebKitMutationObserver(function (mutations) {
    const mutation = mutations[0];
    const className = mutation.target.className;
    if (mutation.type == "childList") {
        console.log(className);
        if (className == CHAT_CONTAINER_CLASS) {
            onInputShow();
        } else {
            onImageOpen(mutation.addedNodes[0]);
        }
    }
});