let formSend = document.getElementById("form");
let formElements = formSend.elements;


//валидация при нажатии кнопки
formSend.addEventListener("submit", function () {
    validDescription(formElements, true);
    validVotes(formElements, true);
    validPayment(formElements, true);
    validEMail(formElements, true);
    validVisitors(formElements, true);
    validDate(formElements, true);
    validSiteurl(formElements, true);
    validSitename(formElements, true);
    validDevelopers(formElements, true);
});


//валидация отдельных элементов
formElements.developers.addEventListener("blur", function () {
    validDevelopers(formElements, false);
});

formElements.sitename.addEventListener("blur", function () {
    validSitename(formElements, false);
});

formElements.siteurl.addEventListener("blur", function () {
    validSiteurl(formElements, false);
});

formElements.date.addEventListener("blur", function () {
    validDate(formElements, false);
});

formElements.visitors.addEventListener("blur", function () {
    validVisitors(formElements, false);
});

formElements.email.addEventListener("blur", function () {
    validEMail(formElements, false);
});

formElements.payment.forEach((v) => {
    v.addEventListener("blur", function () {
        validPayment(formElements, false);
    });
});

formElements.votes.addEventListener("blur", function () {
    validVotes(formElements, false);
});

formElements.description.addEventListener("blur", function () {
    validDescription(formElements, false);
});


//функции валидации для каждого отдельного элемента
function validDevelopers(formEl, focus) {
    checkNull(formEl.developers, focus);
}

function validSitename(formEl, focus) {
    checkNull(formEl.sitename, focus);
}

function validSiteurl(formEl, focus) {
    checkNull(formEl.siteurl, focus);
}

function validDate(formEl, focus) {
    checkNull(formEl.date, focus);
    checkNumber(formEl.date, focus);
    checkDate(formEl.date, focus);
}

function validVisitors(formEl, focus) {
    checkNull(formEl.visitors, focus);
    checkNumber(formEl.visitors, focus);
}

function validEMail(formEl, focus) {
    checkNull(formEl.email, focus);
    checkEMail(formEl.email, focus);
}

function validPayment(formEl, focus) {
    checkChosenPayment(formEl.payment, focus);
}

function validVotes(formEl, focus) {
    checkChosenVotes(formEl.votes, focus);
}

function validDescription(formEl, focus) {
    checkNull(formEl.description, focus);
}


//набор функций для проверки
function checkNull(name, focus) {
    if (!name.value) {
        showMes(name, "Поле не должно быть пустым", true, focus);
    } else {
        showMes(name, "", false);
    }
}

function checkNumber(name, focus) {
    if (name.value !== "") {    // isNan() валидирует данную ситуацию как false, поэтому добавлен данный цикл
        if (isNaN(name.value)) {
            showMes(name, "Поле должно быть числом", true, focus);
        } else {
            showMes(name, "", false);
        }
    }
}

function checkEMail(name, focus) {
    if (!name.value.includes('@')) {
        showMes(name, "Укажите корректный e-mail", true, focus);
    } else {
        showMes(name, "", false);
    }
}

function checkDate(name, focus) {
    if (!name.value.includes('.')) {
        showMes(name, "Укажите корректную дату, образец: 20.04", true, focus);
    } else {
        showMes(name, "", false);
    }
}

function checkChosenPayment(name, focus) {
    let flag = false; // name = RadioButtonList(3) у которого есть метод forEach() и нет метода some(),
    // поэтому тут было решено ввести дополнительный флаг для проверки на отмеченность;
    // своеобразный костыль, не придумал ничего лучше
    name.forEach((v) => { if (v.checked) flag = true; });
    if (!flag) {
        showMes(name[0], "Выберите один из вариантов", true, focus);
    } else {
        showMes(name[0], "", false);
    }
}

function checkChosenVotes(name, focus) {
    if (!name.checked) {
        showMes(name, "Вы должны согласиться:)", true, focus);
    } else {
        showMes(name, "", false);
    }
}

function showMes(name, text, show, focus) {
    if (show) {
        if (!(name.parentNode.getElementsByTagName("p").error)) {
            let newP = document.createElement("p");
            newP.style.color = "red";
            newP.style.display = "inline";
            newP.style.paddingLeft = "5px";
            newP.textContent = text;
            newP.setAttribute('name', 'error');
            name.parentNode.appendChild(newP);
            name.setAttribute('class', 'red_border');
        }
        event.preventDefault();
        if (focus) name.focus();
    } else {
        let error = name.parentNode.getElementsByTagName("p").error;
        if (error) name.parentNode.removeChild(error);
        name.setAttribute('class', 'green_border');
    }
}