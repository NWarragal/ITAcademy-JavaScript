class ExplosionController {
    constructor(options) {
        this.coordin_x = options.coordin_x / 48;
        this.coordin_y = options.coordin_y / 48;
        this.canvas = options.canvas;
        this.image = options.image;
        this.activeField = options.activeField;
        this.explosion = options.explosion;
        this.flames = options.flames;
    }

    setExplosion() {
        this.activeField[this.coordin_y - 1][this.coordin_x - 1][0] = 6;
        let leftfl = false, rightfl = false, topfl = false, bottomfl = false;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        for (let i = 1; i <= this.flames; i++) {
            try {
                if (this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1] != undefined) {
                    if (this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1][0] == 4) {
                        if (topfl == false) this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1][1] = 6;
                        topfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1][0] == 1) {
                        topfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1][0] == 5) {
                        if (topfl == false) this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1][1] = 5;
                        topfl = true;
                    }
                    else {
                        if (topfl == false) this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1][0] = 6;
                    }
                } else throw 'ex';
            } catch {
                topfl = true;
            }

            try {
                if (this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1] != undefined) {
                    if (this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1][0] == 4) {
                        if (bottomfl == false) {
                            this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1][1] = 6;
                        }
                        bottomfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1][0] == 1) {
                        bottomfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1][0] == 5) {
                        if (bottomfl == false) this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1][1] = 5;
                        bottomfl = true;
                    }
                    else {
                        if (bottomfl == false) this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1][0] = 6;
                    }
                } else throw 'ex';
            }
            catch {
                bottomfl = true;
            }

            try {
                if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i] != undefined) {
                    if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i][0] == 4) {
                        if (leftfl == false) this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i][1] = 6;
                        leftfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i][0] == 1) {
                        leftfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i][0] == 5) {
                        if (leftfl == false) this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i][1] = 5;
                        leftfl = true;
                    }
                    else {
                        if (leftfl == false) this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i][0] = 6;
                    }
                } else throw 'ex';
            }
            catch{
                leftfl = true;
            }

            try {
                if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i] != undefined) {
                    if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i][0] == 4) {
                        if (rightfl == false) this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i][1] = 6;
                        rightfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i][0] == 1) {
                        rightfl = true;
                    }
                    else if (this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i][0] == 5) {
                        if (rightfl == false) this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i][1] = 5;
                        rightfl = true;
                    }
                    else {
                        if (rightfl == false) this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i][0] = 6;
                    }
                } else throw 'ex';
            }
            catch{
                rightfl = true;
            }

            if (!topfl) this.top++;
            if (!bottomfl) this.bottom++;
            if (!leftfl) this.left++;
            if (!rightfl) this.right++;
        }
        this.createExplosion();
    }

    createExplosion() {
        let opt = {
            center_x: this.coordin_x * 48,
            center_y: this.coordin_y * 48,
            top: this.top,
            bottom: this.bottom,
            left: this.left,
            right: this.right,
            canvas: this.canvas,
            image: this.image
        }
        this.view = new Explosion(opt);
        this.explosion[this.explosion.length] = this.view;
        let func = this.removeExplosion.bind(this);
        setTimeout(func, 200);
    }

    removeExplosion() {
        for (let i = 0; i <= this.top; i++) {
            this.activeField[this.coordin_y - 1 - i][this.coordin_x - 1][0] = 0;
        }
        for (let i = 0; i <= this.bottom; i++) {
            this.activeField[this.coordin_y - 1 + i][this.coordin_x - 1][0] = 0;
        }
        for (let i = 0; i <= this.left; i++) {
            this.activeField[this.coordin_y - 1][this.coordin_x - 1 - i][0] = 0;
        }
        for (let i = 0; i <= this.right; i++) {
            this.activeField[this.coordin_y - 1][this.coordin_x - 1 + i][0] = 0;
        }
        this.activeField[this.coordin_y - 1][this.coordin_x - 1][0] = 0;
        this.explosion.shift();
    }
}