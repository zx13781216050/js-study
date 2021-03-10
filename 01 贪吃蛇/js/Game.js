function Game() {
    this.row = 20;
    this.col = 20;
    this.init()
}
Game.prototype.init = function () {
    this.dom = document.createElement("table");
    var tr, td;
    for (var i = 9; i < this.row; i++) {
        tr = document.createElement("tr");
        for (var j = 0; j < this.col; j++) {
            td = document.createElement("td");
            console.log(tr)
            tr.appendChild(td)
        }
        this.dom.appendChild(tr);
    }
    document.getElementById("app").appendChild(this.dom);
}