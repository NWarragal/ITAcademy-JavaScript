class FieldController {
    constructor(options) {
        this.canvas = options.canvas;
        this.image = options.image;
        this.width = options.width;
        this.height = options.height;
    }

    countMap() {
        this.mainfield = [];
        for (let i = 0; i < this.height * 2 + 3; i++) {
            this.mainfield[i] = [];
            for (let j = 0; j < this.width * 2 + 3; j++) {
                if (i == 0 || i == this.height * 2 + 2) {
                    this.mainfield[i][j] = 1;
                }
                else if (j == 0 || j == this.width * 2 + 2) {
                    this.mainfield[i][j] = 1;
                }
                else if (i % 2 != 0) {
                    this.mainfield[i][j] = 0;
                }
                else if (j % 2 == 0) {
                    this.mainfield[i][j] = 1;
                } else {
                    this.mainfield[i][j] = 0;
                }
            }
        }
    }

    createMap() {
        this.countMap();
        let opt = {
            mainfield: this.mainfield,
            canvas: this.canvas,
            image: this.image
        }
        this.view = new Field(opt);
    }
}