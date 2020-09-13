//-------------------- глобальные переменные

let form = document.getElementById("form");
let choise;

//-------------------- функции

function displayForm(ms) {
    ms.forEach(function (value) {
        let objKeys = Object.keys(value);
        let mainDiv = document.createElement("div");
        let fieldPutInfo;
        objKeys.forEach(function (valKey) {
            switch (valKey) {

                case "label":
                    let str;
                    str = document.createElement("p");
                    str.textContent = value[valKey];
                    str.style.width = "150px";
                    str.style.display = "inline-block";
                    mainDiv.appendChild(str);
                    break;

                case "kind":
                    fieldPutInfo = document.createElement("input");
                    fieldPutInfo.setAttribute('type', 'text');
                    switch (value[valKey]) {

                        case "longtext":
                            fieldPutInfo.style.width = "400px";
                            break;

                        case "number":
                            fieldPutInfo.style.width = "100px";
                            break;

                        case "shorttext":
                            fieldPutInfo.style.width = "200px";
                            break;

                        case "combo":
                            let varCombo = getVariants(value);
                            fieldPutInfo = document.createElement("select");

                            varCombo.forEach(function (valueOption) {
                                let option = document.createElement("option");
                                option.setAttribute('value', valueOption["value"]);
                                option.textContent = valueOption["text"];
                                fieldPutInfo.appendChild(option);
                            });
                            break;

                        case "radio":
                            fieldPutInfo = document.createElement("div");
                            fieldPutInfo.style.display = "inline-block";
                            let varRadio = getVariants(value);

                            varRadio.forEach(function (valueOption) {
                                let option = document.createElement("input");
                                option.setAttribute('type', 'radio');
                                option.setAttribute('value', valueOption["value"]);
                                option.setAttribute('name', 'radio');
                                fieldPutInfo.appendChild(option);
                                let span = document.createElement("span");
                                span.textContent = valueOption["text"];
                                fieldPutInfo.appendChild(span);
                            });
                            break;

                        case "check":
                            fieldPutInfo.setAttribute('type', 'checkbox');
                            break;

                        case "memo":
                            fieldPutInfo = document.createElement("div");
                            let memo = document.createElement("textarea");
                            memo.setAttribute('rows', 3);
                            memo.style.width = "550px";
                            fieldPutInfo.appendChild(memo);
                            break;
                        case "submit":
                            fieldPutInfo = null;
                            break;
                    }
                    break;

                case "name":
                    mainDiv.setAttribute('name', value[valKey]);
                    break;

                case "caption":
                    let button;
                    button = document.createElement("input");
                    button.setAttribute('type', 'button');
                    button.setAttribute('value', value[valKey]);
                    mainDiv.appendChild(button);
                    break;
            }
        });
        if (fieldPutInfo) mainDiv.appendChild(fieldPutInfo);
        form.appendChild(mainDiv);
    });
}

function getVariants(obj) {
    return obj.variants;
}

// добавленные функции

function getFetch(num) {
    let name = 'formDef' + num + '.json';
        fetch(name, { method: 'get' })
            .then(responce => responce.json())
            .then(formDef => {
                displayForm(formDef);
            }).catch(er => {
                console.log(er);
            })
    

}

function getAJAX(num) {
    $.ajax('formDef' + num + '.json', {
        type: 'GET', dataType: 'json', cache: false,
        success: success, error: errorHandler

    }
    );
}

function success(data) {
    displayForm(data);
}

function errorHandler(data) {
    console.log('error AJAX:' + data)
}


//-------------------- непосредственно сам код

do {
    choise = prompt("Enter what form you want to see (1 or 2)");
} while (choise < 1 || choise > 2 || isNaN(choise) || choise % 1 != 0);

getFetch(choise);
getAJAX(choise);