const TOPRIGHT_BUTTON_CONTAINTER_CLASS = "_ajv2 _ajv1";
const CHAT_CONTAINER_CLASS = "_aigv _aigz";
const INPUT_CLASS = "x1hx0egp x6ikm8r x1odjw0f x1k6rcq7 x6prxxf";

let enterActive = true;
let previousBorder = "";
let inputOnFocus = false;

document.addEventListener("keypress", (e) => {
    if (!inputOnFocus) return;
    if(e.ctrlKey && e.key === ".") {
        toggleEnter();
    }

    if (e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

const stopperListener = (e) => {
    e.stopImmediatePropagation();
}

const onInputShow = () => {
    addToggleButton();
    enableEnter();
    enterActive = true;

    const textarea = getTextarea();
    textarea.addEventListener("focusin", (e) => {
        inputOnFocus = true;
    });

    textarea.addEventListener("focusout", (e) => {
        inputOnFocus = false;
    });
}

const toggleEnter = () => {
    if (enterActive) {
        disableEnter();
        enterActive = false;
    } else {
        enableEnter();
        enterActive = true;
    }

    updateToggleButonColor();
}

const disableEnter = () => {
    const textarea = getTextarea();
    textarea.parentElement.addEventListener("keydown", stopperListener, {capture: true}); 

    var wrapper = textarea.parentElement.parentElement;
    previousBorder = wrapper.style.border;
    wrapper.style.border = "3px solid #008069";
    wrapper.style.paddingTop = "7.4px";
    wrapper.style.paddingLeft = "10.4px";
    wrapper.style.paddingBottom = "7.4px";
}

const enableEnter = () => {
    theone.parentElement.removeEventListener("keydown", stopperListener, true); 

    const textarea = getTextarea();
    var wrapper = textarea.parentElement.parentElement;
    wrapper.style.border = previousBorder;
    wrapper.style.paddingTop = "9px";
    wrapper.style.paddingLeft = "12px";
    wrapper.style.paddingBottom = "9px";
}

const addToggleButton = () => {
    var buttonContainer = getButtonContainer();
    var buttonExample = buttonContainer.children[0];
    var newButton = buttonExample.cloneNode(true);

    newButton.addEventListener("click", toggleEnter);
    var bubble = newButton.querySelector("span[data-icon='search-alt']"); // SVG Container
    bubble.innerHTML = sendButtonSVG("#aebac1");
        
    buttonContainer.prepend(newButton);
}

const updateToggleButonColor = () => {
    var buttonContainer = getButtonContainer();
    var button = buttonContainer.children[0];

    var bubble = button.querySelector("span[data-icon='search-alt']"); // SVG Container
    bubble.innerHTML = sendButtonSVG(!enterActive ? "#008069" : "#aebac1");
}

const sendMessage = () => {
    var button = document.body.querySelector("button[aria-label='Send']");
    button.click();
}

const getTextarea = () => {
    var main = document.getElementById("main");
    return main.getElementsByClassName(INPUT_CLASS)[0];
}

const getButtonContainer = () => {
    var main = document.getElementById("main");
    return main.getElementsByClassName(TOPRIGHT_BUTTON_CONTAINTER_CLASS)[0];
}

function addObserverIfDesiredNodeAvailable2() {
    let elementToListen = document.getElementsByClassName(CHAT_CONTAINER_CLASS)[1];
    if (!elementToListen) {
        window.setTimeout(addObserverIfDesiredNodeAvailable2, 500);
        return;
    }
    console.log("registered")
    observer.observe(elementToListen, { childList: true });
}
addObserverIfDesiredNodeAvailable2();

const sendButtonSVG = (color) => {
    return `
        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="${color}" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
    `
};