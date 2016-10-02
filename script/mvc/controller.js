export default class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        $body = $('body');
        $body.bind('start', function (e) {
            this.model.start(e);
        });

        $body.bind('stop', function (e) {
            this.model.stop(e);
        });

        $body.bind('clear', function (e) {
            this.model.clear(e);
        });

        $body.bind('point', function (e) {
            this.model.point(e.x, e.y);
        });

        $body.bind('updateCanvas', function (e) {
            this.view.updateCanvas(this.model.getTable());
        });
    }
};