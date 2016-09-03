/**
 * Created by Дима on 28.08.2016.
 */
var Model = function () {

    var table = new Array(20);
    for(var i = 0; i < table.length; i++)
        table[i] = new Array(10);
    
    var notifyController = function () {
        $('body').trigger('updateView');
    }

    return  {
        change_color:function (color) {
            //$('#life_screen').css("background-color", color);
            console.log("mas");
            notifyController();
        }
    };
};
