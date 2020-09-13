class ClockViewDOM {
    constructor(container, clock) {
        this.container = container;
        this.clock = clock;
        this.createClock();
    }

    createClock() {
        let div = document.createElement("div");

        let divAnalogClock = document.createElement("div");
        divAnalogClock.style.backgroundColor = "#fcca66";
        divAnalogClock.style.borderRadius = "50%";
        divAnalogClock.style.width = "300px";
        divAnalogClock.style.height = "300px";
        divAnalogClock.style.position = "relative";
        divAnalogClock.style.margin = "30px";

        let divDigClock = document.createElement("div");
        this.p = document.createElement("p");
        this.p.textContent = "0:0:0";
        this.p.style.fontWeight = "1000";
        this.p.style.fontSize = "20px";
        this.p.style.width = "80px";
        this.p.style.textAlign = "center";
        this.p.style.position = "absolute";
        this.p.style.left = "110px";
        this.p.style.top = "40px";
        divDigClock.appendChild(this.p);
        divAnalogClock.appendChild(divDigClock);

        let circleLength = 0;
        for (let i = 12; i >= 1; i--) {

            let angle = circleLength / 471 * Math.PI;
            let y = 150 - (Math.cos(angle) * (140 - 15)) - 15;
            let x = 150 - (Math.sin(angle) * (140 - 15)) - 15;
            circleLength += 78.5;

            let num = i + "";
            x = x + "px";
            y = y + "px";

            let divTime = document.createElement("div");
            divTime.textContent = num;
            divTime.style.backgroundColor = "#48b382";
            divTime.style.borderRadius = "50%";
            divTime.style.width = "30px";
            divTime.style.height = "30px";
            divTime.style.position = "absolute";
            divTime.style.left = x;
            divTime.style.top = y;
            divTime.style.fontWeight = "1000";
            divTime.style.display = "flex";
            divTime.style.alignItems = "center";
            divTime.style.justifyContent = "center";
            divAnalogClock.appendChild(divTime);
        }

        let pointBlack = document.createElement("div")
        pointBlack.style.backgroundColor = "black";
        pointBlack.style.borderRadius = "50%";
        pointBlack.style.width = "10px";
        pointBlack.style.height = "10px";
        pointBlack.style.position = "absolute";
        pointBlack.style.left = "150px";
        pointBlack.style.top = "150px";
        pointBlack.style.marginLeft = "-5px";
        pointBlack.style.marginTop = "-5px";
        divAnalogClock.appendChild(pointBlack);

        this.hourArrow = document.createElement("div");
        this.hourArrow.style.height = "140px";
        this.hourArrow.style.width = "6px";
        this.hourArrow.style.position = "absolute";
        this.hourArrow.style.left = "150px";
        this.hourArrow.style.top = "80px";
        this.hourArrow.style.marginLeft = "-3px";
        let hourArrowLine = document.createElement("div");
        hourArrowLine.style.backgroundColor = "black";
        hourArrowLine.style.height = "55%";
        hourArrowLine.style.width = "100%";
        hourArrowLine.style.borderRadius = "3px";
        this.hourArrow.appendChild(hourArrowLine);
        divAnalogClock.appendChild(this.hourArrow);

        this.minuteArrow = document.createElement("div");
        this.minuteArrow.style.height = "210px";
        this.minuteArrow.style.width = "4px";
        this.minuteArrow.style.position = "absolute";
        this.minuteArrow.style.left = "150px";
        this.minuteArrow.style.top = "45px";
        this.minuteArrow.style.marginLeft = "-2px";
        let minuteArrowLine = document.createElement("div");
        minuteArrowLine.style.backgroundColor = "black";
        minuteArrowLine.style.height = "55%";
        minuteArrowLine.style.width = "100%";
        minuteArrowLine.style.borderRadius = "2px";
        this.minuteArrow.appendChild(minuteArrowLine);
        divAnalogClock.appendChild(this.minuteArrow);

        this.secondArrow = document.createElement("div");
        this.secondArrow.style.height = "260px";
        this.secondArrow.style.width = "2px";
        this.secondArrow.style.position = "absolute";
        this.secondArrow.style.left = "150px";
        this.secondArrow.style.top = "20px";
        this.secondArrow.style.marginLeft = "-1px";
        let secondArrowLine = document.createElement("div");
        secondArrowLine.style.backgroundColor = "red";
        secondArrowLine.style.height = "49%";
        secondArrowLine.style.width = "100%";
        secondArrowLine.style.borderRadius = "1px";
        this.secondArrow.appendChild(secondArrowLine);
        divAnalogClock.appendChild(this.secondArrow);

        div.appendChild(divAnalogClock);
        this.container.appendChild(div);

        this.reDrawClock();
    }

    reDrawClock(){
        this.setTextInfo();
        this.setAnalogInfo();
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
        this.p.textContent = time;
    }

    setAnalogInfo() {
        let i = this.clock.hour * 30;
        i = this.setRotateI(i);
        this.hourArrow.style.transform = i;
        i = this.clock.minute * 6;
        i = this.setRotateI(i);
        this.minuteArrow.style.transform = i;
        i = this.clock.second * 6;
        i = this.setRotateI(i);
        this.secondArrow.style.transform = i;
    }

    setRotateI(num) {
        return "rotateZ(" + num + "deg)";
    }

}