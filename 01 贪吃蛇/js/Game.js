function Game() {
    //行数
    this.row = 20;
    //列数
    this.col = 20;
    this.init()
    //实例化蛇类
    this.snake = new Snake()

    this.start()

    this.bindEvent()
}
Game.prototype.init = function () {
    this.dom = document.createElement("table");
    var tr, td;
    //遍历行数列数
    for (var i = 9; i < this.row; i++) {
        tr = document.createElement("tr");
        for (var j = 0; j < this.col; j++) {
            td = document.createElement("td");

            tr.appendChild(td)
        }
        this.dom.appendChild(tr);
    }
    document.getElementById("app").appendChild(this.dom);
}
Game.prototype.clear = function () {
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = 'white';
        }
    }
}
//设置颜色
Game.prototype.setColor = function (row, col, color) {
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
}
Game.prototype.bindEvent = function () {
    document.onkeydown = function (event) {

    }
};
Game.prototype.start = function () {
    this.timer = setInterval(function () {
        game.clear();
        game.snake.update();
        game.snake.render();

    }, 1000)
}
