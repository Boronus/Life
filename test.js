import Model from "./script/mvc/model.js";

var assert = require('assert');

describe("Checking point", function() {
    it("Проверяет, какое значение должна принять точка в зависимости от количества соседей", function() {
        var model = Model();
        var tableT = [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0]
        ];
        model.putTable(tableT,5);
        assert.equal(model.checkPoint(0,0), 1,"point 0,0 +");
        assert.equal(model.checkPoint(2,2), 1,"point 2,2 +");
        assert.equal(model.checkPoint(0,4), 0,"point 0,4 -");
        assert.equal(model.checkPoint(1,3), 0,"point 1,3 -");
        assert.equal(model.checkPoint(4,4), 0,"point 4,4 -");
        assert.equal(model.checkPoint(4,2), 1,"point 4,2 +");

    });
});

describe("Checking planer", function() {
    it("Проверяет, как изменится форма планера на следующем шаге", function() {
        var model = Model();
        var tableT = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.putTable(tableT,5);
        model.stepControl();
        tableT = [
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        assert.deepEqual(model.getTable(), tableT,"First step");
        model.stepControl();
        tableT = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        assert.deepEqual(model.getTable(), tableT,"Second step");
        model.stepControl();
        tableT = [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        assert.deepEqual(model.getTable(), tableT,"Third step");
        model.stepControl();
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
        var model = Model();
        var tableT = [
            [0, 1, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.putTable(tableT,5);
        model.stepControl();
        assert.deepEqual(model.getTable(), tableT,"First object");
        tableT = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.putTable(tableT,5);
        model.stepControl();
        assert.deepEqual(model.getTable(), tableT,"Second object");
        tableT = [
            [0, 1, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        model.putTable(tableT,5);
        model.stepControl();
        assert.deepEqual(model.getTable(), tableT,"Third object");

    });
});

describe("Checking periodic", function() {
    it("Проверяет, будет ли правильно функционировать осцилятор", function() {
        var model = Model();
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
        model.putTable(tableT1,5);
        for (let i=0;i<5;i++)
        {
            model.stepControl();
            assert.deepEqual(model.getTable(), tableT2, "Odd step");
            model.stepControl();
            assert.deepEqual(model.getTable(), tableT1, "Even step");
        }
    });
});