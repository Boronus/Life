export default class View {

    constructor (){
        const $screen = $('.js-life_screen');
        const $start_button = $('.js-start_button');
        const $stop_button = $('.js-stop_button');
        const $clear_button = $('.js-clear_button');
        $start_button.on('click', function(){
            $screen.css('background-color', 'lightgreen');
            const $event = jQuery.Event('start');
            $('body').trigger($event);
        });
        $stop_button.on('click', function(){
            $screen.css('background-color', 'lightblue');
            const $event = jQuery.Event('stop');
            $('body').trigger($event);
        });
        $clear_button.on('click', function(){
            const $event = jQuery.Event('clear');
            $('body').trigger($event);
        });
        $screen.on('click', function(e){
            const $event = jQuery.Event('point');
            const $pos = $(this).offset();
            const canvas_left = $pos.left;
            const canvas_top = $pos.top;
            $event.x = e.pageX - canvas_left-3;
            $event.y = e.pageY - canvas_top-3;
            $('body').trigger($event);
        });
        $screen.css('background-color', 'lightblue');
    }
    
    initCanvas () {
        const context = $('.js-life_screen').get(0).getContext('2d');
        this._drawRectsInit(context);
    }

    updateCanvas (table) {
        const context = $('.js-life_screen').get(0).getContext('2d');
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

}