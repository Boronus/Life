import Model from "./script/mvc/model.js";
import View from "./script/mvc/view.js";

var assert = require('assert');

describe("Checking point", function() {
    it("Проверяет, какое значение должна принять точка в зависимости от количества соседей", function() {
        let model = new Model(5);
        model.tableB = [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0]
        ];
        assert.equal(model._checkPoint(0,0), 1,"point 0,0 +");
        assert.equal(model._checkPoint(2,2), 1,"point 2,2 +");
        assert.equal(model._checkPoint(0,4), 0,"point 0,4 -");
        assert.equal(model._checkPoint(1,3), 0,"point 1,3 -");
        assert.equal(model._checkPoint(4,4), 0,"point 4,4 -");
        assert.equal(model._checkPoint(4,2), 1,"point 4,2 +");

    });
});

describe("Checking planer", function() {
    it("Проверяет, как изменится форма планера на следующем шаге", function() {
        let model = new Model(5);
        model.tableB = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model._changeArray();
        let tableT = [
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        assert.deepEqual(model.getTable(), tableT,"First step");
        model._changeArray();
        tableT = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        assert.deepEqual(model.getTable(), tableT,"Second step");
        model._changeArray();
        tableT = [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        assert.deepEqual(model.getTable(), tableT,"Third step");
        model._changeArray();
        tableT = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ];
        assert.deepEqual(model.getTable(), tableT,"Fourth step");

    });
});

describe("Checking static", function() {
    it("Проверяет, изменится ли статичный объект на следующем шаге", function() {
        var model = new Model(5);
        var tableT = [
            [0, 1, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.tableB = tableT;
        assert.deepEqual(model.getTable(), tableT,"First object");
        tableT = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.tableB = tableT;
        assert.deepEqual(model.getTable(), tableT,"Second object");
        tableT = [
            [0, 1, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.tableB = tableT;
        assert.deepEqual(model.getTable(), tableT,"Third object");
    });
});

describe("Checking periodic", function() {
    it("Проверяет, будет ли правильно функционировать осцилятор", function() {
        var model = new Model(5);
        var tableT1 = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        var tableT2 = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.tableB = tableT1;
        for (let i=0;i<5;i++)
        {
            model._changeArray();
            assert.deepEqual(model.getTable(), tableT2, "Odd step");
            model._changeArray();
            assert.deepEqual(model.getTable(), tableT1, "Even step");
        }
    });
});
describe("View tests", function() {
    it("Проверяет отрисовку линий на старте", function() {
        var canvas = $('<canvas id="life_screen" width="400" height="400"></canvas>');
        var context = canvas.get(0).getContext('2d');
        let view = new View();
        view._drawRectsInit(context);

        var canvas2 = $('<canvas id="life_screen" width="400" height="400"></canvas>');
        var context2 = canvas2.get(0).getContext('2d');
        for (let i=0;i<20;i++) {
            for (let j=0;j<20;j++) {
                context2.strokeRect(i*20, j*20, 20, 20);
            }
        }

        assert.equal(context.hash(),context2.hash());
    });
    it("Проверяет перерисовку клеток", function() {
        var canvas = $('<canvas id="life_screen" width="400" height="400"></canvas>');
        var context = canvas.get(0).getContext('2d');
        let view = new View();
        let model = new Model();
        model.tableB[5][8]=1;
        view._drawRects(model.tableB,context);

        var canvas2 = $('<canvas id="life_screen" width="400" height="400"></canvas>');
        var context2 = canvas2.get(0).getContext('2d');
        context2.clearRect(0, 0, 400, 400);
        for (let i=0;i<20;i++) {
            for (let j=0;j<20;j++) {
                if ((i===5) && (j===8))
                    context2.fillRect(i*20, j*20, 20, 20);
                else
                    context2.strokeRect(i*20, j*20, 20, 20);
            }
        }
        assert.equal(context.hash(),context2.hash());
    });
});