export default class Ship {
    constructor(ship) {
        this.decks = ship.decks;
        this.name = ship.name;
        this.numberShips = ship.numberShips;
    }

    createShip() {

    }

    createDecks(x, y, direction) {
        let collectionSectors = document.querySelectorAll('.sector'),
            width = field.width / NUMBER_SECTORS,
            height = field.height / NUMBER_SECTORS,
            left, top;

        for (let i = 0; i < this.decks; i++) {

            left = (direction === DIRECTION_HORIZONT) ? x + i : x;
            top = (direction === DIRECTION_VERTICAL) ? y + i : y;

            collectionSectors.forEach(element => {
                if (element.offsetTop === (top * height) && element.offsetLeft === (left * width)) {
                    element.className = `${element.className} ${this.name}`;
                    field.matrix[top][left] = 1;
                }
            });
        }
    }
}