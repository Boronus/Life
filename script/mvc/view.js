export default function () {

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
            $("#life_screen").css("background-color", "lightgreen");
            var event = jQuery.Event("start");
            $('body').trigger(event);
        });
        $("#stop_button").on("click", function(){
            $("#life_screen").css("background-color", "lightblue");
            var event = jQuery.Event("stop");
            $('body').trigger(event);
        });
        $("#clear_button").on("click", function(){
            var event = jQuery.Event("clear");
            $('body').trigger(event);
        });
        $("#life_screen").on("click", function(e){
            var event = jQuery.Event("point");
            var pos = $(this).offset();
            var canvas_left = pos.left;
            var canvas_top = pos.top;
            event.x = e.pageX - canvas_left-3;
            event.y = e.pageY - canvas_top-3;            
            $('body').trigger(event);
        });
        $("#life_screen").css("background-color", "lightblue");
        var ds = $("#life_screen").get(0).getContext("2d");
        var i=0,j=0;
        for (i=0;i<20;i++) {
            for (j=0;j<20;j++) {
                    ds.strokeRect(i*20, j*20, 20, 20);
            }
        }

    };
    initialCanvas();

    return  {
        updateCanvas: function (table) {
            updateCanvas(table);
        }
    };
};