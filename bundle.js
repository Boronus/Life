var script =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _model = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./mvc/model.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _model2 = _interopRequireDefault(_model);

	var _view = __webpack_require__(2);

	var _view2 = _interopRequireDefault(_view);

	var _controller = __webpack_require__(3);

	var _controller2 = _interopRequireDefault(_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var model = (0, _model2.default)(); //let context = require.context('./mvc',false);

	var view = (0, _view2.default)();
	(0, _controller2.default)(model, view);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {

	    var _updateCanvas = function _updateCanvas(table) {
	        var ds = $("#life_screen").get(0).getContext("2d");
	        var i = 0,
	            j = 0;
	        ds.clearRect(0, 0, 400, 400);
	        for (i = 0; i < 20; i++) {
	            for (j = 0; j < 20; j++) {
	                if (table[i][j] === 1) ds.fillRect(i * 20, j * 20, 20, 20);else ds.strokeRect(i * 20, j * 20, 20, 20);
	            }
	        }
	    };

	    var initialCanvas = function initialCanvas() {
	        $("#start_button").on("click", function () {
	            $("#life_screen").css("background-color", "lightgreen");
	            var event = jQuery.Event("start");
	            $('body').trigger(event);
	        });
	        $("#stop_button").on("click", function () {
	            $("#life_screen").css("background-color", "lightblue");
	            var event = jQuery.Event("stop");
	            $('body').trigger(event);
	        });
	        $("#clear_button").on("click", function () {
	            var event = jQuery.Event("clear");
	            $('body').trigger(event);
	        });
	        $("#life_screen").on("click", function (e) {
	            var event = jQuery.Event("point");
	            var pos = $(this).offset();
	            var canvas_left = pos.left;
	            var canvas_top = pos.top;
	            event.x = e.pageX - canvas_left - 3;
	            event.y = e.pageY - canvas_top - 3;
	            $('body').trigger(event);
	        });
	        $("#life_screen").css("background-color", "lightblue");
	        var ds = $("#life_screen").get(0).getContext("2d");
	        var i = 0,
	            j = 0;
	        for (i = 0; i < 20; i++) {
	            for (j = 0; j < 20; j++) {
	                ds.strokeRect(i * 20, j * 20, 20, 20);
	            }
	        }
	    };
	    initialCanvas();

	    return {
	        updateCanvas: function updateCanvas(table) {
	            _updateCanvas(table);
	        }
	    };
	};

	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (model, view) {

	    var _view = view;
	    var _model = model;

	    $('body').bind('start', function (e) {
	        _model.start(e);
	    });

	    $('body').bind('stop', function (e) {
	        _model.stop(e);
	    });

	    $('body').bind('clear', function (e) {
	        _model.clear(e);
	    });

	    $('body').bind('point', function (e) {
	        _model.point(e.x, e.y);
	    });

	    $('body').bind('updateCanvas', function (e) {
	        _view.updateCanvas(_model.getTable());
	    });

	    return {};
	};

	;

/***/ }
/******/ ]);