function Snake() {
    //初始化蛇的身体
    this.body = [
        { "row": 3, "col": 5 },
        { "row": 3, "col": 4 },
        { "row": 3, "col": 3 },
        { "row": 3, "col": 2 },
    ];
    this.direction = "R";

}
Snake.prototype.update = function () {
    //移动方向
    switch (this.direction) {
        case "R":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 });
            break;
        case "D":
            this.body.unshift({ "row": this.body[0].row + 1, "col": this.body[0].col });
            break;
        case "L":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col - 1 });
            break;
        case "U":
            this.body.unshift({ "row": this.body[0].row - 1, "col": this.body[0].col });
            break;
    }
    this.body.pop()
    // this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 })
}
Snake.prototype.render = function () {
    //蛇的渲染
    game.setColor(this.body[0].row, this.body[0].col, 'pink')
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, 'cyan')
    }
}