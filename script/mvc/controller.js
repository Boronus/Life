import Model from "./model.js";
import View from "./view.js";

export default class Controller {

    constructor() {
        this._model = new Model (20);
        this._view = new View ();        
        this._view.initCanvas();
        this.funcInit(this);
    }

    funcInit(that) {
        $('body').bind('start', function (e) {
            that._model.start(e);
        });

        $('body').bind('stop', function (e) {
            that._model.stop(e);
        });

        $('body').bind('clear', function (e) {
            that._model.clear(e);
        });

        $('body').bind('point', function (e) {
            that._model.point(e.x, e.y);
        });

        $('body').bind('updateCanvas', function (e) {
            that._view.updateCanvas(that._model.tableB);
        });
    }
};