class Brick extends Unit {
    constructor(options) {
        super(options);
        this.margin_x = 0;
        this.margin_y = 0;
        // **********
        // properties
        this.actualSceen = "brick_0";
        this.wait = 0;
    }

    render() {
        if(this.dead){
            if (this.actualSceen !== "brick_kill_5")
                this.actualSceen = "brick_kill_" + this.deathcounter;
            else {
                this.actualSceen = '';
                this.wall = false;
            }
            this.deathcounter++;
            if (this.wait == 0) {
                this.wait++;
                this.deathcounter--;
            }
            else {
                this.wait--;
            }
        }
        super.render();
    }

    destroy() {
        this.dead = true;
    }
}