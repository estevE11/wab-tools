const MESSAGE_CONTAINER_CLASS = "x3psx0u xwib8y2 xkhd6sd xrmvbpv";
const HOVER_TARGET = "_amk6 _amlo";
const ARROW_BUTTON_CLASS = "_ahkm";

const handleArrowEdit = () => {
    editLastMessage();
}

const editLastMessage = () => {
    hoverLastMessage();
}

const hoverLastMessage = async () => {
    const mouseOverEvent = createMouseEvent('mouseover');
    const mouseLeftEvent = createMouseEvent('mouseleft');
    let lastMessage = getLastMessageHoverTarget();
    lastMessage.dispatchEvent(mouseOverEvent);

    await sleep(10);

    lastMessage = getLastMessageHoverTarget();
    const arrowButton = lastMessage.getElementsByClassName(ARROW_BUTTON_CLASS)[0];
    console.log(arrowButton)
    arrowButton.click();
    lastMessage.dispatchEvent(mouseOverEvent);
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