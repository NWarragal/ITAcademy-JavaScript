class BrickMSController {
    constructor(options) {
        this.coordinates = options.coordinates;
        this.canvas = options.canvas;
        this.image = options.image;
        this.img2 = options.img2;
        this.brick = options.brick;
        this.activeField = options.activeField;
    }

    create() {
        if (this.brick != []) {
            for (let i = 0; i < this.coordinates.length; i++) {
                let optbrick = {
                    coordin_x: this.coordinates[i][0] * 48,
                    coordin_y: this.coordinates[i][1] * 48,
                    canvas: this.canvas,
                    image: this.image,
                    img2: this.img2
                }
                this.brick[this.brick.length] = new Brick(optbrick); 
                this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][0] = 4;
            }
        }
    }

    checkForDelete() {
        for (let i = 0; i < this.coordinates.length; i++) {
            if (this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][1] == 6) {
                this.deleteOne(i);
                this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][0] = 0;
                this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][1] = 0;
            }
        }
    }

    startInterval() {
        let func = this.checkForDelete.bind(this);
        this.intervalID = setInterval(func, 100);
    }

    stopInterval() {
        clearInterval(this.intervalID);
    }

    deleteOne(num) {
        this.brick[num].destroy();
    }

    deleteAll() {
        this.brick = [];
    }
}