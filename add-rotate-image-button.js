const onImageOpen = (wrapperElement) => {
    console.log("image opened")
    const buttonContainer = wrapperElement.getElementsByClassName("_3qNGb")[0];
    console.log(buttonContainer.children.length);
    if (buttonContainer.children.length < 7) {
        window.setTimeout(() => onImageOpen(wrapperElement), 500);
        return;
    }
    const exampleButton = buttonContainer.children[0];
    var newButton = exampleButton.cloneNode(true);
    newButton.addEventListener("click", rotateImage);
    document.getElementsByClassName("_3qNGb")[0].prepend(newButton);
}

const rotateImage = () => {
    var imgWrapper = document.getElementsByClassName("_3VqhE")[0];
    console.log(imgWrapper)
    imgWrapper.style.transform = "rotate(-90deg)";
    console.log(imgWrapper.style.transform);
}


var observer = new WebKitMutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            onImageOpen(mutation.addedNodes[i]);
        }
    });
});

function addObserverIfDesiredNodeAvailable() {
    let elementToListen = document.getElementsByClassName("app-wrapper-web")[0];
    if (!elementToListen || elementToListen.children.length < 2) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        return;
    }
    elementToListen = elementToListen.children[2];
    observer.observe(elementToListen, { childList: true });
}
addObserverIfDesiredNodeAvailable();