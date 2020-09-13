class Hero extends Unit {
    constructor(options) {
        super(options);
        // **********
        // properties
        this.actualSceen = "hero_bottom_0";
        this.wall = false;
        this.wait = 0;
    }

    render() {
        if (this.dead) {
            if (this.actualSceen !== "hero_kill_6")
                this.actualSceen = "hero_kill_" + this.deathcounter;
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

    goLeft() {
        if (this.actualSceen.substr(0, 10) == 'hero_left_') {
            let i = this.actualSceen.substr(10, 11);
            if (i != 2) i++;
            else i = 0;
            this.actualSceen = 'hero_left_' + i;
        } else {
            this.actualSceen = 'hero_left_' + 0;
        }
    }

    goRight() {
        if (this.actualSceen.substr(0, 10) == 'hero_right') {
            let i = this.actualSceen.substr(11, 12);
            if (i != 2) i++;
            else i = 0;
            this.actualSceen = 'hero_right_' + i;
        } else {
            this.actualSceen = 'hero_right_' + 0;
        }
    }

    goTop() {
        if (this.actualSceen.substr(0, 9) == 'hero_top_') {
            let i = this.actualSceen.substr(9, 10);
            if (i != 2) i++;
            else i = 0;
            this.actualSceen = 'hero_top_' + i;
        } else {
            this.actualSceen = 'hero_top_' + 0;
        }
    }

    goBottom() {
        if (this.actualSceen.substr(0, 11) == 'hero_bottom') {
            let i = this.actualSceen.substr(12, 13);
            if (i != 2) i++;
            else i = 0;
            this.actualSceen = 'hero_bottom_' + i;
        } else {
            this.actualSceen = 'hero_bottom_' + 0;
        }
    }

    destroy() {
        this.dead = true;
    }
}