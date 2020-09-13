let hour = 0, minute = 0, second = 0, timer, timerFlag = false;
const INTERVAL_LENGTH = 78.5;

let container = document.getElementById("container");
container.style.margin = "10px";
container.style.display = "block";

let divBut = document.createElement("div");
divBut.style.display = "flex";
divBut.style.width = "350px";
divBut.style.justifyContent = "space-around";

let butStart = document.createElement("button");
butStart.textContent = "Start clock";
butStart.style.cursor = "pointer";

let butEnd = document.createElement("button");
butEnd.textContent = "Stop clock";
butEnd.style.cursor = "pointer";

divBut.appendChild(butStart);
divBut.appendChild(butEnd);
container.appendChild(divBut);

let canvasAnalogClock = document.createElement('canvas');
canvasAnalogClock.setAttribute('width', '350px');
canvasAnalogClock.setAttribute('height', '350px');
let context = canvasAnalogClock.getContext('2d');
reDrawClock();

container.appendChild(canvasAnalogClock);

butStart.addEventListener("click", function () {
    if (!timerFlag) {
        let now = new Date();
        hour = now.getHours();
        minute = now.getMinutes();
        second = now.getSeconds();
        reDrawClock();
        timer = setInterval(timeChange, 1000);
        timerFlag = true;
    }
});

butEnd.addEventListener('click', function () {
    if (timerFlag) {
        clearInterval(timer);
        timerFlag = false;
    }
});



function reDrawClock() {
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
        circleLength += INTERVAL_LENGTH;
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
    let text = setTextInfo(hour, minute, second);
    context.fillText(text, 175, 100);

    context.save();
    context.strokeStyle = "black";
    context.lineWidth = 6;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.translate(175, 175);
    context.rotate(degreesToRadian(hour * 30));
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
    context.rotate(degreesToRadian(minute * 6));
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
    context.rotate(degreesToRadian(second * 6));
    context.moveTo(0, -4);
    context.lineTo(0, -130);
    context.stroke();
    context.restore();
}

function timeChange() {
    second++;
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    if (hour == 24) {
        hour = 0;
    }
    reDrawClock();
}

function setTextInfo(hours, mins, secs) {
    let time = [];
    if ((hours + "").length == 2) time[0] = hours;
    if ((mins + "").length == 2) time[1] = mins;
    if ((secs + "").length == 2) time[2] = secs;
    if ((hours + "").length == 1) time[0] = "0" + hours;
    if ((mins + "").length == 1) time[1] = "0" + mins;
    if ((secs + "").length == 1) time[2] = "0" + secs;
    time = time.join(':');
    return time;
}

function degreesToRadian(deg) {
    return deg / 180 * Math.PI;
}