/**
 * Created by Дима on 28.08.2016.
 */
var Model = function () {

    var notifyController = function () {
        $('body').trigger('updateView');
    }

    return  {
        change_color:function (color) {
            $('#life_screen').css("background-color", color);
            notifyController();
        }
    };
};
