const IMG_CONTAINER_CLASS = "_2pktu"; // <-- constant class name for image container
const BUTTON_CONTAINER_CLASS = "_3qNGb";

const onImageOpen = (wrapperElement) => {
    var buttonContainer = wrapperElement.getElementsByClassName(BUTTON_CONTAINER_CLASS)[0];
    if (buttonContainer.children.length < 6) {
        window.setTimeout(() => onImageOpen(wrapperElement), 500);
        return;
    }
    const exampleButton = buttonContainer.children[0];
    var newButton = exampleButton.cloneNode(true);
    newButton.addEventListener("click", rotateImage);

    buttonContainer.prepend(newButton);
    for (let i = 0; i < buttonContainer.children.length; i++) {
        var el = buttonContainer.children[i];
        console.log(el);
        el.style.zIndex = "9999";
    }
}

const rotateImage = () => {
    var imgWrapper = document.getElementsByClassName(IMG_CONTAINER_CLASS)[0];
    let currRotation = getCurrentRotation(imgWrapper)*-1;
    if (currRotation < 270) currRotation += 90;
    else currRotation = 0;
    imgWrapper.style.transform = "rotate(-" + currRotation + "deg)";
}

const getCurrentRotation = (element) => {
    const PROP = "rotate";
    const transformString = element.style.transform;
    let currString = "";
    let propIndex = -1;
    let stringValue = "";

    // Find property name to get "(" index.
    for (let i = 0; i < transformString.length; i++) {
        if (currString.length < PROP.length) {
            currString += transformString[i];
        }
        if (currString.length == PROP.length) {
            if (currString == PROP) {
                propIndex = i+1;
                break;
            }
            currString += transformString[i];
            currString = currString.substring(1);
        }  
    }

    if (propIndex == -1 || transformString.charAt(propIndex) != "(") return 0;    
    let i = propIndex+1;
    while (transformString.charAt(i) != ")") {
        stringValue += transformString.charAt(i);
        i++;
    }
    return parseInt(stringValue.substring(0, stringValue.length-3));
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