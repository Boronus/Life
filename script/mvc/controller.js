export default function (model, view) {
        
    var _view = view;
    var _model = model;

    $('body').bind('start', function(e) {
        _model.start(e);
    });

    $('body').bind('stop', function(e) {
        _model.stop(e);
    });

    $('body').bind('clear', function(e) {
        _model.clear(e);
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