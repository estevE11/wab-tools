var observer = new WebKitMutationObserver(function (mutations) {
    const mutation = mutations[0];
    const className = mutation.target.className;
    if (mutation.type == "childList") {
        if (className == "_2Ts6i _2xAQV") {
            onInputShow();
        } else {
            onImageOpen(mutation.addedNodes[0]);
        }
    }
});