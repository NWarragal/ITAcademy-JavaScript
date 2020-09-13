class RenderField {
    constructor(options) {
        this.field = options.field;
        this.hero = options.hero;
        this.enemy = options.enemy;
        this.brick = options.brick;
        this.bomb = options.bomb;
        this.explosion = options.explosion;
        this.bonus = options.bonus;
    }

    start() {
        let func = this.render.bind(this);
        this.requestID = requestAnimationFrame(func);
    }

    stop() {
        window.cancelAnimationFrame(this.requestID);
    }

    render() {
        this.field.render();
        if (this.bonus)
            for (let i = 0; i < this.bonus.length; i++) {
                this.bonus[i].render();
            }
        if (this.brick)
            for (let i = 0; i < this.brick.length; i++) {
                this.brick[i].render();
            }
        if (this.explosion)
            for (let i = 0; i < this.explosion.length; i++) {
                this.explosion[i].render();
            }
        if (this.bomb)
            for (let i = 0; i < this.bomb.length; i++) {
                this.bomb[i].render();
            }
        if (this.enemy)
            for (let i = 0; i < this.enemy.length; i++) {
                this.enemy[i].render();
            }
        this.hero.render();
        let func = this.render.bind(this);
        this.requestID = requestAnimationFrame(func);
    }
}