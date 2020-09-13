class Unit extends ActiveObject{
    constructor(options){
        super(options);
        this.margin_x = options.margin_x * 2;
        this.margin_y = options.margin_y * 2;
        this.img2 = options.img2;
    }

    render(){
        let options = {
            coordin_x: this.coordin_x,
            coordin_y: this.coordin_y,
            margin_x: this.margin_x,
            margin_y: this.margin_y,
            canvas: this.canvas,
            image: this.img2,
            type: this.actualSceen,
            noclear: true
        };
        let block = new Block(options);
        block.draw();
    }
}