"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var chai_1 = require("chai");
var validateFunctions_1 = require("../classes/validateFunctions");
var time_1 = require("../classes/time");
var config_1 = require("../assets/config");
// @ts-ignore
describe('ValidateExtentions', function () {
    // @ts-ignore
    describe('validateLength', function () {
        var res = validateFunctions_1.ValidateExtentions.validateLength(2, 6, 'qwe', 'name');
        // @ts-ignore
        it('should return NUll', function () {
            chai_1.expect(null).to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateLengthError', function () {
        var res = validateFunctions_1.ValidateExtentions.validateLength(2, 6, 'qqweqwwe', 'name');
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect("Ошибка в поле name. Длина поля не входит в диапазон (2-6)").to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateRange', function () {
        var res = validateFunctions_1.ValidateExtentions.validateRange(10, 1, 100, 'name');
        // @ts-ignore
        it('should return NUll', function () {
            chai_1.expect(null).to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateRangeError', function () {
        var res = validateFunctions_1.ValidateExtentions.validateRange(10, 1, 8, 'name');
        // @ts-ignore
        it('should return Error', function () {
            chai_1.expect("Ошибка в поле name. Значение поля не входит в диапазон (1-8)").to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateRegexExpression', function () {
        var res = validateFunctions_1.ValidateExtentions.validateRegexExpression('\\+375 (29|25|44|33) \\d{7}', '+375 25 5565632', 'phone');
        // @ts-ignore
        it('should return NUll', function () {
            chai_1.expect(null).to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateRegexExpressionError', function () {
        var res = validateFunctions_1.ValidateExtentions.validateRegexExpression('\\+375 (29|25|44|33) \\d{7}', '+385 25 5565632', 'phone');
        // @ts-ignore
        it('should return Errrr', function () {
            chai_1.expect("Ошибка в поле phone. Значение поля +385 25 5565632 не соответствует заданному формату: +375 29/44/25/33 *******").to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateLengthOFDate', function () {
        var res = validateFunctions_1.ValidateExtentions.validateLengthOFDate(1, 10, '12345678', 'any');
        // @ts-ignore
        it('should return NUll', function () {
            chai_1.expect(null).to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateLengthOFDateError', function () {
        var res = validateFunctions_1.ValidateExtentions.validateLengthOFDate(1, 10, '1234561111111178', 'any');
        // @ts-ignore
        it('should return NUll', function () {
            chai_1.expect("Ошибка в поле any. Длина поля не входит в диапазон (1 - 10)").to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateCurrentDate', function () {
        var res = validateFunctions_1.ValidateExtentions.validateCurrentDate('05-03-1995', 'date');
        // @ts-ignore
        it('should null', function () {
            chai_1.expect(null).to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateCurrentDateError', function () {
        var res = validateFunctions_1.ValidateExtentions.validateCurrentDate('05-50-1995', 'date');
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect("Ошибка в поле date. Неверный формат даты").to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateEmail', function () {
        var res = validateFunctions_1.ValidateExtentions.validateEmail('qwe@qwe.qwe', 'mail');
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect(null).to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateEmailEerror', function () {
        var res = validateFunctions_1.ValidateExtentions.validateEmail('qweqwe.qwe', 'mail');
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect("Ошибка в поле mail. Поле не соответствует формату").to.equal(res);
        });
    });
    // @ts-ignore
    describe('TimeValidation', function () {
        var conf = config_1.config.csv.find(function (obj) { return obj.name === 'time'; });
        var res = new time_1.time('10:00 PM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect('22:00').to.equal(res.value);
        });
    });
    // @ts-ignore
    describe('TimeValidationAM', function () {
        var conf = config_1.config.csv.find(function (obj) { return obj.name === 'time'; });
        var res = new time_1.time('10:00 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect('10:00').to.equal(res.value);
        });
    });
    // @ts-ignore
    describe('TimeValidation', function () {
        var conf = config_1.config.csv.find(function (obj) { return obj.name === 'time'; });
        var res = new time_1.time('10:00', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect('10:00').to.equal(res.value);
        });
    });
    // @ts-ignore
    describe('TimeValidationInvalid', function () {
        var conf = config_1.config.csv.find(function (obj) { return obj.name === 'time'; });
        var res = new time_1.time('10:90 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect(false).to.equal(res.valid);
        });
    });
    // @ts-ignore
    describe('TimeValidationvalid', function () {
        var conf = config_1.config.csv.find(function (obj) { return obj.name === 'time'; });
        var res = new time_1.time('10:50 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect(true).to.equal(res.valid);
        });
    });
    // @ts-ignore
    describe('TimeValidationvalidHour', function () {
        var conf = config_1.config.csv.find(function (obj) { return obj.name === 'time'; });
        var res = new time_1.time('30:50 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect('Неправилное значение часов').to.equal(res.error);
        });
    });
    // @ts-ignore
    describe('TimeValidationvalidMinutes', function () {
        var conf = config_1.config.csv.find(function (obj) { return obj.name === 'time'; });
        var res = new time_1.time('10:80 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            chai_1.expect('Неправилное значение минут').to.equal(res.error);
        });
    });
});
//# sourceMappingURL=validateFunctionstest.js.map