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
        var $screen =$("#life_screen");
        $screen.on("click", function(e){
            let $event = jQuery.Event("point");
            let $pos = $(this).offset();
            let canvas_left = pos.left;
            let canvas_top = pos.top;
            $event.x = e.pageX - canvas_left-3;
            $event.y = e.pageY - canvas_top-3;
            $('body').trigger($event);
        });
        $screen.css("background-color", "lightblue");
        let $ds = $screen.get(0).getContext("2d");
        for (let i=0;i<20;i++) {
            for (let j=0;j<20;j++) {
                    $ds.strokeRect(i*20, j*20, 20, 20);
            }
        }

    }

    updateCanvas (table) {
        let $ds = $("#life_screen").get(0).getContext("2d");
        let i=0,j=0;
        ds.clearRect(0, 0, 400, 400);
        for (i=0;i<20;i++) {
            for (j=0;j<20;j++) {
                if (table[i][j]===1)
                    ds.fillRect(i*20, j*20, 20, 20);
                else
                    ds.strokeRect(i*20, j*20, 20, 20);
            }
        }
    }

};