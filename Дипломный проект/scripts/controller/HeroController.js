class HeroController extends UnitBorderController {
    constructor(options) {
        super(options)
        this.bomb = options.bomb;
        this.explosion = options.explosion;
        this.bombcontr = [];
        this.pause = false;

        // skills
        this.speed = 4;
        this.bombs = 1;
        this.flames = 1;
        this.wallpass = false;
        this.detonator = false;
        this.bombpass = false;
        this.flamepass = false;
        this.mystery = false;
    }

    create() {
        let options = {
            coordin_x: this.coordin_x,
            coordin_y: this.coordin_y,
            margin_x: this.margin_x,
            margin_y: this.margin_y,
            canvas: this.canvas,
            image: this.img,
            img2: this.img2
        }
        this.view = new Hero(options);
    }

    moveLeft(fixed) {
        this.view.goLeft();
        super.moveLeft(fixed);
    }

    moveRight(fixed) {
        this.view.goRight();
        super.moveRight(fixed);
    }

    moveTop(fixed) {
        this.view.goTop();
        super.moveTop(fixed);
    }

    moveBottom(fixed) {
        this.view.goBottom();
        super.moveBottom(fixed);
    }

    renewInfoModel() {
        this.view.coordin_x = this.coordin_x;
        this.view.coordin_y = this.coordin_y;
        this.view.margin_x = this.margin_x * 2;
        this.view.margin_y = this.margin_y * 2;
    }

    checkExploded() {
        if (this.flamepass || this.mystery) return false;
        else {
            if (this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] == 6) {
                return true
            } else
                return false;
        }
    }

    checkEnemyDamaged() {
        if (this.mystery) return false;
        else {
            if (this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] == 3) {
                return true
            } else
                return false;
        }
    }

    checkBonusTaken() {
        if (this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] != 4) {
            if (this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][2] == 7) {
                switch (this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][3]) {
                    case 7:
                        this.setMysteryOnTimer();
                        break;
                    case 6:
                        this.flamepass = true;
                        break;
                    case 5:
                        this.bombpass = true;
                        break;
                    case 4:
                        this.detonator = true;
                        break;
                    case 3:
                        this.wallpass = true;
                        break;
                    case 2:
                        this.speed++;
                        break;
                    case 1:
                        this.flames++;
                        break;
                    case 0:
                        this.bombs++;
                }
                this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][2] = 8;
            }
        }
    }

    setMysteryOnTimer() {
        this.mystery = true;
        this.f = function () {
            this.mystery = false;
        }
        let func = this.f.bind(this);
        setTimeout(func, 10000);
    }

    putBomb() {
        if (this.bomb.length < this.bombs && this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] != 5
            && this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] != 4) {
            this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] = 5;
            let opt = {
                coordin_x: this.coordin_x,
                coordin_y: this.coordin_y,
                canvas: this.canvas,
                image: this.image,
                activeField: this.activeField,
                bomb: this.bomb,
                detonator: this.detonator,
                explosion: this.explosion,
                flames: this.flames,
                bombcontr: this.bombcontr
            }
            this.bombcontr.push(new BombController(opt));
            this.bombcontr[this.bombcontr.length - 1].createBomb();
            this.bombcontr[this.bombcontr.length - 1].wait();
        }
    }

    detonateBomb() {
        if (this.pause == false) {
            if (this.detonator) {
                if (this.bombcontr[0] != undefined) {
                    this.bombcontr[0].createExplosion();
                    this.pause = true;
                }
            }
        } else {
            this.pause = false;
        }
    }

    death() {
        this.view.destroy();
    }

    clear(){
        this.wallpass = false;
        this.detonator = false;
        this.bombpass = false;
        this.flamepass = false;
        this.mystery = false;
    }
}