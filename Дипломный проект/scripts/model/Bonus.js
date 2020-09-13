class Bonus extends ActiveObject {
    constructor(options) {
        super(options);
        // **********
        // properties
        this.type = options.type;
        switch (options.type) {
            case 7:
                this.actualSceen = "bonus_7";
                break;
            case 6:
                this.actualSceen = "bonus_6";
                break;
            case 5:
                this.actualSceen = "bonus_5";
                break;
            case 4:
                this.actualSceen = "bonus_4";
                break;
            case 3:
                this.actualSceen = "bonus_3";
                break;
            case 2:
                this.actualSceen = "bonus_2";
                break;
            case 1:
                this.actualSceen = "bonus_1";
                break;
            case 0:
            default:
                this.actualSceen = "bonus_0";
        }
        this.wall = false;
    }

    destroy() {
        this.actualSceen = '';
        this.dead = true;
    }
}