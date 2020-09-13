class ClockViewCanvas {
    constructor(container, clock) {
        this.container = container;
        this.clock = clock;
        this.createClock();
    }

    createClock() {
        let div = document.createElement('div');

        let canvasAnalogClock = document.createElement('canvas');
        canvasAnalogClock.setAttribute('width', '350px');
        canvasAnalogClock.setAttribute('height', '350px');
        this.context = canvasAnalogClock.getContext('2d');
        this.reDrawClock();

        div.appendChild(canvasAnalogClock);
        this.container.appendChild(div);
    }

    reDrawClock() {
        let context = this.context;
        context.clearRect(0, 0, 350, 350);
        context.fillStyle = "#fcca66";

        context.beginPath();
        context.arc(175, 175, 150, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "black";
        context.beginPath();
        context.arc(175, 175, 5, 0, Math.PI * 2);
        context.fill();

        let circleLength = 0;
        for (let i = 12; i >= 1; i--) {
            let angle = circleLength / 471 * Math.PI;
            let y = 175 - (Math.cos(angle) * (140 - 15));
            let x = 175 - (Math.sin(angle) * (140 - 15));
            circleLength += 78.5;
            context.fillStyle = "#48b382";
            context.beginPath();
            context.arc(x, y, 15, 0, Math.PI * 2);
            context.fill();
            context.fillStyle = "black";
            context.font = 'italic bold 15px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(i + '', x - 1, y);
        }

        context.beginPath();
        context.fillStyle = "black";
        context.font = 'bold 17px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        let text = this.setTextInfo();
        context.fillText(text, 175, 100);

        context.save();
        context.strokeStyle = "black";
        context.lineWidth = 6;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        context.translate(175, 175);
        context.rotate(this.degreesToRadian(this.clock.hour * 30));
        context.moveTo(0, 0);
        context.lineTo(0, -65);
        context.lineTo(0, 5);
        context.stroke();
        context.restore();

        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.beginPath();
        context.translate(175, 175);
        context.rotate(this.degreesToRadian(this.clock.minute * 6));
        context.moveTo(0, 0);
        context.lineTo(0, -105);
        context.lineTo(0, 10);
        context.stroke();
        context.restore();

        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.beginPath();
        context.translate(175, 175);
        context.rotate(this.degreesToRadian(this.clock.second * 6));
        context.moveTo(0, -4);
        context.lineTo(0, -130);
        context.stroke();
        context.restore();
    }

    setTextInfo() {
        let time = [];
        if ((this.clock.hour + "").length == 2) time[0] = this.clock.hour;
        if ((this.clock.minute + "").length == 2) time[1] = this.clock.minute;
        if ((this.clock.second + "").length == 2) time[2] = this.clock.second;
        if ((this.clock.hour + "").length == 1) time[0] = "0" + this.clock.hour;
        if ((this.clock.minute + "").length == 1) time[1] = "0" + this.clock.minute;
        if ((this.clock.second + "").length == 1) time[2] = "0" + this.clock.second;
        time = time.join(':');
        return time;
    }

    degreesToRadian(deg) {
        return deg / 180 * Math.PI;
    }
}