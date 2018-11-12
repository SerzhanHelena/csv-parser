"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var moment = require('moment');
var ValidateExtentions = /** @class */ (function () {
    function ValidateExtentions() {
    }
    ValidateExtentions.validateLength = function (min, max, value, fieldName) {
        if (value.length < min || value.length > max) {
            return "Ошибка в поле " + fieldName + ". Длина поля не входит в диапазон (" + min.toString() + "-" + max.toString() + ")";
        }
        else
            return null;
    };
    ValidateExtentions.validateRegexExpression = function (expression, value, fieldName) {
        var regexp = new RegExp(expression, 'g');
        // @ts-ignore
        var res = value.match(regexp);
        var length = value.length;
        if ((res == null
            || length != res.length) && fieldName != 'phone') {
            return "Ошибка в поле " + fieldName + ". Значение поля '" + value + "' не соответствует заданному формату: " + expression;
        }
        else if ((res == null || res[0].length != length) && fieldName == 'phone') {
            return "Ошибка в поле " + fieldName + ". Значение поля '" + value + "' не соответствует заданному формату: +375 29/44/25/33 *******";
        }
        return null;
    };
    ValidateExtentions.validateRange = function (value, min, max, fieldName) {
        if (value < min || value > max) {
            return "Ошибка в поле " + fieldName + ". Значение поля не входит в диапазон (" + min.toString() + "-" + max.toString() + ")";
        }
        return null;
    };
    ValidateExtentions.validateLengthOFDate = function (min, max, value, fieldName) {
        if (value.length < min || value.length - 2 > max) {
            return "Ошибка в поле " + fieldName + ". Длина поля не входит в диапазон (" + min.toString() + " - " + max.toString() + ")";
        }
        else
            return null;
    };
    ValidateExtentions.validateCurrentDate = function (value, fieldName) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        value = value.replace('/', '.').replace('-', '.');
        // @ts-ignore
        var valueDate = moment(value, "DD.MM.YYYY");
        if (!valueDate.isValid()) {
            return 'Ошибка в поле ' + fieldName + ". Неверный формат даты";
        }
        if (valueDate > today) {
            return 'Ошибка в поле ' + fieldName + ". Значение поля '" + value + "' не может быть больше сегодняшней даты " + today;
        }
        return null;
    };
    ValidateExtentions.validateEmail = function (value, fieldName) {
        if (value.indexOf("@") == -1 || value.indexOf(".") == -1) {
            return "Ошибка в поле " + fieldName + ". Поле не соответствует формату";
        }
        return null;
    };
    return ValidateExtentions;
}());
exports.ValidateExtentions = ValidateExtentions;
//# sourceMappingURL=validateFunctions.js.map