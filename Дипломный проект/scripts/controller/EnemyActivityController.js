class EnemyActivityController {
    constructor(options) {
        this.img2 = options.img2;
        this.canvas = options.canvas;
        this.image = options.image;
        this.hero = options.hero;
        this.activeField = options.activeField;
        this.coordin_x = options.coordin_x;
        this.coordin_y = options.coordin_y;
        this.type = options.type;
        this.stopped = false;
    }

    createController() {
        let opt = {
            coordin_x: this.coordin_x,
            coordin_y: this.coordin_y,
            img2: this.img2,
            canvas: this.canvas,
            image: this.image,
            hero: this.hero,
            activeField: this.activeField,
            type: this.type
        }
        this.controller = new EnemyConroller(opt);
        this.controller.create();
        this.view = this.controller.view;
    }

    checkDimension() {
        if (this.controller.getIntelectFeedback()) {
            this.controller.goToHero();
        } else this.controller.getRandomDimension();
        this.controller.renewInfoModel();
        if (this.controller.checkExploded()) this.stop();
        this.controller.setActiveField(3);
    }

    start() {
        let func = this.checkDimension.bind(this);
        this.intervalID = setInterval(func, 130);
    }

    stop() {
        clearInterval(this.intervalID);
        this.controller.death();
        this.controller.setActiveField(0);
        setTimeout(() => {
            this.stopped = true;
        }, 2000);
    }

    stopNoDeath(){
        clearInterval(this.intervalID);
    }
}