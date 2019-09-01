export function createElement(el, classElement, styles) {
    const element = document.createElement(el);

    element.className = classElement;
<<<<<<< HEAD
    element.style.width = styles && `${styles.width}px`;
    element.style.height = styles && `${styles.height}px`;
=======
    element.style.width = `${styles.width}px`;
    element.style.height = `${styles.height}px`;
>>>>>>> f5d284ed1ca07b5539e5f59e7e91d4d02e2ab3c3

    return element;
}

export function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * (maxNumber + 1));
}