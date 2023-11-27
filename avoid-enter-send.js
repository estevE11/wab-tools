let enterActive = true;

const stopperListener = (e) => {
    e.stopImmediatePropagation();
}

const onInputShow = () => {
    addToggleButton();
    enableEnter();
    enterActive = true;
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
    var mmain = document.getElementById("main");
    var theone = mmain.getElementsByClassName("to2l77zo gfz4du6o ag5g9lrv bze30y65 kao4egtt")[0];
    theone.parentElement.addEventListener("keydown", stopperListener, {capture: true}); 
}

const enableEnter = () => {
    var main = document.getElementById("main");
    var theone = main.getElementsByClassName("to2l77zo gfz4du6o ag5g9lrv bze30y65 kao4egtt")[0];
    theone.parentElement.removeEventListener("keydown", stopperListener, true); 
}

const addToggleButton = () => {
    var main = document.getElementById("main");
    var buttonContainer = main.getElementsByClassName("_1sPvB _2XdMx")[0];
    var buttonExample = buttonContainer.children[0];
    var newButton = buttonExample.cloneNode(true);

    newButton.addEventListener("click", toggleEnter);
    var bubble = newButton.querySelector("span[data-icon='search-alt']"); // SVG Container
    bubble.innerHTML = sendButtonSVG("#aebac1");
        
    buttonContainer.prepend(newButton);
}

const updateToggleButonColor = () => {
    var main = document.getElementById("main");
    var buttonContainer = main.getElementsByClassName("_1sPvB _2XdMx")[0];
    var button = buttonContainer.children[0];

    var bubble = button.querySelector("span[data-icon='search-alt']"); // SVG Container
    bubble.innerHTML = sendButtonSVG(!enterActive ? "#008069" : "#aebac1");
}

var observer = new WebKitMutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            onInputShow(mutation.addedNodes[i]);
        }
    });
});

function addObserverIfDesiredNodeAvailable() {
    let elementToListen = document.getElementsByClassName("_2Ts6i _2xAQV")[1];
    if (!elementToListen) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        return;
    }
    observer.observe(elementToListen, { childList: true });
}
addObserverIfDesiredNodeAvailable();

const sendButtonSVG = (color) => {
    return `
        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="${color}" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
    `
};