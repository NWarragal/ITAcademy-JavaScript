class Explosion {
    constructor(options) {
        this.center_x = options.center_x;
        this.center_y = options.center_y;
        this.top = options.top;
        this.bottom = options.bottom;
        this.left = options.left;
        this.right = options.right;
        this.canvas = options.canvas;
        this.image = options.image;
        this.dead = false;
        this.exploded = false;
        this.timeAlive = 0;
        this.wait = 0;
    }

    render() {
        this.renderBlock(this.center_x, this.center_y, 'fire_center_' + this.timeAlive);
        if (this.top)
            for (let i = 1; i <= this.top; i++) {
                if (i == this.top) {
                    this.renderBlock(this.center_x, this.center_y - (48 * i), 'fire_top_' + this.timeAlive);
                } else {
                    this.renderBlock(this.center_x, this.center_y - (48 * i), 'fire_mid_top_' + this.timeAlive);
                }
            }
        if (this.bottom)
            for (let i = 1; i <= this.bottom; i++) {
                if (i == this.bottom) {
                    this.renderBlock(this.center_x, this.center_y + (48 * i), 'fire_bottom_' + this.timeAlive);
                } else {
                    this.renderBlock(this.center_x, this.center_y + (48 * i), 'fire_mid_bottom_' + this.timeAlive);
                }
            }
        if (this.left)
            for (let i = 1; i <= this.left; i++) {
                if (i == this.left) {
                    this.renderBlock(this.center_x - (48 * i), this.center_y, 'fire_left_' + this.timeAlive);
                } else {
                    this.renderBlock(this.center_x - (48 * i), this.center_y, 'fire_mid_left_' + this.timeAlive);
                }
            }
        if (this.right)
            for (let i = 1; i <= this.right; i++) {
                if (i == this.right) {
                    this.renderBlock(this.center_x + (48 * i), this.center_y, 'fire_right_' + this.timeAlive);
                } else {
                    this.renderBlock(this.center_x + (48 * i), this.center_y, 'fire_mid_right_' + this.timeAlive);
                }
            }
        if (!this.exploded) {
            if (this.timeAlive != 3) {
                this.timeAlive++;
            } else {
                this.exploded = true;
                this.timeAlive--;
            }
        } else {
            if (this.timeAlive != -1) {
                this.timeAlive--;
            } else {
                this.dead = true;
            }
        }
        if (this.wait == 0) {
            this.wait++;
            if(this.exploded) this.timeAlive++;
            else this.timeAlive--;
        }
        else {
            this.wait--;
        }
    }

    renderBlock(x, y, type) {
        let options = {
            coordin_x: x,
            coordin_y: y,
            margin_x: 0,
            margin_y: 0,
            canvas: this.canvas,
            image: this.image,
            type: type,
            noclear: false
        };
        let block = new Block(options);
        block.draw();
    }
}