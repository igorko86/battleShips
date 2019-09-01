export function createElement(el, classElement, styles) {
    const element = document.createElement(el);

    element.className = classElement;

    element.style.width = styles && `${styles.width}px`;
    element.style.height = styles && `${styles.height}px`;


    return element;
}

export function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * (maxNumber + 1));
}