class LocStorageClass {
    constructor() {
        this.name = 'rec';
        if (!localStorage.getItem(this.name))
            localStorage.setItem(this.name, JSON.stringify([]))
    }

    addValue(key, value, mode) {
        let obj = JSON.parse(localStorage.getItem(this.name));
        obj.push([key, value, mode]);
        localStorage.setItem(this.name, JSON.stringify(obj));
    }

    getInfo() {
        let obj = JSON.parse(localStorage.getItem(this.name));
        return obj;
    }
}