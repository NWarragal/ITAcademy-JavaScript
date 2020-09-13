let img = document.getElementsByTagName('img'); //отключение возможности штатного перетаскивания изображений
for (let i = 0; i < img.length; i++) {
    img[i].addEventListener('dragstart', function(event){
        event.preventDefault();
        return false;
    })
}

let container = document.getElementById("container");
let objectDrag = false, startX, startY, resX, resY;

document.addEventListener('mousedown', function (e) {
    if (e.path[0].style.position !== 'absolute') {    //если на картинку еще не нажимали, тогда ей задается position: absolute, 
        let changediv = document.createElement('div');//на ее место ставится аналогичный по размерам div
        changediv.style.width = e.path[0].width + 'px';
        changediv.style.height = e.path[0].height + 'px';
        changediv.style.display = 'inline-block';
        changediv.style.position = 'relative';
        container.replaceChild(changediv, e.path[0]);
        e.path[0].style.position = 'absolute';
        e.path[0].style.left = 0;
        e.path[0].style.top = 0;
        changediv.appendChild(e.path[0]);
    }
    startX = e.clientX;                             // запись координат мыши в момент касания
    startY = e.clientY;
    objectDrag = e.path[0];                         // запись элемента, на который нажала мышь в переменную
    objectDrag.style.width = "110%";                // расширение картинки(по условию должна стать ближе к глазам)
    objectDrag.style.height = "110%";
    objectDrag.style.zIndex = 1;                    // картинка на передний план
    document.body.style.cursor = "grabbing";        // изменение курсора
});

document.addEventListener('mousemove', function (e) {
    if (objectDrag) {                               // проверка, выбрал ли элемент
        resX = e.clientX - startX;                  // вычисление смещения
        resY = e.clientY - startY;
        startX = e.clientX;                         // запись новых координат в стартовые
        startY = e.clientY;
        objectDrag.style.left = objectDrag.style.left.split('px')[0] * 1 + resX + 'px'; // вычисление новой позиции картинки
        objectDrag.style.top = objectDrag.style.top.split('px')[0] * 1 + resY + 'px';
    }
});

document.addEventListener('mouseup', function () {
    document.body.style.cursor = "default";         // курсор по умолчанию
    objectDrag.style.width = "100%";                // размер по умолчанию
    objectDrag.style.height = "100%";
    objectDrag.style.zIndex = 0;                    // возвращение картинки на задний план
    objectDrag = false;                             // обнуление переменной-индикатора
});