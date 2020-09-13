class EnemyConroller extends UnitBorderController {
    constructor(options) {
        super(options);

        // skills
        this.type = options.type;
        this.hero = options.hero;
        this.oldx = options.coordin_x;
        this.oldy = options.coordin_y;
        this.activeFunc = 0;
        switch (this.type) {
            case 3:
                this.speed = 1;
                this.intellectPause = 1;
                this.wallpass = true;
                break;
            case 2:
                this.speed = 3;
                this.intellectPause = 2;
                this.wallpass = false;
                break;
            case 1:
            default:
                this.speed = 2;
                this.intellectPause = 3;
                this.wallpass = false;
        }
        this.detonator = false;
        this.bombpass = false;
        this.flamepass = false;
        this.mystery = false;
        this.intellectCounter = 0;
    }

    create() {
        let options = {
            coordin_x: this.coordin_x,
            coordin_y: this.coordin_y,
            margin_x: 0,
            margin_y: 0,
            canvas: this.canvas,
            image: this.img,
            img2: this.img2,
            type: this.type
        }
        this.view = new Enemy(options);
    }

    moveLeft(fixed) {
        let res = this.borderControlLeft(this.speed);
        if (res == 0 && this.margin_x == 0) {
            return false;
        } else {
            this.view.goLeft();
            super.moveLeft(fixed);
        }
    }

    moveRight(fixed) {
        let res = this.borderControlRight(this.speed);
        if (res == 0 && this.margin_x == 0) {
            return false;
        } else {
            this.view.goRight();
            super.moveRight(fixed);
        }
    }

    moveTop(fixed) {
        let res = this.borderControlTop(this.speed);
        if (res == 0 && this.margin_y == 0) {
            return false;
        } else {
            this.view.goLeft();
            super.moveTop(fixed);
        }
    }

    moveBottom(fixed) {
        let res = this.borderControlBottom(this.speed);
        if (res == 0 && this.margin_y == 0) {
            return false;
        } else {
            this.view.goRight();
            super.moveBottom(fixed);
        }
    }

    goHeroX() {
        let res;
        if (this.hero.coordin_x < this.coordin_x) {
            res = this.moveLeft();
            if (res == false) return false;
            else this.activeFunc = 4;
        } else if (this.hero.coordin_x > this.coordin_x) {
            res = this.moveRight();
            if (res == false) return false;
            else this.activeFunc = 3;
        } else {
            switch (this.getRandomInt(2)) {
                case 1:
                    res = this.moveLeft();
                    if (res == false) return false;
                    else this.activeFunc = 4;
                    break;
                case 0:
                    res = this.moveRight();
                    if (res == false) return false;
                    else this.activeFunc = 3;
            }
        }
    }

    goHeroY() {
        let res;
        if (this.hero.coordin_y < this.coordin_y) {
            res = this.moveTop();
            if (res == false) return false;
            else this.activeFunc = 2;
        } else if (this.hero.coordin_y > this.coordin_y) {
            res = this.moveBottom();
            if (res == false) return false;
            else this.activeFunc = 1;
        } else {
            switch (this.getRandomInt(2)) {
                case 1:
                    res = this.moveTop();
                    if (res == false) return false;
                    else this.activeFunc = 2;
                    break;
                case 0:
                    res = this.moveBottom();
                    if (res == false) return false;
                    else this.activeFunc = 1;
            }
        }
    }

    goToHero() {
        if (this.activeFunc == 0) {
            let res;
            if (this.hero.coordin_y > this.hero.coordin_x) {
                res = this.goHeroY();
                if (res == false) res = this.goHeroX();
            } else if (this.hero.coordin_y < this.hero.coordin_x) {
                res = this.goHeroX();
                if (res == false) res = this.goHeroY();
            } else {
                switch (this.getRandomInt(2)) {
                    case 1:
                        res = this.goHeroY();
                        if (res == false) res = this.goHeroX();
                        break;
                    case 0:
                        res = this.goHeroX();
                        if (res == false) res = this.goHeroY();
                }
            }
        } else {
            if (this.oldx == this.coordin_x && this.oldy == this.coordin_y) {
                let res;
                switch (this.activeFunc) {
                    case 4:
                        res = this.moveLeft();
                        break;
                    case 3:
                        res = this.moveRight();
                        break;
                    case 2:
                        res = this.moveTop();
                        break;
                    case 1:
                        res = this.moveBottom();
                        break;
                }
                if (res == false) this.activeFunc = 0;
            } else {
                if (Math.abs(this.margin_y) < this.speed && Math.abs(this.margin_x) < this.speed) {
                    this.intellectCounter = 0;
                    this.activeFunc = 0;
                    this.oldx = this.coordin_x;
                    this.oldy = this.coordin_y;
                } else {
                    let res;
                    switch (this.activeFunc) {
                        case 4:
                            res = this.moveLeft();
                            break;
                        case 3:
                            res = this.moveRight();
                            break;
                        case 2:
                            res = this.moveTop();
                            break;
                        case 1:
                            res = this.moveBottom();
                            break;
                    }
                    if (res == false) this.activeFunc = 0;
                }
            }
        }
    }

    getRandomDimension() {
        if (this.activeFunc == 0) {
            let res;
            switch (this.getRandomInt(4)) {
                case 3:
                    res = this.moveLeft();
                    this.activeFunc = 4;
                    break;
                case 2:
                    res = this.moveRight();
                    this.activeFunc = 3;
                    break;
                case 1:
                    res = this.moveTop();
                    this.activeFunc = 2;
                    break;
                case 0:
                    res = this.moveBottom();
                    this.activeFunc = 1;
                    break;
            }   
        } else {
            if (this.oldx == this.coordin_x && this.oldy == this.coordin_y) {
                let res;
                switch (this.activeFunc) {
                    case 4:
                        res = this.moveLeft();
                        break;
                    case 3:
                        res = this.moveRight();
                        break;
                    case 2:
                        res = this.moveTop();
                        break;
                    case 1:
                        res = this.moveBottom();
                        break;
                }
                if (res == false) this.activeFunc = 0;
            } else {
                if (Math.abs(this.margin_y) <= this.speed && Math.abs(this.margin_x) <= this.speed) {
                    this.intellectCounter++;
                    this.activeFunc = 0;
                    this.oldx = this.coordin_x;
                    this.oldy = this.coordin_y;
                } else {
                    let res;
                    switch (this.activeFunc) {
                        case 4:
                            res = this.moveLeft();
                            break;
                        case 3:
                            res = this.moveRight();
                            break;
                        case 2:
                            res = this.moveTop();
                            break;
                        case 1:
                            res = this.moveBottom();
                            break;
                    }
                    if (res == false) this.activeFunc = 0;
                }
            }
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getIntelectFeedback() {
        if (this.intellectCounter + 1 == this.intellectPause) {
            return true;
        } else {
            return false;
        }
    }

    renewInfoModel() {
        this.view.coordin_x = this.coordin_x;
        this.view.coordin_y = this.coordin_y;
        this.view.margin_x = this.margin_x * 2;
        this.view.margin_y = this.margin_y * 2;
    }

    checkExploded() {
        if (this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] == 6) {
            return true
        } else
            return false;
    }

    death() {
        this.view.destroy();
    }
}