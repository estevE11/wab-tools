const MESSAGE_CONTAINER_CLASS = "x3psx0u xwib8y2 xkhd6sd xrmvbpv";
const HOVER_TARGET = "_amk6 _amlo";

const handleArrowEdit = () => {
    showEditModal();
}

const showEditModal = () => {
    hoverLastMessage();
}

const hoverLastMessage = () => {
    var event = new MouseEvent('mouseover', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });

    const lastMessage = getLastMessageHoverTarget();
    console.log(lastMessage);
    lastMessage.dispatchEvent(event);
    console.log("event dispatched")
}

const getLastMessageHoverTarget = () => {
    const message_container = document.getElementsByClassName(MESSAGE_CONTAINER_CLASS)[0];
    const lastMessage = message_container.children[message_container.children.length - 1];
    return lastMessage.getElementsByClassName(HOVER_TARGET)[0];
}