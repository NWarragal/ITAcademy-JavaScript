class ActiveObject{
    constructor(options){
        this.coordin_x = options.coordin_x;
        this.coordin_y = options.coordin_y;
        this.margin_x = 0;
        this.margin_y = 0;
        this.canvas = options.canvas;
        this.image = options.image;
        this.wall = true;
        this.dead = false;
        this.deathcounter = 0;
    }

    render() {
        let options = {
            coordin_x: this.coordin_x,
            coordin_y: this.coordin_y,
            margin_x: this.margin_x,
            margin_y: this.margin_y,
            canvas: this.canvas,
            image: this.image,
            type: this.actualSceen,
            noclear: false
        };
        let block = new Block(options);
        block.draw();
    }
}