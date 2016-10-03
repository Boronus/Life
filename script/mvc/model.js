export default class Model {

    constructor(n = 20) {
        this.n = n;
        this.tableB = [];
        this.timer;
        this.isRunning = false;
        for (let i = 0; i < this.n; i++) {
            this.tableB[i] = [];
            for (let j = 0; j < this.n; j++) {
                this.tableB[i][j] = 0;
            }
        }
    }

    start() {
        const that = this;
        if (this.isRunning === false) {
            this.timer = setInterval(function () {
                that._changeArray();
            }, 100);
            this.isRunning = true;
        }
    }

    stop() {
        clearInterval(this.timer);
        this.isRunning = false;
    }

    clear() {
        this._newTable();
    }

    point(x, y) {
        let nx = Math.floor(x / 20);
        let ny = Math.floor(y / 20);
        if (this.tableB[nx][ny] === 0)
            this.tableB[nx][ny] = 1;
        else
            this.tableB[nx][ny] = 0;
        $('body').trigger('updateCanvas');
    }

    getTable () {
        return this.tableB;
    }
    
    _checkPoint(i, j) {
        let col = 0;
        for (let line = i - 1; line <= i + 1; line++) {
            for (let column = j - 1; column <= j + 1; column++) {
                if (i != line || j != column) {
                    //Зацикливаем процедуру на границе карты
                    let lineBorderLooped = line;
                    let columnBorderLooped = column;
                    if (line === -1)
                        lineBorderLooped = this.n - 1;
                    if (column === -1)
                        columnBorderLooped = this.n - 1;
                    if (line === this.n)
                        lineBorderLooped = 0;
                    if (column === this.n)
                        columnBorderLooped = 0;
                    //Считаем количество клеток
                    if (this.tableB[lineBorderLooped][columnBorderLooped] == 1)
                        col++;
                }
            }
        }
        let res = 0;
        if (this.tableB[i][j] === 0 && col === 3)
            res = 1;
        if (this.tableB[i][j] === 1 && (col === 2 || col === 3))
            res = 1;
        return res;
    }

    _step() {
        let tableN = [];
        for (let i = 0; i < this.n; i++) {
            tableN[i] = [];
            for (let j = 0; j < this.n; j++) {
                tableN[i][j] = 0;
            }
        }

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                tableN[i][j] = this._checkPoint(i, j);
            }
        }
        return tableN;
    }

    _changeArray() {
        this.tableB = this._step();
        $('body').trigger('updateCanvas');
    }

    _newTable() {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                this.tableB[i][j] = 0;
            }
        }
        $('body').trigger('updateCanvas');
    }

}