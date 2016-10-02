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

	var _controller = __webpack_require__(1);

	var _controller2 = _interopRequireDefault(_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = new _controller2.default();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _model = __webpack_require__(2);

	var _model2 = _interopRequireDefault(_model);

	var _view = __webpack_require__(3);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = function () {
	    function Controller() {
	        _classCallCheck(this, Controller);

	        this._model = new _model2.default(20);
	        this._view = new _view2.default();
	        this._view.initCanvas();
	        this.funcInit(this);
	    }

	    _createClass(Controller, [{
	        key: "funcInit",
	        value: function funcInit(that) {
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
	    }]);

	    return Controller;
	}();

	exports.default = Controller;
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	    function Model() {
	        var n = arguments.length <= 0 || arguments[0] === undefined ? 20 : arguments[0];

	        _classCallCheck(this, Model);

	        this.n = n;
	        this.tableB = [];
	        this.timer;
	        this.isRunning = false;
	        for (var i = 0; i < this.n; i++) {
	            this.tableB[i] = [];
	            for (var j = 0; j < this.n; j++) {
	                this.tableB[i][j] = 0;
	            }
	        }
	    }

	    _createClass(Model, [{
	        key: '_checkPoint',
	        value: function _checkPoint(i, j) {
	            var col = 0;
	            for (var ip = i - 1; ip <= i + 1; ip++) {
	                for (var jp = j - 1; jp <= j + 1; jp++) {
	                    if (i != ip || j != jp) {
	                        //Зацикливаем процедуру на границе карты
	                        var ipc = ip;
	                        var jpc = jp;
	                        if (ip === -1) ipc = this.n - 1;
	                        if (jp === -1) jpc = this.n - 1;
	                        if (ip === this.n) ipc = 0;
	                        if (jp === this.n) jpc = 0;
	                        //Считаем количество клеток
	                        if (this.tableB[ipc][jpc] == 1) col++;
	                    }
	                }
	            }
	            var res = 0;
	            if (this.tableB[i][j] === 0 && col === 3) res = 1;
	            if (this.tableB[i][j] === 1 && (col === 2 || col === 3)) res = 1;
	            return res;
	        }
	    }, {
	        key: '_step',
	        value: function _step() {
	            var tableN = [];
	            for (var i = 0; i < this.n; i++) {
	                tableN[i] = [];
	                for (var j = 0; j < this.n; j++) {
	                    tableN[i][j] = 0;
	                }
	            }

	            for (var _i = 0; _i < this.n; _i++) {
	                for (var _j = 0; _j < this.n; _j++) {
	                    tableN[_i][_j] = this._checkPoint(_i, _j);
	                }
	            }
	            return tableN;
	        }
	    }, {
	        key: '_changeArray',
	        value: function _changeArray() {
	            this.tableB = this._step();
	            $('body').trigger('updateCanvas');
	        }
	    }, {
	        key: '_newTable',
	        value: function _newTable() {
	            for (var i = 0; i < this.n; i++) {
	                for (var j = 0; j < this.n; j++) {
	                    this.tableB[i][j] = 0;
	                }
	            }
	            $('body').trigger('updateCanvas');
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            var that = this;
	            if (this.isRunning === false) {
	                this.timer = setInterval(function () {
	                    that._changeArray();
	                }, 100);
	                this.isRunning = true;
	            }
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            clearInterval(this.timer);
	            this.isRunning = false;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this._newTable();
	        }
	    }, {
	        key: 'point',
	        value: function point(x, y) {
	            var nx = Math.floor(x / 20);
	            var ny = Math.floor(y / 20);
	            if (this.tableB[nx][ny] === 0) this.tableB[nx][ny] = 1;else this.tableB[nx][ny] = 0;
	            $('body').trigger('updateCanvas');
	        }
	    }, {
	        key: 'getTable',
	        value: function getTable() {
	            return this.tableB;
	        }
	    }]);

	    return Model;
	}();

	exports.default = Model;
	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = function () {
	    function View() {
	        _classCallCheck(this, View);

	        $("#start_button").on("click", function () {
	            $("#life_screen").css("background-color", "lightgreen");
	            var $event = jQuery.Event("start");
	            $('body').trigger($event);
	        });
	        $("#stop_button").on("click", function () {
	            $("#life_screen").css("background-color", "lightblue");
	            var $event = jQuery.Event("stop");
	            $('body').trigger($event);
	        });
	        $("#clear_button").on("click", function () {
	            var $event = jQuery.Event("clear");
	            $('body').trigger($event);
	        });
	        //let $screen =$("#life_screen");
	        $("#life_screen").on("click", function (e) {
	            var $event = jQuery.Event("point");
	            var $pos = $(this).offset();
	            var canvas_left = $pos.left;
	            var canvas_top = $pos.top;
	            $event.x = e.pageX - canvas_left - 3;
	            $event.y = e.pageY - canvas_top - 3;
	            $('body').trigger($event);
	        });
	        $("#life_screen").css("background-color", "lightblue");
	    }

	    _createClass(View, [{
	        key: "drawRectsInit",
	        value: function drawRectsInit(canvasContext) {
	            for (var i = 0; i < 20; i++) {
	                for (var j = 0; j < 20; j++) {
	                    canvasContext.strokeRect(i * 20, j * 20, 20, 20);
	                }
	            }
	        }
	    }, {
	        key: "initCanvas",
	        value: function initCanvas() {
	            var context = $("#life_screen").get(0).getContext("2d");
	            this.drawRectsInit(context);
	        }
	    }, {
	        key: "updateCanvas",
	        value: function updateCanvas(table) {
	            var context = $("#life_screen").get(0).getContext("2d");
	            this.drawRects(table, context);
	        }
	    }, {
	        key: "drawRects",
	        value: function drawRects(table, canvasContext) {
	            canvasContext.clearRect(0, 0, 400, 400);
	            for (var i = 0; i < 20; i++) {
	                for (var j = 0; j < 20; j++) {
	                    if (table[i][j] === 1) canvasContext.fillRect(i * 20, j * 20, 20, 20);else canvasContext.strokeRect(i * 20, j * 20, 20, 20);
	                }
	            }
	        }
	    }]);

	    return View;
	}();

	exports.default = View;
	;

/***/ }
/******/ ]);