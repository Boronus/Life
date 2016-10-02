export default class View {

    constructor (){
        $("#start_button").on("click", function(){
            $("#life_screen").css("background-color", "lightgreen");
            let $event = jQuery.Event("start");
            $('body').trigger($event);
        });
        $("#stop_button").on("click", function(){
            $("#life_screen").css("background-color", "lightblue");
            let $event = jQuery.Event("stop");
            $('body').trigger($event);
        });
        $("#clear_button").on("click", function(){
            let $event = jQuery.Event("clear");
            $('body').trigger($event);
        });
        //let $screen =$("#life_screen");
        $("#life_screen").on("click", function(e){
            let $event = jQuery.Event("point");
            let $pos = $(this).offset();
            let canvas_left = $pos.left;
            let canvas_top = $pos.top;
            $event.x = e.pageX - canvas_left-3;
            $event.y = e.pageY - canvas_top-3;
            $('body').trigger($event);
        });
        $("#life_screen").css("background-color", "lightblue");
    }
    
    drawRectsInit (canvasContext) {
        for (let i=0;i<20;i++) {
            for (let j=0;j<20;j++) {
                canvasContext.strokeRect(i*20, j*20, 20, 20);
            }
        }
    }

    initCanvas () {
        var context = $("#life_screen").get(0).getContext("2d");
        this.drawRectsInit(context);
    }

    updateCanvas (table) {
        var context = $("#life_screen").get(0).getContext("2d");
        this.drawRects(table,context);
    }

    drawRects (table,canvasContext) {
        canvasContext.clearRect(0, 0, 400, 400);
        for (let i=0;i<20;i++) {
            for (let j=0;j<20;j++) {
                if (table[i][j]===1)
                    canvasContext.fillRect(i*20, j*20, 20, 20);
                else
                    canvasContext.strokeRect(i*20, j*20, 20, 20);
            }
        }
    }

};