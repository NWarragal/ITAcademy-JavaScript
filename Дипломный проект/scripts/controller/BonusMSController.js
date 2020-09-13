class BonusMSConroller extends BrickMSController {
    constructor(options) {
        super(options);
        this.coordinates = options.coordinates;
        this.bonus = options.bonus;
    }

    create() {
        for (let i = 0; i < this.coordinates.length; i++) {
            let opt = {
                coordin_x: this.coordinates[i][0] * 48,
                coordin_y: this.coordinates[i][1] * 48,
                canvas: this.canvas,
                image: this.image,
                type: this.coordinates[i][2]
            }
            this.bonus[this.bonus.length] = new Bonus(opt);
            this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][0] = 4;
            this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][2] = 7;
            this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][3] = this.coordinates[i][2];
        }
    }

    checkForDelete() {
        for (let i = 0; i < this.coordinates.length; i++) {
            if (this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][2] == 8) {
                this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][0] = 0;
                delete this.activeField[this.coordinates[i][1] - 1][this.coordinates[i][0] - 1][2];
                this.bonus[i].destroy();
            }
        }
    }

    deleteAll() {
        this.bonus = [];
    }
}