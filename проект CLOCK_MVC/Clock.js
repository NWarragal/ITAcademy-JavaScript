class Clock {
    constructor(info) {
        this.gmt = info.gmt;
        this.tecnology = info.tecnology;
        this.container = info.container;
        this.createClockView();
        this.launch();
    }

    start() {
        this.startFlag = true;
    }

    stop() {
        this.startFlag = false;
    }

    renewClock() {
        let date = new Date();
        
        this.hour = date.getUTCHours();
        this.minute = date.getMinutes();
        this.second = date.getSeconds();
        this.hour += this.gmt;
        if(this.hour > 24) this.hour -= 24;
    }

    createClockView(){
        switch (this.tecnology) {
            case 'dom':
                this.viev = new ClockViewDOM(this.container, this);
                break;
            case 'canvas':
                this.viev = new ClockViewCanvas(this.container, this);
                break;
        }
    }

    launch(){
        this.startFlag = true;
        this.renewClock();
        this.viev.reDrawClock();
        setInterval(() => {
            if (this.startFlag) {
                this.renewClock();
                this.viev.reDrawClock();
            }
        }, 1000);
    }
}