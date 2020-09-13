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
            case 'tabl':
                getNsetPage("table");
                getNsetJSONFile("table");
                break;

            case 'info':
                getNsetPage("info");
                getNsetJSONFile("navi");
                getNsetJSONFile(hash);
                break;

            case 'main':
            default:
                getNsetPage('main');
        }
    }

    async function getNsetPage(title) { // перезагрузка страницы, подгрузка актуального файла
        let responce = await fetch('pages/' + title + '.html', { method: 'get' })
        let html = await responce.text();
        wrapper.innerHTML = html;
    }

    async function getNsetJSONFile(mode) {  // загрузка файла со списком статей и использование по одному из трех сценариев, в зависимости от ситуации
        let responce = await fetch('info/info.json', { method: 'get' })
        let json = await responce.json();
        switch (mode.substr(0, 4)) {
            case 'tabl':
                let content = document.getElementById('content');
                setTableContent(Object.keys(json), content);
                break;
            case 'navi':
                let links = document.getElementById('links');
                setNavContent(Object.keys(json), links);
            case 'info':
                let length = hash.substr(4, hash.length);
                let counter = 0;
                for (let i in json) {
                    if (counter != length) counter++;
                    else {
                        setInfoContent(json[i], i);
                        break;
                    }
                }
        }

    }

    function setTableContent(obj, container) {  // создание оглавления на соотвествующей странице
        let letter = obj[0].substr(0, 1);
        for (let i = 0; i < obj.length; i++) {
            let div = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.textContent = letter;
            div.appendChild(h2);
            while (letter == obj[i].substr(0, 1)) {
                let a = document.createElement('a');
                a.textContent = obj[i];
                a.setAttribute('href', '#info' + i);
                div.appendChild(a);
                i++;
                if (i == obj.length) break;
            }
            container.appendChild(div);
            if (i == obj.length) break;
            letter = obj[i].substr(0, 1);
            i--;
        }
    }

    function setNavContent(obj, container) {  // создание списка статей в левом сайдбаре
        for (let i = 0; i < obj.length; i++) {
            let a = document.createElement('a');
            a.textContent = obj[i];
            a.setAttribute('href', '#info' + i);
            container.appendChild(a);
        }
    }

    async function setInfoContent(filename, name) {  // создание статьи из файла
        let infoDiv = document.getElementById('info');
        let responce = await fetch('info/' + filename, { method: 'get' })
        let text = await responce.text();
        let inside = `<h2>${name}</h2>
        <p>${text}</p>`;
        infoDiv.innerHTML = inside;
    }
});