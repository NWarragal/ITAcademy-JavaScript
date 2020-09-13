class ClockControllerButtons {
    constructor(options) {
        this.name = options.name;
        this.gmt = options.gmt;
        this.container = options.container;
        this.tecnology = options.tecnology;
        this.createButtonsView();
        this.createClock();
    }

    createButtonsView() {
        let info = {
            name: this.name,
            gmt: this.gmt,
            container: this.container
        };
        this.view = new ClockControllerButtonsView(info);
    }

    createClock(){   
        let info = {
            gmt: this.gmt,
            tecnology: this.tecnology,
            container: this.view.divClock
        };

        this.clock = new Clock(info);

        this.view.butStart.addEventListener("click", () => {
            this.clock.start();
        });

        this.view.butEnd.addEventListener('click', () => {
            this.clock.stop();
        });
    }
}