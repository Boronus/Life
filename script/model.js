/**
 * Created by Дима on 04.09.2016.
 */
var Model = function () {

    //function getRandomInt(max)
    //{
    //    return Math.floor(Math.random() * (max + 1));
    //}

    var i=0,j=0;
    var n = 20, m = 20;
    var tableB = [];
    
    for (i = 0; i < m; i++){
        tableB[i] = [];
        for (j = 0; j < n; j++){
            tableB[i][j] = 0;
        }}
    //tableB[getRandomInt(20)][getRandomInt(20)]=1;
    
    return  {
        start:function () {
            $('body').trigger('updateCanvas');
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