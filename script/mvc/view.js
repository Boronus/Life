export default class View {

    constructor (){
        $(".js-start_button").on("click", function(){
            $(".js-life_screen").css("background-color", "lightgreen");
            let $event = jQuery.Event("start");
            $('body').trigger($event);
        });
        $(".js-stop_button").on("click", function(){
            $(".js-life_screen").css("background-color", "lightblue");
            let $event = jQuery.Event("stop");
            $('body').trigger($event);
        });
        $(".js-clear_button").on("click", function(){
            let $event = jQuery.Event("clear");
            $('body').trigger($event);
        });
        let $screen =$(".js-life_screen");
        $screen.on("click", function(e){
            let $event = jQuery.Event("point");
            let $pos = $(this).offset();
            let canvas_left = $pos.left;
            let canvas_top = $pos.top;
            $event.x = e.pageX - canvas_left-3;
            $event.y = e.pageY - canvas_top-3;
            $('body').trigger($event);
        });
        $screen.css("background-color", "lightblue");
    }
    
    initCanvas () {
        var context = $(".js-life_screen").get(0).getContext("2d");
        this._drawRectsInit(context);
    }

    updateCanvas (table) {
        var context = $(".js-life_screen").get(0).getContext("2d");
        this._drawRects(table,context);
    }
    
    _drawRectsInit (canvasContext) {
        for (let i=0;i<20;i++) {
            for (let j=0;j<20;j++) {
                canvasContext.strokeRect(i*20, j*20, 20, 20);
            }
        }
    }

    _drawRects (table,canvasContext) {
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