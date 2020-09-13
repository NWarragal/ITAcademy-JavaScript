let container = document.getElementById("container");

let new_york = new ClockControllerButtons({
    name: 'Нью Йорк',
    gmt: -5,
    container: container,
    tecnology: 'dom'
});

let london = new ClockControllerButtons({
    name: 'Лондон',
    gmt: 0,
    container: container,
    tecnology: 'dom'
});

let berlin = new ClockControllerButtons({
    name: 'Берлин',
    gmt: 1,
    container: container,
    tecnology: 'dom'
});

let minsk = new ClockControllerButtons({
    name: 'Минск',
    gmt: 3,
    container: container,
    tecnology: 'canvas'
});

let tokyo = new ClockControllerButtons({
    name: 'Токио',
    gmt: 9,
    container: container,
    tecnology: 'canvas'
});

let vladivostok = new ClockControllerButtons({
    name: 'Владивосток',
    gmt: 10,
    container: container,
    tecnology: 'canvas'
});