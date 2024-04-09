const MESSAGE_CONTAINER_CLASS = "x3psx0u xwib8y2 xkhd6sd xrmvbpv";
const HOVER_TARGET = "_amk6 _amlo";
const ARROW_BUTTON_CLASS = "_ahkm";

let listenerCreated = false;

const handleArrowEdit = () => {
    if(listenerCreated) return;
    listenerCreated = true;
    document.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowUp") return;
        const message_input_container = document.querySelector("span.selectable-text[data-lexical-text='true']"); 
        if (message_input_container) return;
        editLastMessage();
    });
}


const editLastMessage = async () => {
    const mouseOverEvent = createMouseEvent('mouseover');
    let lastMessage = getLastMessageHoverTarget();
    lastMessage.dispatchEvent(mouseOverEvent);

    await sleep(10);

    lastMessage = getLastMessageHoverTarget();
    const arrowButton = lastMessage.getElementsByClassName(ARROW_BUTTON_CLASS)[0];
    arrowButton.click();
    lastMessage.dispatchEvent(mouseOverEvent);

    await sleep(10);

    const editButton = document.querySelector("div[role='button'][aria-label='Edit']");
    if (editButton) editButton.click();
    else hideMenu();
}

const getLastMessageHoverTarget = () => {
    const message_container = document.getElementsByClassName(MESSAGE_CONTAINER_CLASS)[0];
    const lastMessage = message_container.children[message_container.children.length - 1];
    return lastMessage.getElementsByClassName(HOVER_TARGET)[0];
}

const hideMenu = () => {
    const menu = document.querySelector("div._ak4w[role='application']");
    menu.innerHTML = "";
}

const createMouseEvent = (t) => {
    return new MouseEvent(t, {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}