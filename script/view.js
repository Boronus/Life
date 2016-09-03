/**
 * Created by Дима on 28.08.2016.
 */
var View = function () {
    var updateView = function (table) {
        var ds = $("#life_screen").get(0).getContext("2d");
        var i=0;
        ds.beginPath();
        for (i=20;i<400;i+=20) {
            ds.moveTo(i,0);
            ds.lineTo(i,400);
            ds.moveTo(0,i);
            ds.lineTo(400,i);
        }
        ds.closePath();
        ds.stroke();
    };

    var initView = function(){
        $("#start_button").on("click", function(){
            var event = jQuery.Event("change_pixel");
            event.color = 'yellow';
            $('body').trigger(event);
        });
        $('#life_screen').css("background-color", "lightgreen");
    };
    initView();

    return  {
        updateView: function (table) {
            updateView(table);
        }
    };
};
