class MainController {
    constructor(options) {
        this.img1flag = false;
        this.img2flag = false;
        this.width = 17;
        this.height = 8;
        this.unitstype1 = options.unitstype1;
        this.unitstype2 = options.unitstype2;
        this.unitstype3 = options.unitstype3;
        this.deadunits = 0;
        this.elementsgroup1 = options.elementsgroup1;
        this.elementsgroup2 = options.elementsgroup1;
        this.enemy = [];
        this.bomb = [];
        this.explosion = [];
        this.brick = [];
        this.bonus = [];
        this.hero = false;
        this.field = false;
        this.loaded = false;
        this.coordinates = [];
        this.brickcoordinates = [];
        this.enemyactive = [];
        this.gameWin = false;
        this.gameOver = false;
        this.score = 0;
        this.monsterscore = 0;
        this.lifes = 3;
    }

    createGame() {
        this.canvas = document.getElementsByTagName('canvas')
        this.img = new Image();
        this.img.src = 'images/tiles.png';
        this.img2 = new Image();
        this.img2.src = 'images/tiles_free.png';

        this.img.onload = () => {
            if (!this.loaded) this.loaded = true;
            else if (this.canvas) {
                this.createEmptyGameField();
                this.createField();
                this.createHero();
                this.randomEnemyUnits();
                this.randomBonuses();
                this.createRandomBricks();
                this.createRender();
                this.start();
            }
        }

        this.img2.onload = () => {
            if (!this.loaded) this.loaded = true;
            else if (this.canvas) {
                this.createEmptyGameField();
                this.createField();
                this.createHero();
                this.randomEnemyUnits();
                this.randomBonuses();
                this.createRandomBricks();
                this.createRender();
                this.start();
            }
        }
    }

    createField() {
        this.field = new FieldController({
            width: this.width,
            height: this.height,
            canvas: this.canvas[0],
            image: this.img
        });
        this.field.createMap();
    }

    createHero() {
        this.hero = new HeroEventController({
            activeField: this.gamefield,
            image: this.img,
            img2: this.img2,
            canvas: this.canvas[0],
            bomb: this.bomb,
            explosion: this.explosion
        });
        this.hero.createController();
        this.hero.addListeners();
    }

    randomEnemyUnits() {
        for (let i = 0; i < this.unitstype1; i++) {
            let res = this.createEnemy(1);
            if (res == false) i--;
        }
        for (let i = 0; i < this.unitstype2; i++) {
            let res = this.createEnemy(2);
            if (res == false) i--;
        }
        for (let i = 0; i < this.unitstype3; i++) {
            let res = this.createEnemy(3);
            if (res == false) i--;
        }
    }

    createEnemy(type) {
        let y = this.getRandom(4, this.height * 2);
        let x = this.getRandom(4, this.width * 2);
        if (this.gamefield[y][x][0] == 0) {
            let enemy1 = new EnemyActivityController({
                activeField: this.gamefield,
                coordin_x: x + 1,
                coordin_y: y + 1,
                image: this.img,
                img2: this.img2,
                canvas: this.canvas[0],
                hero: this.hero.view,
                type: type
            });
            enemy1.createController();
            this.enemyactive.push(enemy1)
            this.enemy.push(enemy1.view);
            this.gamefield[y][x][0] = 3;
        } else {
            return false;
        }
    }

    createRender() {
        this.render = new RenderField({
            field: this.field.view,
            hero: this.hero.view,
            enemy: this.enemy,
            bomb: this.bomb,
            explosion: this.explosion,
            brick: this.brick,
            bonus: this.bonus
        });
    }

    createRandomBricks() {
        for (let i = 0; i < this.height * 2 + 1; i++) {
            for (let j = 0; j < this.width * 2 + 1; j++) {
                if (i == 0 && j == 0) continue;
                if (i == 1 && j == 0) continue;
                if (i == 0 && j == 1) continue;
                if (this.gamefield[i][j][0] == 0) {
                    let res = this.getRandom(0, 2);
                    if (res != 1) {
                        this.brickcoordinates.push([j + 1, i + 1]);
                    }
                } else if (this.gamefield[i][j][0] == 4) this.brickcoordinates.push([j + 1, i + 1]);

            }
        }
        this.bricks1 = new BrickMSController({
            coordinates: this.brickcoordinates,
            canvas: this.canvas[0],
            image: this.img,
            img2: this.img2,
            brick: this.brick,
            activeField: this.gamefield
        });
        this.bricks1.create();
    }

    randomBonuses() {
        let y = this.getRandom(1, 2);
        switch (y) {
            case 1:
                this.createBonus(0, 2, 0);
                break;
            case 2:
                this.createBonus(0, 0, 2);
        }
        for (let i = 0; i < this.elementsgroup1 - 1; i++) {
            let res = this.createBonus(0);
            if (res == false) i--;
        }
        for (let i = 0; i < this.elementsgroup2; i++) {
            let res = this.createBonus(1);
            if (res == false) i--;
        }
        this.bonus1 = new BonusMSConroller({
            coordinates: this.coordinates,
            canvas: this.canvas[0],
            image: this.img,
            bonus: this.bonus,
            activeField: this.gamefield
        });
        this.bonus1.create();
    }

    createBonus(type, x = -1, y = -1) {
        switch (type) {
            case 1:
                type = this.getRandom(0, 7);
                if (y == -1) y = this.getRandom(1, this.height * 2);
                if (x == -1) x = this.getRandom(this.width * 2 / 2, this.width * 2 - 1);
                break;
            case 0:
                type = this.getRandom(0, 2);
                if (y == -1) y = this.getRandom(1, this.height * 2);
                if (x == -1) x = this.getRandom(1, this.width * 2 / 2);
        }
        if (this.gamefield[y][x][0] == 1 || this.gamefield[y][x][0] == 3) {
            return false;
        } else {
            let flag = false;
            for (let i = 0; i < this.coordinates.length; i++) {
                if ((x + 1) == this.coordinates[i][0] && (y + 1) == this.coordinates[i][1]) {
                    flag = true;
                }
            }
            if (flag == true) return false;
            else {
                this.coordinates.push([x + 1, y + 1, type]);
            }
        }
    }

    createEmptyGameField() {
        this.gamefield = [];
        for (let i = 0; i < this.height * 2 + 1; i++) {
            this.gamefield[i] = [];
            for (let j = 0; j < this.width * 2 + 1; j++) {
                if (i % 2 == 0) {
                    this.gamefield[i][j] = [0];
                }
                else if (j % 2 != 0) {
                    this.gamefield[i][j] = [1];
                } else {
                    this.gamefield[i][j] = [0];
                }
            }
        }
    }

    start() {
        this.hero.start();
        for (let i = 0; i < this.enemyactive.length; i++) {
            if (this.enemyactive[i] != undefined) {
                this.enemyactive[i].start();
            }
        }
        this.bricks1.startInterval();
        this.bonus1.startInterval();
        this.render.start();
        this.isGameOver();
    }

    restart() {
        this.gameOver = false;
        this.lifes--;
        this.createHero();
        this.createRender();
        this.start();
    }

    stop() {
        this.hero.stop();
        for (let i = 0; i < this.enemyactive.length; i++) {
            if (this.enemyactive[i] != undefined) {
                this.enemyactive[i].stop();
            }
        }
        this.bricks1.stopInterval();
        this.bonus1.stopInterval();
        this.render.stop();
    }

    stopNoDeath() {
        this.hero.stopNoDeath();
        for (let i = 0; i < this.enemyactive.length; i++) {
            if (this.enemyactive[i] != undefined) {
                this.enemyactive[i].stopNoDeath();
            }
        }
        this.bricks1.stopInterval();
        this.bonus1.stopInterval();
        this.render.stop();
    }

    newLevelGame() {
        this.deadunits = 0;
        this.enemy = [];
        this.bomb = [];
        this.explosion = [];
        this.brick = [];
        this.bonus = [];
        this.hero = false;
        this.field = false;
        this.loaded = false;
        this.coordinates = [];
        this.brickcoordinates = [];
        this.enemyactive = [];
        this.gameWin = false;
        this.gameOver = false;
        this.createEmptyGameField();
        this.createField();
        this.createHero();
        this.randomEnemyUnits();
        this.randomBonuses();
        this.createRandomBricks();
        this.createRender();
        this.start();
    }

    isGameOver() {
        let intervalID = setInterval(() => {
            if (this.hero.stopped == true) {
                if (this.lifes == 1) this.stop();
                else {
                    this.stopNoDeath();
                    delete this.hero;
                    delete this.render;
                }
                this.gameOver = true;
                clearInterval(intervalID);
            }
            for (let i = 0; i < this.enemyactive.length; i++) {
                if (this.enemyactive[i] != undefined) {
                    if (this.enemyactive[i].stopped == true) {
                        this.deadunits++;
                        switch (this.enemyactive[i].type) {
                            case 3:
                                this.monsterscore += 1000;
                                break;
                            case 2:
                                this.monsterscore += 200;
                                break;
                            case 1:
                                this.monsterscore += 100;
                        }
                        delete this.enemyactive[i];
                    }
                }
            }
            if ((this.unitstype1 + this.unitstype2 + this.unitstype3) == this.deadunits) {
                this.stop();
                this.gameWin = true;
                clearInterval(intervalID);
            }
            this.countPoints();
        }, 200);
    }

    countPoints() {
        let sum = 0;
        for (let i = 0; i < this.bonus.length; i++) {
            if (this.bonus[i].dead == true) sum += 20;
        }
        for (let i = 0; i < this.brick.length; i++) {
            if (this.brick[i].dead == true) sum += 10;
        }
        sum += this.monsterscore;
        this.score = sum;
    }

    getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}