import Ship from './Ships';

class Field {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = [];
    }

    createField() {
        const divElement = this.createElemnt("div", "field", { width: this.width, height: this.height });

        document.body.appendChild(divElement);
    }

    createSectors() {
        let sectorWidth = this.width / NUMBER_SECTORS,
            sectorHeight = this.height / NUMBER_SECTORS,
            numberAllSectors = NUMBER_SECTORS ** 2;

        for (let i = 0; i < numberAllSectors; i++) {
            const divElement = this.createElemnt("div", "sector", { width: sectorWidth, height: sectorHeight });

            document.querySelector(".field").appendChild(divElement);
        }

    }

    createMatrix() {
        for (let i = 0; i < NUMBER_SECTORS; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < NUMBER_SECTORS; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    createElemnt(el, classElement, styles) {
        const element = document.createElement(el);

        element.className = classElement;
        element.style.width = `${styles.width}px`;
        element.style.height = `${styles.height}px`;

        return element;
    }

    getParametersShips(arrayShips) {
        arrayShips.forEach(paramShip => {
            let ship = new Ship(paramShip);
            ship.createShip();
        });
    }

    prepareToCreateShips() {
        for (let i = 0; i < this.numberShips; i++) {
            let direction,
                isShip = false,
                x, y;

            while (!isShip) {
                direction = this.getDirection();

                if (direction === DIRECTION_HORIZONT) {
                    x = this.getCoordinates(NUMBER_SECTORS - this.decks);
                    y = this.getCoordinates(9);
                } else if (direction === DIRECTION_VERTICAL) {
                    x = this.getCoordinates(9);
                    y = this.getCoordinates(NUMBER_SECTORS - this.decks);
                }

                isShip = this.checkCoordinates(x, y, this.decks, direction);
            }
            this.createDecks(x, y, direction);
        }

    }

    checkCoordinates(x, y, decks, direction) {
        let startCoordX, endCoordX, startCoordY, endCoordY;

        if (direction === DIRECTION_HORIZONT) {

            if (x > 0 && (x + decks) < NUMBER_SECTORS) {
                startCoordX = x - 1;
                endCoordX = x + decks;
            } else if (x > 0 && (x + decks) === NUMBER_SECTORS) {
                startCoordX = x - 1;
                endCoordX = startCoordX + decks;
            } else {
                startCoordX = x;
                endCoordX = x + decks;
            }

            if (y > 0 && (y + 1) < NUMBER_SECTORS) {
                startCoordY = y - 1;
                endCoordY = y + 1;
            } else if (y > 0 && (y + 1) === NUMBER_SECTORS) {
                startCoordY = y - 1;
                endCoordY = y;
            } else {
                startCoordY = y;
                endCoordY = y + 1;
            }
        } else if (direction === DIRECTION_VERTICAL) {

            if (x > 0 && (x + 1) < NUMBER_SECTORS) {
                startCoordX = x - 1;
                endCoordX = x + decks;
            } else if (x > 0 && (x + 1) === NUMBER_SECTORS) {
                startCoordX = x - 1;
                endCoordX = x;
            } else {
                startCoordX = x;
                endCoordX = x + 1;
            }

            if (y > 0 && (decks + y) < NUMBER_SECTORS) {
                startCoordY = y - 1;
                endCoordY = y + decks;
            } else if (y > 0 && (decks + y) === NUMBER_SECTORS) {
                startCoordY = y - 1;
                endCoordY = startCoordY + decks;
            } else {
                startCoordY = y;
                endCoordY = y + decks;
            }
        }

        return this.checkMatrix(startCoordY, endCoordY, startCoordX, endCoordX);
    }

    checkMatrix(startColumn, endColumn, startRow, endRow) {
        for (let i = startColumn; i <= endColumn; i++) {

            for (let j = startRow; j <= endRow; j++) {

                if (field.matrix[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    getCoordinates(number) {
        return this.getRandomNumber(number);
    }

    getDirection() {
        let number = this.getRandomNumber(1);

        return number > 0 ? DIRECTION_HORIZONT : DIRECTION_VERTICAL;
    }

    getRandomNumber(maxNumber) {
        return Math.floor(Math.random() * (maxNumber + 1));
    }

}

const field = new Field(400, 400);
field.createField();
field.createSectors();
field.createMatrix();
// rework this class


// TODO changes after reworking class ship
const arrayShips = [{
        decks: 4,
        name: "fourdeck",
        numberShips: 1
    },
    {
        decks: 3,
        name: "tripledeck",
        numberShips: 2
    },
    {
        decks: 2,
        name: "doubledeck",
        numberShips: 3
    },
    {
        decks: 1,
        name: "singledeck",
        numberShips: 4
    }
];