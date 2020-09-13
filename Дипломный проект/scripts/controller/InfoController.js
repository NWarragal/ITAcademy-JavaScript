class InfoConroller{
    constructor(options){
        this.main = options.main;
    }

    findElements(){
        this.el = document.getElementsByTagName('p');
        this.score = this.el[0];
        this.lifes = this.el[1];
    }

    start(){
        this.intervalID = setInterval(() => {
            this.renewInfo();
        }, 100);
    }

    stop(){
        clearInterval(this.intervalID);
    }

    renewInfo(){
        this.score.textContent = "Score: " + this.main.score;
        this.lifes.textContent = "Lifes: " + this.main.lifes;
    }
}