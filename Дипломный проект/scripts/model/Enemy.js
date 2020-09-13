class Enemy extends Unit {
    constructor(options) {
        super(options);
        // **********
        // properties
        switch (options.type) {
            case 3:
                this.actualSceen = "enemy_3_left_0";
                break;
            case 2:
                this.actualSceen = "enemy_2_left_0";
                break;
            case 1:
            default:
                this.actualSceen = "enemy_1_left_0";
        }
        this.type = options.type;
        this.wall = false;
        this.wait = 0;
    }

    render() {
        if (this.dead) {
            if (!this.deathcounter) {
                this.actualSceen = "enemy_" + this.type + '_kill_0';
            } else if (this.actualSceen !== "enemy_23_kill_4" || this.actualSceen !== "enemy_1_kill_4") {
                this.actualSceen = "enemy_" + (this.type == 1 ? 1 : 23) + '_kill_' + this.deathcounter;
            }
            else {
                this.actualSceen = '';
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
        if (this.actualSceen.substr(0, 13) == 'enemy_' + this.type + '_left_') {
            let i = this.actualSceen.substr(13, 14);
            if (i != 2) i++;
            else i = 0;
            this.actualSceen = 'enemy_' + this.type + '_left_' + i;
        } else {
            this.actualSceen = 'enemy_' + this.type + '_left_' + 0;
        }
    }

    goRight() {
        if (this.actualSceen.substr(0, 13) == 'enemy_' + this.type + '_right') {
            let i = this.actualSceen.substr(14, 15);
            if (i != 2) i++;
            else i = 0;
            this.actualSceen = 'enemy_' + this.type + '_right_' + i;
        } else {
            this.actualSceen = 'enemy_' + this.type + '_right_' + 0;
        }
    }

    destroy() {
        this.dead = true;
    }
}