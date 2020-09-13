class HeroEventController {
    constructor(options) {
        this.img2 = options.img2;
        this.canvas = options.canvas;
        this.image = options.image;
        this.bomb = options.bomb;
        this.activeField = options.activeField;
        this.explosion = options.explosion;

        this.activeButtons = {};
        this.stopped = false;
    }

    createController() {
        let opt = {
            coordin_x: 1,
            coordin_y: 1,
            img2: this.img2,
            canvas: this.canvas,
            image: this.image,
            bomb: this.bomb,
            explosion: this.explosion,
            activeField: this.activeField
        }
        this.controller = new HeroController(opt);
        this.controller.create();
        this.view = this.controller.view;
    }

    addListeners() {
        let counter = 0;
        document.addEventListener('keydown', (event) => {
            if (!(event.code in this.activeButtons)) {
                this.activeButtons[event.code] = counter;
                counter++;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code in this.activeButtons) {
                for (let i in this.activeButtons) {
                    if (this.activeButtons[i] > this.activeButtons[event.code])
                        this.activeButtons[i]--;
                }
                delete this.activeButtons[event.code];
                counter--;
            }
        });
    }

    checkPressedButtons() {
        let max = -1, ind;
        for (let i in this.activeButtons) {
            if (max < this.activeButtons[i]) {
                max = this.activeButtons[i];
                ind = i;
            }
        }
        if ("KeyW" == ind) {
            this.controller.moveTop();
        }
        if ("KeyS" == ind) {
            this.controller.moveBottom();
        }
        if ("KeyA" == ind) {
            this.controller.moveLeft();
        }
        if ("KeyD" == ind) {
            this.controller.moveRight();
        }
        if ("Space" == ind) {
            this.controller.putBomb();
        }
        if ("KeyE" == ind) {
            this.controller.detonateBomb();
        }
        this.controller.renewInfoModel();
        this.controller.checkBonusTaken();
        if (this.controller.checkExploded()) this.stop();
        if (this.controller.checkEnemyDamaged()) this.stop();
        this.controller.setActiveField(2);
    }

    start() {
        let func = this.checkPressedButtons.bind(this);
        this.intervalID = setInterval(func, 80);
    }

    stop() {
        clearInterval(this.intervalID);
        this.controller.death();
        this.controller.setActiveField(0);
        setTimeout(() => {
            this.stopped = true;
        }, 500);
    }

    stopNoDeath(){
        this.controller.clear();
        clearInterval(this.intervalID);
    }
}