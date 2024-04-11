const IMG_CONTAINER_CLASS = "_ajuf"; // <-- constant class name for image container
const BUTTON_CONTAINER_CLASS = "_ajv3";

const onImageOpen = (wrapperElement) => {
    var buttonContainer = wrapperElement.getElementsByClassName(BUTTON_CONTAINER_CLASS)[0];
    if (buttonContainer.children.length < 6) {
        window.setTimeout(() => onImageOpen(wrapperElement), 50);
        return;
    }

    const exampleButton = buttonContainer.children[0];
    var newButton = exampleButton.cloneNode(true);
    newButton.addEventListener("click", rotateImage);
    var bubble = newButton.querySelector("span[data-icon='bubble']"); // SVG Container
    if(!bubble)
        bubble = newButton.querySelector("span[data-icon='reply']"); // SVG Container

    bubble.innerHTML = rotateIconSVG;
    buttonContainer.prepend(newButton);

    for (let i = 0; i < buttonContainer.children.length; i++) {
        var el = buttonContainer.children[i];
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
    // Get the transform property value from the element's style
    const transformString = element.style.transform || window.getComputedStyle(element).transform;
    // Use a regular expression to match the rotation value in the transform property
    const match = transformString.match(/rotate\(([-+]?\d*\.?\d+)(?:deg)?\)/);
    // Check if a match is found and extract the rotation value
    if (match && match[1]) {
        // Convert the rotation value to a floating-point number
        return parseFloat(match[1]);
    } else {
        // Return 0 if no rotation value is found
        return 0;
    }
};

function addObserverIfDesiredNodeAvailable() {
    let elementToListen = document.getElementsByClassName("app-wrapper-web")[0];
    if (!elementToListen || elementToListen.children.length <= 2) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        return;
    }
    elementToListen = elementToListen.children[3];
    observer.observe(elementToListen, { childList: true });
}
addObserverIfDesiredNodeAvailable();

const rotateIconSVG = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12.5 20.5C17.1944 20.5 21 16.6944 21 12C21 7.30558 17.1944 3.5 12.5 3.5C7.80558 3.5 4 7.30558 4 12C4 13.5433 4.41128 14.9905 5.13022 16.238M1.5 15L5.13022 16.238M6.82531 12.3832L5.47107 16.3542L5.13022 16.238" stroke="#aebac1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;