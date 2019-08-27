import { NUMBER_SECTORS, DIRECTION_HORIZONT, DIRECTION_VERTICAL } from './constants.js';

export default class Ship {
    constructor(ship) {
        this.decks = ship.decks;
        this.name = ship.name;
        this.numberShips = ship.numberShips;
    }

    createShip(field) {
        this.createDecks(field);
    }

    createDecks(field) {
        let collectionSectors = document.querySelectorAll(`.${field.className} .sector`),
            { direction } = this,
            { x, y } = this.location,
            width = field.width / NUMBER_SECTORS,
            height = field.height / NUMBER_SECTORS,
            left, top;

        for (let i = 0; i < this.decks; i++) {

            left = (direction === DIRECTION_HORIZONT) ? x + i : x;
            top = (direction === DIRECTION_VERTICAL) ? y + i : y;

            [...collectionSectors].forEach(element => {

                if (element.offsetTop === (top * height) && element.offsetLeft === (left * width)) {
                    // TODO show it after removing above
                    // if (`${field.className}` === 'userField') {
                    //     element.className = `${element.className} ${this.name}`;
                    // }
                    // TODO remove it later 
                    element.className = `${element.className} ${this.name}`;
                    field.matrix[top][left] = 1;

                }
            });
        }
    }
}