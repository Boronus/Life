import Model from './model.js';
import View from './view.js';

export default class Controller {

    constructor() {
        this._model = new Model (20);
        this._view = new View ();        
        this._view.initCanvas();
        const control = this;
        const $body = $('body');

        $body.bind('start', function (e) {
            control._model.start(e);
        });

        $body.bind('stop', function (e) {
            control._model.stop(e);
        });

        $body.bind('clear', function (e) {
            control._model.clear(e);
        });

        $body.bind('point', function (e) {
            control._model.point(e.x, e.y);
        });

        $body.bind('updateCanvas', function () {
            control._view.updateCanvas(control._model.tableB);
        });
    }
}