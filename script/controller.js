/**
 * Created by Дима on 04.09.2016.
 */
var Controller = function (view, model) {

    var _view = view;
    var _model = model;

    $('body').bind('start', function(e) {
        _model.start(e);
    });

    $('body').bind('point', function(e) {
        _model.point(e.x,e.y);
    });

    $('body').bind('updateCanvas', function(e) {
        _view.updateCanvas(_model.getTable());
    });
    
    return  {

    };
};