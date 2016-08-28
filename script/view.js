/**
 * Created by Дима on 28.08.2016.
 */
var View = function () {
    var updateView = function () {
    };

    var initView = function(){
        $("#start_button").on("click", function(){
            var event = jQuery.Event("change_color");
            event.color = 'yellow';
            $('body').trigger(event);
        });
        $('#life_screen').css("background-color", "lightgreen");
    };
    initView();

    return  {
        updateView: function () {
            updateView();
        }
    };
};
