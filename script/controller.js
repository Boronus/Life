/**
 * Created by Дима on 28.08.2016.
 */
var Controller = function (view, model) {

    var _view = view;
    var _model = model;

    $('body').bind('change_color', function(e) {
        _model.change_color(e.color);
    });
    
    $('body').bind('updateView', function(e) {
        _view.updateView();
    });

    return  {

    };
};
