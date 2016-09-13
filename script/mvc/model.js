export default function() {

    var i=0,j=0;
    var n = 20;
    var tableB = [];
    var timer;
    var isRunning=false;
    for (i = 0; i < n; i++){
        tableB[i] = [];
        for (j = 0; j < n; j++){
            tableB[i][j] = 0;
        }
    }

    var checkPoint = function (i,j) {
        var ip,jp,ipc,jpc;
        var col =0;
        for (ip = i-1; ip <= i+1; ip++) {
            for (jp = j-1; jp <= j+1; jp++) {
                if (i!=ip || j!=jp) {
                    //Зацикливаем процедуру на границе карты
                    ipc=ip;
                    jpc=jp;
                    if (ip === -1)
                        ipc = n-1;
                    if (jp === -1)
                        jpc = n-1;
                    if (ip === n)
                        ipc = 0;
                    if (jp === n)
                        jpc = 0;
                    //Считаем количество клеток
                    if (tableB[ipc][jpc] == 1)
                        col++;
                }
            }
        }
        var res=0;
        if (tableB[i][j]===0 && col===3)
            res = 1;
        if (tableB[i][j]===1 && (col===2 || col===3))
            res = 1;
        return res;
        
    }

    var step = function () {
        var tableN = [];
        var i,j;
        for (i = 0; i < n; i++){
            tableN[i] = [];
            for (j = 0; j < n; j++){
                tableN[i][j] = 0;
            }
        }

        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                tableN[i][j] = checkPoint(i, j);
            }
        }
        return tableN;
    }

    var changeArray = function () {
        tableB = step();
        $('body').trigger('updateCanvas');
    }
    
    var newTable = function () {
        for (i = 0; i < n; i++){
            for (j = 0; j < n; j++){
                tableB[i][j] = 0;
            }
        }
        $('body').trigger('updateCanvas');
    }

    return  {
        checkPoint:function(i,j) {
            return checkPoint(i,j);
        },
        stepControl:function() {
            tableB = step();
            return tableB;
        },
        putTable: function(table,nt){
            tableB = table;
            n=nt;
        },
        start:function () {
            if (isRunning===false) {
                timer = setInterval(function () {
                    changeArray();
                }, 100);
                isRunning=true;
            }
        },
        stop:function () {
            clearInterval(timer);
            isRunning=false;
        },
        clear:function () {
            newTable();
        },
        point:function (x,y) {
            var nx = Math.floor(x/20);
            var ny = Math.floor(y/20);
            if (tableB[nx][ny]===0)
                tableB[nx][ny] = 1;
            else
                tableB[nx][ny] = 0;
            $('body').trigger('updateCanvas');
        },
        getTable: function(){
            return tableB;
        }
    };
};