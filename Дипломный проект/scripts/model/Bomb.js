class Bomb extends ActiveObject {
    constructor(options) {
        super(options);
        // **********
        // properties
        this.actualSceen = "bomb_0";
    }

    pulse() {
        if (this.actualSceen !== "bomb_2")
            this.actualSceen = "bomb_" + this.deathcounter;
        else {
            this.actualSceen = 'bomb_0';
            this.deathcounter = 0;
        }
        this.deathcounter++;
    }

    destroy() {
        this.actualSceen = '';
        this.dead = true;
        this.wall = false;
    }
}