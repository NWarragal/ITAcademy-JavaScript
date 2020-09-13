class ClockControllerButtonsView{
    constructor(options){
        this.name = options.name;
        this.gmt = options.gmt;
        this.container = options.container;
        this.createButtons();
    }

    createButtons(){
        let div = document.createElement("div");
        let divBut = document.createElement("div");
        this.divClock = document.createElement("div");

        this.butStart = document.createElement("button");
        this.butStart.textContent = "Start clock";
        this.butStart.style.cursor = "pointer";

        this.butEnd = document.createElement("button");
        this.butEnd.textContent = "Stop clock";
        this.butEnd.style.cursor = "pointer";

        let span = document.createElement("span");
        span.textContent = ` ${this.name} (GMT${!this.gmt ? "" : this.gmt > 0 ? "+" + this.gmt : "-" + Math.abs(this.gmt)})`;

        divBut.appendChild(this.butStart);
        divBut.appendChild(this.butEnd);
        divBut.appendChild(span);

        div.appendChild(divBut);
        div.appendChild(this.divClock);
        this.container.appendChild(div);
    }
}