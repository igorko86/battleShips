import { createElement } from './helpers.js';
import { SIZE_FIELD, NUMBER_SECTORS, } from './constants.js';

class Field {
    constructor(className, sizes = SIZE_FIELD) {
        this.width = sizes.width;
        this.height = sizes.height;
        this.className = className;
        this.matrix = [];
        this.ships = [];
        this.shootCoordinates = [];
    }

    createField() {
        const divElement = createElement("div", this.className, { width: this.width, height: this.height });

        document.querySelector('#container').appendChild(divElement);
    }

    createSectors() {
        let sectorWidth = this.width / NUMBER_SECTORS,
            sectorHeight = this.height / NUMBER_SECTORS,
            numberAllSectors = NUMBER_SECTORS ** 2;

        for (let i = 0; i < numberAllSectors; i++) {
            const divElement = createElement("div", "sector", { width: sectorWidth, height: sectorHeight });

            document.querySelector(`.${this.className}`).appendChild(divElement);
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
}


export default Field;