class BombController {
    constructor(options) {
        this.coordin_x = options.coordin_x;
        this.coordin_y = options.coordin_y;
        this.canvas = options.canvas;
        this.image = options.image;
        this.bomb = options.bomb;
        this.explosion = options.explosion;
        this.activeField = options.activeField;
        this.detonator = options.detonator;
        this.flames = options.flames;
        this.bombcontr = options.bombcontr;
    }

    createBomb() {
        let opt = {
            coordin_x: this.coordin_x,
            coordin_y: this.coordin_y,
            canvas: this.canvas,
            image: this.image,
        }
        this.view = new Bomb(opt);
        this.bomb[this.bomb.length] = this.view;
    }

    wait() {
        let func = this.pulseBomb.bind(this);
        this.intervalID = setInterval(func, 200);
        let funct = this.createExplosion.bind(this);
        if (!this.detonator) this.timeoutID = setTimeout(funct, 2600);
    }

    pulseBomb() {
        this.view.pulse();
        if (this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][1] == 5) {
            this.createExplosion();
            clearTimeout(this.timeoutID);
            this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][1] = 0;
        }
    }

    createExplosion() {
        if(this.intervalID)clearInterval(this.intervalID);
        this.view.destroy();
        this.bomb.shift();
        this.bombcontr.shift();
        let opt = {
            coordin_x: this.coordin_x,
            coordin_y: this.coordin_y,
            canvas: this.canvas,
            image: this.image,
            activeField: this.activeField,
            explosion: this.explosion,
            flames: this.flames,
        }
        let explod = new ExplosionController(opt);
        explod.setExplosion();
    }
}