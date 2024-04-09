const MESSAGE_CONTAINER_CLASS = "x3psx0u xwib8y2 xkhd6sd xrmvbpv";
const HOVER_TARGET = "_amk6 _amlo";
const ARROW_BUTTON_CLASS = "_ahkm";

const handleArrowEdit = () => {
    document.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowUp") return;
        const message_input_container = document.querySelector("span.selectable-text[data-lexical-text='true']"); 
        if (message_input_container) return;
        editLastMessage();
    });
}


const editLastMessage = async () => {
    const mouseOverEvent = createMouseEvent('mouseover');
    const mouseLeftEvent = createMouseEvent('mouseleft');
    let lastMessage = getLastMessageHoverTarget();
    lastMessage.dispatchEvent(mouseOverEvent);

    await sleep(10);

    lastMessage = getLastMessageHoverTarget();
    const arrowButton = lastMessage.getElementsByClassName(ARROW_BUTTON_CLASS)[0];
    arrowButton.click();
    lastMessage.dispatchEvent(mouseOverEvent);

    await sleep(10);

    const editButton = document.querySelector("div[role='button'][aria-label='Edit']");
    editButton.click();
}

const getLastMessageHoverTarget = () => {
    const message_container = document.getElementsByClassName(MESSAGE_CONTAINER_CLASS)[0];
    const lastMessage = message_container.children[message_container.children.length - 1];
    return lastMessage.getElementsByClassName(HOVER_TARGET)[0];
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