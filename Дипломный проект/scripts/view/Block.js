class Block {
    constructor(options) {
        this.coordin_x = options.coordin_x;
        this.coordin_y = options.coordin_y;
        this.margin_x = options.margin_x;
        this.margin_y = options.margin_y;
        this.type = options.type;
        this.canvas = options.canvas;
        this.context = this.canvas.getContext('2d');
        this.image = options.image;
        this.noclear = options.noclear;
    }

    draw() {
        const BLOCK_WIDTH = 48;
        let x, y;
        switch (this.type) {
            case 'solid':
                x = 3;
                y = 3;
                break;
            case 'brick_0':
                x = 4;
                y = 3;
                break;
            case 'brick_kill_0':
                x = 5;
                y = 3;
                break;
            case 'brick_kill_1':
                x = 6;
                y = 3;
                break;
            case 'brick_kill_2':
                x = 7;
                y = 3;
                break;
            case 'brick_kill_3':
                x = 8;
                y = 3;
                break;
            case 'brick_kill_4':
                x = 9;
                y = 3;
                break;
            case 'brick_kill_5':
                x = 10;
                y = 3;
                break;
            case 'door':
                x = 11;
                y = 3;
                break;
            case 'bomb_0':
                x = 0;
                y = 3;
                break;
            case 'bomb_1':
                x = 1;
                y = 3;
                break;
            case 'bomb_2':
                x = 2;
                y = 3;
                break;
            case 'hero_left_0':
                x = 0;
                y = 0;
                break;
            case 'hero_left_1':
                x = 1;
                y = 0;
                break;
            case 'hero_left_2':
                x = 2;
                y = 0;
                break;
            case 'hero_top_0':
                x = 4;
                y = 1;
                break;
            case 'hero_top_1':
                x = 5;
                y = 1;
                break;
            case 'hero_top_2':
                x = 3;
                y = 1;
                break;
            case 'hero_bottom_0':
                x = 4;
                y = 0;
                break;
            case 'hero_bottom_1':
                x = 5;
                y = 0;
                break;
            case 'hero_bottom_2':
                x = 3;
                y = 0;
                break;
            case 'hero_right_0':
                x = 0;
                y = 1;
                break;
            case 'hero_right_1':
                x = 1;
                y = 1;
                break;
            case 'hero_right_2':
                x = 2;
                y = 1;
                break;
            case 'hero_kill_0':
                x = 0;
                y = 2;
                break;
            case 'hero_kill_1':
                x = 1;
                y = 2;
                break;
            case 'hero_kill_2':
                x = 2;
                y = 2;
                break;
            case 'hero_kill_3':
                x = 3;
                y = 2;
                break;
            case 'hero_kill_4':
                x = 4;
                y = 2;
                break;
            case 'hero_kill_5':
                x = 5;
                y = 2;
                break;
            case 'hero_kill_6':
                x = 6;
                y = 2;
                break;
            case 'bonus_0':
                x = 0;
                y = 14;
                break;
            case 'bonus_1':
                x = 1;
                y = 14;
                break;
            case 'bonus_2':
                x = 2;
                y = 14;
                break;
            case 'bonus_3':
                x = 3;
                y = 14;
                break;
            case 'bonus_4':
                x = 4;
                y = 14;
                break;
            case 'bonus_5':
                x = 5;
                y = 14;
                break;
            case 'bonus_6':
                x = 6;
                y = 14;
                break;
            case 'bonus_7':
                x = 7;
                y = 14;
                break;
            case 'enemy_1_left_0':
                x = 3;
                y = 15;
                break;
            case 'enemy_1_left_1':
                x = 4;
                y = 15;
                break;
            case 'enemy_1_left_2':
                x = 5;
                y = 15;
                break;
            case 'enemy_1_right_0':
                x = 0;
                y = 15;
                break;
            case 'enemy_1_right_1':
                x = 1;
                y = 15;
                break;
            case 'enemy_1_right_2':
                x = 2;
                y = 15;
                break;
            case 'enemy_2_left_0':
                x = 3;
                y = 16;
                break;
            case 'enemy_2_left_1':
                x = 4;
                y = 16;
                break;
            case 'enemy_2_left_2':
                x = 5;
                y = 16;
                break;
            case 'enemy_2_right_0':
                x = 0;
                y = 16;
                break;
            case 'enemy_2_right_1':
                x = 1;
                y = 16;
                break;
            case 'enemy_2_right_2':
                x = 2;
                y = 16;
                break;
            case 'enemy_3_left_0':
                x = 3;
                y = 19;
                break;
            case 'enemy_3_left_1':
                x = 4;
                y = 19;
                break;
            case 'enemy_3_left_2':
                x = 5;
                y = 19;
                break;
            case 'enemy_3_right_0':
                x = 0;
                y = 19;
                break;
            case 'enemy_3_right_1':
                x = 1;
                y = 19;
                break;
            case 'enemy_3_right_2':
                x = 2;
                y = 19;
                break;
            // add new enemy here
            case 'enemy_1_kill_0':
                x = 6;
                y = 15;
                break;
            case 'enemy_1_kill_1':
                x = 7;
                y = 15;
                break;
            case 'enemy_1_kill_2':
                x = 8;
                y = 15;
                break;
            case 'enemy_1_kill_3':
                x = 9;
                y = 15;
                break;
            case 'enemy_1_kill_4':
                x = 10;
                y = 15;
                break;
            case 'enemy_2_kill_0':
                x = 6;
                y = 16;
                break;
            case 'enemy_3_kill_0':
                x = 6;
                y = 19;
                break;
            case 'enemy_23_kill_1':
                x = 7;
                y = 18;
                break;
            case 'enemy_23_kill_2':
                x = 8;
                y = 18;
                break;
            case 'enemy_23_kill_3':
                x = 9;
                y = 18;
                break;
            case 'enemy_23_kill_4':
                x = 10;
                y = 18;
                break;
            case 'fire_center_0':
                x = 2;
                y = 6;
                break;
            case 'fire_center_1':
                x = 7;
                y = 6;
                break;
            case 'fire_center_2':
                x = 2;
                y = 11;
                break;
            case 'fire_center_3':
                x = 7;
                y = 11;
                break;
            case 'fire_right_0':
                x = 4;
                y = 6;
                break;
            case 'fire_right_1':
                x = 9;
                y = 6;
                break;
            case 'fire_right_2':
                x = 4;
                y = 11;
                break;
            case 'fire_right_3':
                x = 9;
                y = 11;
                break;
            case 'fire_left_0':
                x = 0;
                y = 6;
                break;
            case 'fire_left_1':
                x = 5;
                y = 6;
                break;
            case 'fire_left_2':
                x = 0;
                y = 11;
                break;
            case 'fire_left_3':
                x = 5;
                y = 11;
                break;
            case 'fire_top_0':
                x = 2;
                y = 4;
                break;
            case 'fire_top_1':
                x = 7;
                y = 4;
                break;
            case 'fire_top_2':
                x = 2;
                y = 9;
                break;
            case 'fire_top_3':
                x = 7;
                y = 9;
                break;
            case 'fire_bottom_0':
                x = 2;
                y = 8;
                break;
            case 'fire_bottom_1':
                x = 7;
                y = 8;
                break;
            case 'fire_bottom_2':
                x = 2;
                y = 13;
                break;
            case 'fire_bottom_3':
                x = 7;
                y = 13;
                break;
            case 'fire_mid_right_0':
                x = 3;
                y = 6;
                break;
            case 'fire_mid_right_1':
                x = 8;
                y = 6;
                break;
            case 'fire_mid_right_2':
                x = 3;
                y = 11;
                break;
            case 'fire_mid_right_3':
                x = 8;
                y = 11;
                break;
            case 'fire_mid_left_0':
                x = 1;
                y = 6;
                break;
            case 'fire_mid_left_1':
                x = 6;
                y = 6;
                break;
            case 'fire_mid_left_2':
                x = 1;
                y = 11;
                break;
            case 'fire_mid_left_3':
                x = 6;
                y = 11;
                break;
            case 'fire_mid_top_0':
                x = 2;
                y = 5;
                break;
            case 'fire_mid_top_1':
                x = 7;
                y = 5;
                break;
            case 'fire_mid_top_2':
                x = 2;
                y = 10;
                break;
            case 'fire_mid_top_3':
                x = 7;
                y = 10;
                break;
            case 'fire_mid_bottom_0':
                x = 2;
                y = 7;
                break;
            case 'fire_mid_bottom_1':
                x = 7;
                y = 7;
                break;
            case 'fire_mid_bottom_2':
                x = 2;
                y = 12;
                break;
            case 'fire_mid_bottom_3':
                x = 7;
                y = 12;
                break;
            default:
                x = 0;
                y = 9;
        }
        if (!this.noclear) this.context.clearRect(this.coordin_x + this.margin_x, this.coordin_y + this.margin_y, BLOCK_WIDTH, BLOCK_WIDTH);
        this.context.drawImage(
            this.image,
            BLOCK_WIDTH * x,
            BLOCK_WIDTH * y,
            BLOCK_WIDTH,
            BLOCK_WIDTH,
            this.coordin_x + this.margin_x,
            this.coordin_y + this.margin_y,
            BLOCK_WIDTH,
            BLOCK_WIDTH
        );
    }
}