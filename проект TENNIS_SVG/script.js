let startflag = false, counterSpeedRaise = 0; // флаг начала игры и подсчет отскоков для возможности ускорения мяча
let renewTiles, renewBall, requestID;         // переменные для хранения значений setInterval и requestAnimationFrame
let scoreLeft = 0, scoreRight = 0;            // счет игры

let left = document.getElementById("left");
let right = document.getElementById("right");
let ball = document.getElementById("ball");
let butstart = document.getElementById("butstart");
let butreset = document.getElementById("butreset");
let score = document.getElementById("score");

let keyMS = {};                               // обьект с нажатыми кнопками

let leftTile = {                 // объект с информацией для левой плитки
    y: 160,

    update: function (speedY) {
        this.y = this.y + speedY;
    }
};

let rightTile = {               // объект с информацией для правой плитки
    y: 160,

    update: function (speedY) {
        this.y = this.y + speedY;
    }
};

let ballInfo = {                // объект с информацией для мяча
    x: 300,
    y: 210,
    speedX: 0,
    speedY: 0,

    updateX: function (somespeedX) {
        this.x = this.x + somespeedX;
    },

    updateY: function (somespeedY) {
        this.y = this.y + somespeedY;
    }
};



butstart.addEventListener("click", function () {  // начало игры
    if (!startflag) {
        spawnBack();
        changeScore("Get Ready!");
        setTimeout(function () {
            startGame();
            let dimension = randomInteger(0, 1);
            if (dimension) ballInfo.speedX = 5;
            else ballInfo.speedX = -5;
            ballInfo.speedY = randomInteger(0, 10);
            startflag = true;
            changeScore();
        }, 1400);
    }
});

butreset.addEventListener("click", function () {  // обнуление счета
    scoreRight = 0;
    scoreLeft = 0;
    changeScore();
});

document.addEventListener('keydown', function (event) {  // реакция на нажатие клавиши
    if (!(event.code in keyMS)) {
        keyMS[event.code] = true;;
    }
});

document.addEventListener('keyup', function (event) {  // реакция на отпускание клавиши
    if (event.code in keyMS) {
        delete keyMS[event.code];
    }
});


function renew() {  // обновление координат плиток и мяча
    left.setAttribute('y', leftTile.y + '');
    right.setAttribute('y', rightTile.y + '');
    ball.setAttribute('cx', ballInfo.x + '');
    ball.setAttribute('cy', ballInfo.y + '');
    requestID = requestAnimationFrame(renew);
}

function renewInfoTiles() {  // реакция на нажатые клавиши, изменение координат плиток, каждые 10мс
    if ("ArrowUp" in keyMS) {
        rightTile.update(-1);
    }
    if ("ArrowDown" in keyMS) {
        rightTile.update(1);
    }
    if ("KeyW" in keyMS) {
        leftTile.update(-1);
    }
    if ("KeyS" in keyMS) {
        leftTile.update(1);
    }
    checkBordersTiles();
}

function renewInfoBall() {  // обновление координат мяча каждые 60мс (сделано для возможности иметь более разнообразный угол полета)
    let xstat = 0, ystat = 0;
    let move = setInterval(function () {  // интервал, обновляющий координаты мяча каждые 10 секунд, в зависимости от угла
        xstat += ballInfo.speedX / 10;    // в зависимости от ситуации, каждые 10мс есть возможность смещения мяча на один пиксель по обеим осям
        ystat += ballInfo.speedY / 10;    // угол составляется из отдельных комбинаций speedX и speedY и смещается отдельно, например при значении
        if (xstat > 1 || xstat < -1) {    // speedX == 7 за 100 мс мяч сместится на 7 пикселей, при этом смещение будет происходить равномерно, сделано 
            ballInfo.updateX(Math.round(xstat)); // это при помощи инкрементации значений xstat ystat, каждый раз, когда значение xstat ystat превышает единицу, происходит смещение
            if (xstat > 0) xstat -= 1;
            else xstat += 1;
        }
        if (ystat > 1 || ystat < -1) {
            ballInfo.updateY(Math.round(ystat));
            if (ystat > 0) ystat -= 1;
            else ystat += 1;
        }
        checkBordersBall();
    }, 6);
    setTimeout(function () { // остановка интервала, выпоняющего смещение каждые 10 мс по истечении 59мс, для того, чтобы не успела запустится новая итерация цикла,
        clearInterval(move); // так как функция будет вызываться заново каждые 60мс
    }, 59);
}

function checkBordersTiles() { // проверка на соблюдение границ плитками
    if (leftTile.y < 10) {
        leftTile.update(1);
    }
    if (leftTile.y > 310) {
        leftTile.update(-1);
    }
    if (rightTile.y < 10) {
        rightTile.update(1);
    }
    if (rightTile.y > 310) {
        rightTile.update(-1);
    }
}

function checkBordersBall() {  // проверка соблюдения границ мячом
    if (leftTile.y - 10 < ballInfo.y && (leftTile.y + 110) > ballInfo.y && ballInfo.x < 25) {  // когда есть попадание по плитке (условно плитки расширены на 
        ballInfo.speedX = 0 - ballInfo.speedX;                                                 // вируальные 10 пикселей в каждую сторону, тк смещение мяча идет относительно центра)
        ballInfo.updateX(2);   // смещение на 2 необходимо для предотвращение 'зависания' мяча у края стены
        raiseSpeedX();
        changeSpeedY(ballInfo.y - leftTile.y);
    }

    if (leftTile.y - 10 > ballInfo.y || (leftTile.y + 110) < ballInfo.y) {  // когда игра проиграна
        if (ballInfo.x < 15) {
            stopGame();
            if (startflag) scoreRight++;
            startflag = false;
            changeScore();
        }
    }

    if (rightTile.y - 10 < ballInfo.y && (rightTile.y + 110) > ballInfo.y && ballInfo.x > 575) {
        ballInfo.speedX = 0 - ballInfo.speedX;
        ballInfo.updateX(-2);
        raiseSpeedX();
        changeSpeedY(ballInfo.y - rightTile.y);
    }

    if (rightTile.y - 10 > ballInfo.y || (rightTile.y + 110) < ballInfo.y) {
        if (ballInfo.x > 585) {
            stopGame();
            if (startflag) scoreLeft++;
            startflag = false;
            changeScore();
        }
    }

    if (ballInfo.y < 25 || ballInfo.y > 395) {  // отталкивание от нижней и верхней стены
        ballInfo.speedY = 0 - ballInfo.speedY;
        if (ballInfo.y < 25) ballInfo.updateY(2);
        else ballInfo.updateY(-2);
    }
}

function raiseSpeedX() {  // плавное увеличение скорости по оси X мяча, для постепенного усложнения игры, сорость повышается от 5 до 10
    if (Math.abs(ballInfo.speedX) != 10) {
        counterSpeedRaise++;
        if (counterSpeedRaise == 2) {
            counterSpeedRaise = 0;
            if (ballInfo.speedX > 0) ballInfo.speedX++;
            else ballInfo.speedX--;
        }
    }
}

function changeSpeedY(zone) {  // функция для изменения угла, под которым летит мяч, в зависимости от зоны, от которой он оттолкнулся от плитки 
    if (ballInfo.speedY > 0) ballInfo.speedY = 10 - Math.round(zone / 12); // сделано для повышения интереса игры 
    else if (ballInfo.speedY == 0) ballInfo.speedY = 3;
    else ballInfo.speedY = (10 - Math.round(zone / 12)) * -1;
}

function randomInteger(min, max) {  // случайное число (для начальной генерации)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function startGame() {  // начало игры
    renewTiles = setInterval(renewInfoTiles, 10);
    renewBall = setInterval(renewInfoBall, 60);
    requestID = window.requestAnimationFrame(renew);
}

function stopGame() {  // остановка игры
    clearInterval(renewBall);
    clearInterval(renewTiles);
    window.cancelAnimationFrame(requestID);
}

function spawnBack() {  // возвращение плиток и мяча в начальное состояние
    leftTile.y = 160;
    rightTile.y = 160;
    ballInfo.x = 300;
    ballInfo.y = 210;
    renew();
    window.cancelAnimationFrame(requestID);
}

function changeScore(info = 0) {  // изменение счета игры (используется также для выведения надписи 'Get ready')
    if (info == 0) {
        let string = scoreLeft + ":" + scoreRight;
        score.textContent = string;
    } else {
        score.textContent = info;
    }
}