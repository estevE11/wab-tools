var observer = new WebKitMutationObserver(function (mutations) {
    const mutation = mutations[0];
    const className = mutation.target.className;
    if (mutation.type == "childList") {
        console.log(className);
        if (className == CHAT_CONTAINER_CLASS) {
            onInputShow();
            handleArrowEdit();
        } else {
            onImageOpen(mutation.addedNodes[0]);
        }
    }
});