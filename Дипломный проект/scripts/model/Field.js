class Field {
    constructor(options) {
        this.canvas = options.canvas;
        this.image = options.image;
        this.mainfield = options.mainfield;
    }

    render() {
        for (let i = 0; i < this.mainfield.length; i++) {
            for (let j = 0; j < this.mainfield[i].length; j++) {
                let options = {
                    coordin_x: j * 48,
                    coordin_y: i * 48,
                    margin_x: 0,
                    margin_y: 0,
                    canvas: this.canvas,
                    image: this.image,
                    type: this.mainfield[i][j] == 0 ? '' : 'solid',
                    noclear: false
                };
                let block = new Block(options);
                block.draw();
            }
        }
    }
}