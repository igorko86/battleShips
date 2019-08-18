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


}

const field = new Field(400, 400);
field.createField();
field.createSectors();
field.createMatrix();
// rework this class