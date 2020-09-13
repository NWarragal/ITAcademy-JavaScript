let hour = 0, minute = 0, second = 0, timer, timerFlag = false; //переменные для хранения значений часов, минут, секунд и флаг запуска часов(чтобы не запустить второй таймер)
const INTERVAL_LENGTH = 78.5;  //константа(длина дуги), нужна для вычиления позиций цифр в аналоговых часах, высчитана вручную для радиуса 150px

let container = document.getElementById("container");  //блок-контейнер, в котором будет все располагаться
container.style.margin = "10px";
container.style.display = "block";

let divBut = document.createElement("div");  //блок кнопок
divBut.style.display = "flex";
divBut.style.width = "350px";
divBut.style.justifyContent = "space-around";

let butStart = document.createElement("button");  //кнопка запуска часов
butStart.textContent = "Start clock";
butStart.style.cursor = "pointer";

let butEnd = document.createElement("button");  //кнопка остановки часов
butEnd.textContent = "Stop clock";
butEnd.style.cursor = "pointer";

divBut.appendChild(butStart);
divBut.appendChild(butEnd);
container.appendChild(divBut);

let divAnalogClock = document.createElement("div");  //блок аналоговых часов(желтый круг)
divAnalogClock.style.backgroundColor = "#fcca66";
divAnalogClock.style.borderRadius = "50%";
divAnalogClock.style.width = "300px";
divAnalogClock.style.height = "300px";
divAnalogClock.style.position = "relative";
divAnalogClock.style.margin = "30px";

let divDigClock = document.createElement("div");  //блок цифровых часов
let p = document.createElement("p");
p.textContent = "0:0:0";
p.style.fontWeight = "1000";
p.style.fontSize = "20px";
p.style.width = "80px";
p.style.textAlign = "center";
p.style.position = "absolute";
p.style.left = "110px";
p.style.top = "40px";
divDigClock.appendChild(p);
divAnalogClock.appendChild(divDigClock);

let circleLength = 0;
for (let i = 12; i >= 1; i--) {  //цикл создания и позиционирования цифр внутри аналоговых часов

    //алогрим вычисления основан на вычислении координат левого угла конкретного блока цифры исходя
    //из длины дуги (вся окружность была разбита на 12 одинаковых частей, преимущественно все считалось вручную)
    //все заключается в нахождении угла напротив дуги, и через синусы и косинусы вычисляется смещение относительно центра круга
    //при необходимости это все возможно переделать для адаптации под изменяющиеся размеры часов, но
    //здесь все сделано для фиксированных размеров, решил не тратить на это время
    let angle = circleLength / 471 * Math.PI;
    let y = 150 - (Math.cos(angle) * (140 - 15)) - 15;
    let x = 150 - (Math.sin(angle) * (140 - 15)) - 15;
    circleLength += INTERVAL_LENGTH;  //инкрементирование длины дуги на константное значение

    let num = i + "";
    x = x + "px";
    y = y + "px";

    let divTime = document.createElement("div");  //блок цифры часов
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

let pointBlack = document.createElement("div");  //блок точки в центре часов(своеобразное крепление стрелок)
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

let hourArrow = document.createElement("div");  //блок часовой стрелки(симметричен относительно центра)
hourArrow.style.height = "140px";
hourArrow.style.width = "6px";
hourArrow.style.position = "absolute";
hourArrow.style.left = "150px";
hourArrow.style.top = "80px";
hourArrow.style.marginLeft = "-3px";
let hourArrowLine = document.createElement("div");  //видимая часть часовой стрелки(верхние 55% блока стрелки)
hourArrowLine.style.backgroundColor = "black";
hourArrowLine.style.height = "55%";
hourArrowLine.style.width = "100%";
hourArrowLine.style.borderRadius = "3px";
hourArrow.appendChild(hourArrowLine);
divAnalogClock.appendChild(hourArrow);

let minuteArrow = document.createElement("div");  //блок минутной стрелки(симметричен относительно центра)
minuteArrow.style.height = "210px";
minuteArrow.style.width = "4px";
minuteArrow.style.position = "absolute";
minuteArrow.style.left = "150px";
minuteArrow.style.top = "45px";
minuteArrow.style.marginLeft = "-2px";
let minuteArrowLine = document.createElement("div");  //видимая часть минутной стрелки(верхние 55% блока стрелки)
minuteArrowLine.style.backgroundColor = "black";
minuteArrowLine.style.height = "55%";
minuteArrowLine.style.width = "100%";
minuteArrowLine.style.borderRadius = "2px";
minuteArrow.appendChild(minuteArrowLine);
divAnalogClock.appendChild(minuteArrow);

let secondArrow = document.createElement("div");  //блок секундной стрелки(симметричен относительно центра)
secondArrow.style.height = "260px";
secondArrow.style.width = "2px";
secondArrow.style.position = "absolute";
secondArrow.style.left = "150px";
secondArrow.style.top = "20px";
secondArrow.style.marginLeft = "-1px";
let secondArrowLine = document.createElement("div");  //видимая часть секундной стрелки(верхние 49% блока стрелки, сделал так для эстетики)
secondArrowLine.style.backgroundColor = "red";
secondArrowLine.style.height = "49%";
secondArrowLine.style.width = "100%";
secondArrowLine.style.borderRadius = "1px";
secondArrow.appendChild(secondArrowLine);
divAnalogClock.appendChild(secondArrow);

container.appendChild(divAnalogClock);

butStart.addEventListener("click", function () {  //обработчик события на запуск часов
    if (!timerFlag) {
        let now = new Date();
        hour = now.getHours();
        minute = now.getMinutes();
        second = now.getSeconds();
        timer = setInterval(timeChange, 1000);
        timerFlag = true;
    }
});

butEnd.addEventListener('click', function () {  //обработчик события на остановку часов
    if (timerFlag) {
        clearInterval(timer);
        timerFlag = false;
    }
});

function timeChange() {  //функция, вызываемая ежесекундно интервалом, обычный инкремент и выведение результатов
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
    setTextInfo(hour, minute, second);
    setAnalogInfo(hour, minute, second);
}

function setTextInfo(hours, mins, secs) {  //установка цифрового значения времени
    let time = [];
    if ((hours + "").length == 2) time[0] = hours;
    if ((mins + "").length == 2) time[1] = mins;
    if ((secs + "").length == 2) time[2] = secs;
    if ((hours + "").length == 1) time[0] = "0" + hours;  //дополнительный ноль в начало, если значение меньше 10
    if ((mins + "").length == 1) time[1] = "0" + mins;
    if ((secs + "").length == 1) time[2] = "0" + secs;
    time = time.join(':');
    p.textContent = time;
}

function setAnalogInfo(hours, mins, secs) {  //установка стрелок часов в нужное положение
    let i = hours * 30;
    i = setRotateI(i);
    hourArrow.style.transform = i;
    i = mins * 6;
    i = setRotateI(i);
    minuteArrow.style.transform = i;
    i = secs * 6;
    i = setRotateI(i);
    secondArrow.style.transform = i;
}

function setRotateI(num) {  //адаптация под css
    return "rotateZ(" + num + "deg)";
}