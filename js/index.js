import Ship from './Ships.js';
import Field from './Field.js';
import { PARAMETERS_SHIPS, DIRECTION_HORIZONT, DIRECTION_VERTICAL, NUMBER_SECTORS, NAME_COMPUTER_FIELD } from './constants.js';
import { getRandomNumber, createElement } from './helpers.js';




const userField = new Field('userField', { height: 200, width: 200 });
const computerField = new Field('computerField', { height: 200, width: 200 });
userField.createField();
computerField.createField();

userField.createSectors();
computerField.createSectors();
userField.createMatrix();
computerField.createMatrix();
getParametersShips.call(userField, PARAMETERS_SHIPS);
getParametersShips.call(computerField, PARAMETERS_SHIPS);

function getParametersShips(arrayShips) {
    arrayShips.forEach(paramShip => {
        prepareToCreateShips.call(this, paramShip);
    });
}



function prepareToCreateShips(paramShip) {
    let { numberShips, decks } = paramShip;


    for (let i = 0; i < numberShips; i++) {
        let direction,
            isShip = false,
            ship,
            x, y;

        while (!isShip) {
            direction = getDirection();

            if (direction === DIRECTION_HORIZONT) {
                x = createCoordinates(NUMBER_SECTORS - decks);
                y = createCoordinates(9);
            } else if (direction === DIRECTION_VERTICAL) {
                x = createCoordinates(9);
                y = createCoordinates(NUMBER_SECTORS - decks);
            }

            isShip = checkCoordinates.call(this, x, y, decks, direction);
        }

        ship = new Ship(paramShip)
        ship.direction = direction;
        ship.createShip(this, { x, y });
        if (this.className === NAME_COMPUTER_FIELD) {
            this.ships.push(ship);
        }
    }
}

function checkCoordinates(x, y, decks, direction) {
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

    return checkMatrix.call(this, startCoordY, endCoordY, startCoordX, endCoordX);
}

function checkMatrix(startColumn, endColumn, startRow, endRow) {
    for (let i = startColumn; i <= endColumn; i++) {

        for (let j = startRow; j <= endRow; j++) {

            if (this.matrix[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function createCoordinates(number) {
    return getRandomNumber(number);
}

function getDirection() {
    let number = getRandomNumber(1);

    return number > 0 ? DIRECTION_HORIZONT : DIRECTION_VERTICAL;
}





// USER. Create class User later

function handlerShoot() {
    const collectionSectors = document.querySelectorAll(`.${computerField.className} .sector`);
    collectionSectors.forEach(el => {
        el.addEventListener('click', shoot);
    });
}

function shoot() {
    const { width, height, matrix, ships } = computerField,
    shotY = this.offsetTop / (width / NUMBER_SECTORS),
        shotX = this.offsetLeft / (height / NUMBER_SECTORS),
        isHitShip = matrix[shotY][shotX];

    if (isHitShip) {
        ships.forEach((ship) => {
            let { shipLocation, decks } = ship,
            className = null;

            for (let i = 0; i < shipLocation.length; i++) {
                if (shipLocation[i].y === shotY && shipLocation[i].x === shotX) {
                    const width = (computerField.width / NUMBER_SECTORS),
                        height = (computerField.height / NUMBER_SECTORS);
                    ship.hit++;

                    if (ship.hit === decks) {
                        console.log(ship);
                        className = 'killed';
                    }

                    showShoot(this, { className, text: "X", width, height });
                }
            }


        });
    } else {
        const width = (computerField.width / NUMBER_SECTORS) / 3,
            height = (computerField.height / NUMBER_SECTORS) / 3;

        showShoot(this, { className: 'dote', text: null, width, height });
    }
    this.removeEventListener('click', shoot);
}

function showShoot(node, attributes) {
    const { width, height, className, text } = attributes,

    element = createElement('span', className, { width, height });
    element.innerText = text || '';
    node.appendChild(element);
}
handlerShoot();

function getCoordinatesShoot() {
    const collectionSectors = document.querySelectorAll(`.${computerField.className} .sector`);

    collectionSectors.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log({ y: el.offsetTop });

        }, true);
    });
}
console.log(getCoordinatesShoot());