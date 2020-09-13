let isGameLaunched = false, level = 1, options, main, info;

window.addEventListener('DOMContentLoaded', () => {
    let hash = window.location.hash.substr(1);
    let wrapper = document.getElementById('wrapper');
    showPage();
    window.onhashchange = function () {
        hash = window.location.hash.substr(1);
        showPage();
    }

    function showPage() {
        switch (hash.substr(0, 4)) {
            case 'game':
                getNsetPage("game");
                if (isGameLaunched == false) {
                    setTimeout(function () {
                        setLevelOptions();
                        main = new MainController(options);
                        info = new InfoConroller({ main: main });
                        info.findElements();
                        info.start();
                        main.createGame();
                        let intervalID = setInterval(function () {
                            if (main.gameOver == true) {
                                if (main.lifes > 1) {
                                    main.restart();
                                } else {
                                    console.log('lox');
                                    window.location.hash = "#over";
                                    clearInterval(intervalID);
                                }
                            }
                            if (main.gameWin == true) {
                                raiseLevel(main);
                                main.newLevelGame();
                                main.gameWin = false;
                            }
                        }, 100);
                    }, 50);
                }
                break;

            case 'scor':
                getNsetPage("scores", true);
                break;

            case 'sure':
                getNsetPage("sure");
                break;

            case 'cont':
                getNsetPage("controls");
                break;

            case 'over':
                getNsetPage("gameover", true);
                setTimeout(function () {
                    let mainmenu = document.getElementsByTagName('a');
                    mainmenu[0].addEventListener('click', function (e) {
                        e.preventDefault();
                        let text = document.getElementsByTagName('input');
                        if (text[0].value == '') text[0].value = "Player";
                        let loc = new LocStorageClass();
                        if (main.score != 0) {
                            loc.addValue(text[0].value, main.score, level);
                            main.score = 0;
                        }
                        window.location.hash = '#main'
                    });
                }, 50);
                break;

            case 'abou':
                getNsetPage('about');
                break;

            case 'hard':
                level = 3;
                getNsetPage('mainhard');
                break;

            case 'medm':
                level = 2;
                getNsetPage('mainmed');
                break;

            case 'main':
            default:
                level = 1;
                getNsetPage('main');
        }
    }

    function setLevelOptions() {
        switch (level) {
            case 1:
                options = {
                    elementsgroup1: 15,
                    elementsgroup2: 8,
                    unitstype1: 10,
                    unitstype2: 5,
                    unitstype3: 0
                }
                break;
            case 2:
                options = {
                    elementsgroup1: 12,
                    elementsgroup2: 6,
                    unitstype1: 12,
                    unitstype2: 7,
                    unitstype3: 4
                }
                break;
            case 3:
                options = {
                    elementsgroup1: 10,
                    elementsgroup2: 5,
                    unitstype1: 9,
                    unitstype2: 8,
                    unitstype3: 6
                }
        }
    }

    function raiseLevel(main) {
        if (main.elementsgroup1 > 2)
            main.elementsgroup1--;
        if (main.elementsgroup2 > 2)
            main.elementsgroup2--;
        if (main.unitstype1 > 2)
            main.unitstype1--;
        if (main.unitstype2 < 10)
            main.unitstype2++;
        if (main.unitstype3 < 10)
            main.unitstype3++;
    }

    async function getNsetPage(title, control = false) {
        let responce = await fetch('html/' + title + '.html', { method: 'get', mode: 'no-cors' })
        let html = await responce.text();
        if (control == false) wrapper.innerHTML = html;
        else if (title == 'gameover') {
            html += " " + main.score;
            let responce = await fetch('html/' + title + 2 + '.html', { method: 'get' })
            html += await responce.text();
            wrapper.innerHTML = html;
        } else if (title == 'scores') {
            let loc = new LocStorageClass();
            let info = loc.getInfo();
            let txt = '';
            for (let i = 0; i < info.length - 1; i++) {
                for (let j = 0; j < info.length - i - 1; j++) {
                    if (info[j][1] < info[j + 1][1]) [info[j], info[j + 1]] = [info[j + 1], info[j]];
                }
            }
            for (let i = 0; i < info.length; i++) {
                txt += `<div>
                <p style="color: greenyellow;">${info[i][0]}</p>
                <p style="color: greenyellow;">${info[i][2] == 1 ? 'Easy' : info[i][2] == 2 ? 'Medium' : 'Hard'}</p>
                <p style="color: greenyellow;">${info[i][1]}</p>
                </div>`
            }
            html += txt;
            let responce = await fetch('html/' + title + 2 + '.html', { method: 'get' })
            html += await responce.text();
            wrapper.innerHTML = html;
        }
    }
});