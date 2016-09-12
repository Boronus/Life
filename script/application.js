//let context = require.context('./mvc',false);
import Model from "./mvc/model.js";
import View from "./mvc/view.js";
import Controller from "./mvc/controller.js";

var model = Model();
var view = View();
Controller(model,view);
