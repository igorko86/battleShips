export function createElement(el, classElement, styles) {
    const element = document.createElement(el);

    element.className = classElement;
    element.style.width = `${styles.width}px`;
    element.style.height = `${styles.height}px`;

    return element;
}

export function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * (maxNumber + 1));
}