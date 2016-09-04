/**
 * Created by Дима on 04.09.2016.
 */
var View = function () {

    var updateCanvas = function (table) {
        var ds = $("#life_screen").get(0).getContext("2d");
        var i=0,j=0;
        ds.clearRect(0, 0, 400, 400);
        for (i=0;i<20;i++) {
            for (j=0;j<20;j++) {
                if (table[i][j]===1)
                    ds.fillRect(i*20, j*20, 20, 20);
                else
                    ds.strokeRect(i*20, j*20, 20, 20);
            }
        }
    };
    
    var initialCanvas = function(){
        $("#start_button").on("click", function(){
            var event = jQuery.Event("start");
            $('body').trigger(event);
        });
        $("#life_screen").on("click", function(e){
            var event = jQuery.Event("point");
            var pos = $(this).offset();
            var canvas_left = pos.left;
            var canvas_top = pos.top;
            event.x = e.pageX - canvas_left;
            event.y = e.pageY - canvas_top;            
            $('body').trigger(event);
        });
        $("#life_screen").css("background-color", "lightgreen");
    };
    initialCanvas();

    return  {
        updateCanvas: function (table) {
            updateCanvas(table);
        }
    };
};