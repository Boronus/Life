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

	var _model = __webpack_require__(1);

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
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {

	    var i = 0,
	        j = 0;
	    var n = 20;
	    var tableB = [];
	    var timer;
	    var isRunning = false;
	    for (i = 0; i < n; i++) {
	        tableB[i] = [];
	        for (j = 0; j < n; j++) {
	            tableB[i][j] = 0;
	        }
	    }

	    var _checkPoint = function _checkPoint(i, j) {
	        var ip,
	            jp,
	            ipc,
	            jpc,
	            n = 20;
	        var col = 0;
	        for (ip = i - 1; ip <= i + 1; ip++) {
	            for (jp = j - 1; jp <= j + 1; jp++) {
	                if (i != ip || j != jp) {
	                    //Зацикливаем процедуру на границе карты
	                    ipc = ip;
	                    jpc = jp;
	                    if (ip === -1) ipc = n - 1;
	                    if (jp === -1) jpc = n - 1;
	                    if (ip === n) ipc = 0;
	                    if (jp === n) jpc = 0;
	                    //Считаем количество клеток
	                    if (tableB[ipc][jpc] == 1) col++;
	                }
	            }
	        }
	        var res = 0;
	        if (tableB[i][j] === 0 && col === 3) res = 1;
	        if (tableB[i][j] === 1 && (col === 2 || col === 3)) res = 1;
	        return res;
	    };

	    var step = function step() {
	        var tableN = [];
	        var n = 20;
	        var i, j;
	        for (i = 0; i < n; i++) {
	            tableN[i] = [];
	            for (j = 0; j < n; j++) {
	                tableN[i][j] = 0;
	            }
	        }

	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                tableN[i][j] = _checkPoint(i, j);
	            }
	        }
	        return tableN;
	    };

	    var changeArray = function changeArray() {
	        tableB = step();
	        $('body').trigger('updateCanvas');
	    };

	    var newTable = function newTable() {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                tableB[i][j] = 0;
	            }
	        }
	        $('body').trigger('updateCanvas');
	    };

	    return {
	        checkPoint: function checkPoint(i, j) {
	            _checkPoint(i, j);
	        },
	        start: function start() {
	            if (isRunning === false) {
	                timer = setInterval(function () {
	                    changeArray();
	                }, 100);
	                isRunning = true;
	            }
	        },
	        stop: function stop() {
	            clearInterval(timer);
	            isRunning = false;
	        },
	        clear: function clear() {
	            newTable();
	        },
	        point: function point(x, y) {
	            var nx = Math.floor(x / 20);
	            var ny = Math.floor(y / 20);
	            if (tableB[nx][ny] === 0) tableB[nx][ny] = 1;else tableB[nx][ny] = 0;
	            $('body').trigger('updateCanvas');
	        },
	        getTable: function getTable() {
	            return tableB;
	        }
	    };
	};

	;

/***/ },
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