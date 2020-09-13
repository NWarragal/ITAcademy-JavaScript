class UnitBorderController {
    constructor(options) {
        this.img2 = options.img2;
        this.canvas = options.canvas;
        this.image = options.image;
        this.activeField = options.activeField;

        this.coordin_x = options.coordin_x ? options.coordin_x * 48 : 0;
        this.coordin_y = options.coordin_y ? options.coordin_y * 48 : 0;
        
        this.margin_x = 0;
        this.margin_y = 0;
        this.activePosition = [options.coordin_y - 1, options.coordin_x - 1];
        this.bombpass = false;
        this.wallpass = false;
    }

    moveLeft(fixed = false) {
        if (this.margin_y == 0) {
            if (fixed) {
                this.margin_x -= this.borderControlLeft(fixed);
                this.checkMargin();
            } else {
                this.margin_x -= this.borderControlLeft(this.speed);
                this.checkMargin();
            }
        } else {
            if(this.margin_y > 0 && this.speed <= Math.abs(this.margin_y)) this.moveTop();
            else if(this.margin_y > 0 && this.speed > Math.abs(this.margin_y)) this.moveTop(Math.abs(this.margin_y));
            else if(this.margin_y < 0 && this.speed <= Math.abs(this.margin_y)) this.moveBottom();
            else if(this.margin_y < 0 && this.speed > Math.abs(this.margin_y)) this.moveBottom(Math.abs(this.margin_y));
        }
    }

    moveRight(fixed = false) {
        if (this.margin_y == 0) {
            if (fixed) {
                this.margin_x += this.borderControlRight(fixed);
                this.checkMargin();
            } else {
                this.margin_x += this.borderControlRight(this.speed);
                this.checkMargin();
            }
        } else {
            if(this.margin_y > 0 && this.speed <= Math.abs(this.margin_y)) this.moveTop();
            else if(this.margin_y > 0 && this.speed > Math.abs(this.margin_y)) this.moveTop(Math.abs(this.margin_y));
            else if(this.margin_y < 0 && this.speed <= Math.abs(this.margin_y)) this.moveBottom();
            else if(this.margin_y < 0 && this.speed > Math.abs(this.margin_y)) this.moveBottom(Math.abs(this.margin_y));
        }
    }

    moveTop(fixed = false) {
        if (this.margin_x == 0) {
            if (fixed) {
                this.margin_y -= this.borderControlTop(fixed);
                this.checkMargin();
            } else {
                this.margin_y -= this.borderControlTop(this.speed);
                this.checkMargin();
            }
        } else {
            if(this.margin_x > 0 && this.speed <= Math.abs(this.margin_x)) this.moveLeft();
            else if(this.margin_x > 0 && this.speed > Math.abs(this.margin_x)) this.moveLeft(Math.abs(this.margin_x));
            else if(this.margin_x < 0 && this.speed <= Math.abs(this.margin_x)) this.moveRight();
            else if(this.margin_x < 0 && this.speed > Math.abs(this.margin_x)) this.moveRight(Math.abs(this.margin_x));
        }
    }

    moveBottom(fixed = false) {
        if (this.margin_x == 0) {
            if (fixed) {
                this.margin_y += this.borderControlBottom(fixed);
                this.checkMargin();
            } else {
                this.margin_y += this.borderControlBottom(this.speed);
                this.checkMargin();
            }
        } else {
            if(this.margin_x > 0 && this.speed <= Math.abs(this.margin_x)) this.moveLeft();
            else if(this.margin_x > 0 && this.speed > Math.abs(this.margin_x)) this.moveLeft(Math.abs(this.margin_x));
            else if(this.margin_x < 0 && this.speed <= Math.abs(this.margin_x)) this.moveRight();
            else if(this.margin_x < 0 && this.speed > Math.abs(this.margin_x)) this.moveRight(Math.abs(this.margin_x));
        }
    }

    borderControlLeft(speed) {
        try {
            let el = this.activeField[this.activePosition[0]];
            el = el[this.activePosition[1] - 1][0];
            if (el != undefined) {
                if (el == 1) {
                    throw 'ex'
                }
                if (el == 4 && !this.wallpass) {
                    throw 'ex'
                }
                if (el == 5 && !this.bombpass) {
                    throw 'ex'
                }
            } else {
                throw 'ex'
            }
        }
        catch {
            if (this.margin_x - speed < 0) speed = this.margin_x;
            if (this.margin_x == 0) speed = 0;
            return speed;
        }
        return speed;
    }

    borderControlRight(speed) {
        try {
            let el = this.activeField[this.activePosition[0]];
            el = el[this.activePosition[1] + 1][0];
            if (el != undefined) {
                if (el == 1) {
                    throw 'ex'
                }
                if (el == 4 && !this.wallpass) {
                    throw 'ex'
                }
                if (el == 5 && !this.bombpass) {
                    throw 'ex'
                }
            } else {
                throw 'ex'
            }
        }
        catch {
            if (this.margin_x + speed > 0) speed = -this.margin_x;
            if (this.margin_x == 0) speed = 0;
            return speed;
        }
        return speed;
    }

    borderControlTop(speed) {
        try {
            let el = this.activeField[this.activePosition[0] - 1][this.activePosition[1]][0];
            if (el != undefined) {
                if (el == 1) {
                    throw 'ex'
                }
                if (el == 4 && !this.wallpass) {
                    throw 'ex'
                }
                if (el == 5 && !this.bombpass) {
                    throw 'ex'
                }
            } else {
                throw 'ex'
            }
        }
        catch {
            if (this.margin_y - speed < 0) speed = this.margin_y;
            if (this.margin_y == 0) speed = 0;
            return speed;
        }
        return speed;
    }

    borderControlBottom(speed) {
        try {
            let el = this.activeField[this.activePosition[0] + 1][this.activePosition[1]][0];
            
            if (el != undefined) {
                if (el == 1) {
                    throw 'ex'
                }
                if (el == 4 && !this.wallpass) {
                    throw 'ex'
                }
                if (el == 5 && !this.bombpass) {
                    throw 'ex'
                }
            } else {
                throw 'ex'
            }
        }
        catch{
            if (this.margin_y + speed > 0) speed = -this.margin_y;
            if (this.margin_y == 0) speed = 0;
            return speed;
        }
        return speed;
    }


    checkMargin() {
        if (Math.abs(this.margin_x) > 12) {
            if (this.margin_x > 0) {
                this.margin_x -= 25;
                this.coordin_x += 48;
                this.activePosition[1]++;
            }

            else if (this.margin_x <= -12) {
                this.margin_x += 25;
                this.coordin_x -= 48;
                this.activePosition[1]--;
            }
        }

        else if (Math.abs(this.margin_y) > 12) {
            if (this.margin_y > 0) {
                this.margin_y -= 25;
                this.coordin_y += 48;
                this.activePosition[0]++;
            }

            else if (this.margin_y <= -12) {
                this.margin_y += 25;
                this.coordin_y -= 48;
                this.activePosition[0]--;
            }
        }
    }
 
    setActiveField(val){
        if(this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] != val && this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] != 5
            && this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] != 4){
            this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 1][0] = val;
        } 
        try {
            if(this.activeField[this.coordin_y / 48 - 2][this.coordin_x / 48 - 1][0] == val){
                this.activeField[this.coordin_y / 48 - 2][this.coordin_x / 48 - 1][0] = 0;
            } 
        } catch {}
        try {
            if(this.activeField[this.coordin_y / 48][this.coordin_x / 48 - 1][0] == val){
                this.activeField[this.coordin_y / 48][this.coordin_x / 48 - 1][0] = 0;
            } 
        } catch {}
        try {
            if(this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 2][0] == val){
                this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48 - 2][0] = 0;
            } 
        } catch {}
        try {
            if(this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48][0] == val){
                this.activeField[this.coordin_y / 48 - 1][this.coordin_x / 48][0] = 0;
            } 
        } catch {}
    }
}