"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./assets/config");
var validateFunctions_1 = require("./classes/validateFunctions");
var time_1 = require("./classes/time");
// @ts-ignore
var fs = __importStar(require("fs"));
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.getData = function (filename) {
        // @ts-ignore
        return new Promise(function (resolve, reject) {
            var arr = [];
            // @ts-ignore
            var csv = require('fast-csv');
            csv.fromPath(filename + ".csv", {
                headers: true,
                strictColumnHandling: true,
                delimiter: ',',
                ignoreEmpty: true
            })
                .on('data', function (data) { return arr.push(data); })
                .on('end', function () {
                resolve(arr);
            })
                .on('error', function (error) {
                reject(error);
            });
        });
    };
    return Parser;
}());
var validItems = [];
var invalidItems = [];
var parser = new Parser();
parser.getData('../assets/Users')
    .then(function (array) {
    for (var i = 0; i < array.length; i++) {
        var res = validate(array[i]);
        if (res.valid) {
            validItems.push(res);
        }
        else {
            invalidItems.push(res);
        }
    }
    saveToDB(validItems);
    var headers = { Age: 'Age', Name: 'Name', Surname: 'Surname', Time: 'Time', DateOfReg: 'regDate', Email: 'mail', Phone: 'Phone', valid: true, errors: null };
    invalidItems.push(headers);
    saveToCSV(invalidItems);
})
    .catch(function (error) {
    console.log('все накрылось, потому что: ', error);
});
function validate(data) {
    data.valid = true;
    if (!data) {
        data.valid = false;
        return data;
    }
    var errors = {};
    data.errors = [];
    var field = 'name';
    var conf = config_1.config.csv.find(function (obj) { return obj.name === field; });
    var Res = validateFunctions_1.ValidateExtentions.validateLength(conf.minLength, conf.maxLength, data.Name, field);
    data = EvaluateRes(Res, data);
    Res = validateFunctions_1.ValidateExtentions.validateRegexExpression(conf.regExp, data.Name, field);
    data = EvaluateRes(Res, data);
    field = 'surname';
    conf = config_1.config.csv.find(function (obj) { return obj.name === field; });
    Res = validateFunctions_1.ValidateExtentions.validateLength(conf.minLength, conf.maxLength, data.Surname, field);
    data = EvaluateRes(Res, data);
    Res = validateFunctions_1.ValidateExtentions.validateRegexExpression(conf.regExp, data.Surname, field);
    data = EvaluateRes(Res, data);
    field = 'age';
    conf = config_1.config.csv.find(function (obj) { return obj.name === field; });
    Res = validateFunctions_1.ValidateExtentions.validateLength(conf.minLength, conf.maxLength, data.Age, field);
    data = EvaluateRes(Res, data);
    Res = validateFunctions_1.ValidateExtentions.validateRegexExpression(conf.regExp, data.Age, field);
    data = EvaluateRes(Res, data);
    field = 'date';
    conf = config_1.config.csv.find(function (obj) { return obj.name === field; });
    Res = validateFunctions_1.ValidateExtentions.validateLengthOFDate(conf.minLength, conf.maxLength, data.DateOfReg, field);
    data = EvaluateRes(Res, data);
    // Res = ValidateExtentions.validateDateOfReg(data.DateOfReg, field);
    // data = EvaluateRes(Res, data);
    Res = validateFunctions_1.ValidateExtentions.validateCurrentDate(data.DateOfReg, field);
    data = EvaluateRes(Res, data);
    field = 'email';
    conf = config_1.config.csv.find(function (obj) { return obj.name === field; });
    Res = validateFunctions_1.ValidateExtentions.validateEmail(data.Email, field);
    data = EvaluateRes(Res, data);
    field = 'phone';
    conf = config_1.config.csv.find(function (obj) { return obj.name === field; });
    Res = validateFunctions_1.ValidateExtentions.validateLength(conf.minLength, conf.maxLenght, data.Phone, field);
    data = EvaluateRes(Res, data);
    Res = validateFunctions_1.ValidateExtentions.validateRegexExpression(conf.regExp, data.Phone, field);
    data = EvaluateRes(Res, data);
    field = 'time';
    conf = config_1.config.csv.find(function (obj) { return obj.name === field; });
    var tm = new time_1.time(data.Time, conf);
    if (!tm.valid) {
        data.valid = false;
        data.errors.push(tm.error);
    }
    else
        data.Time = tm.value;
    if (data.valid) {
        Res = validateFunctions_1.ValidateExtentions.validateRange(+data.Age, conf.min, conf.max, field);
        data = EvaluateRes(Res, data);
    }
    return data;
}
function EvaluateRes(Res, data) {
    if (Res != null) {
        data.valid = false;
        data.errors.push(Res);
    }
    return data;
}
function saveToDB(validData) {
    if (!validData || !validData.length) {
        return;
    }
    // @ts-ignore
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'localhost',
        database: 'csv'
    });
    connection.connect(function (err) {
        if (err)
            throw err;
        console.log('CONNECTED TO DB:');
        var cnt = 0;
        validData.forEach(function (item, index) {
            var sql = "INSERT INTO persons (id, name, surname, age, email, dateofreg, time, phone) VALUES ('" + cnt + "', '" + item.Name + "','" + item.Surname + "'," + item.Age + ", '" + item.Email + "', '" + item.DateOfReg + "', '" + item.Time + "', '" + item.Phone + "')";
            cnt++;
            connection.query(sql, function (err, result) {
                if (err)
                    throw err;
                if (index === validData.length - 1) {
                    connection.end();
                }
            });
        });
        console.log(cnt + " records inserted");
    });
}
function saveToCSV(data) {
    var writer = fs.createWriteStream('../assets/invalid.csv');
    writer.write(Object.keys(data[0]).join(',') + '\n');
    data.forEach(function (item, index) {
        var arr = [];
        for (var key in item) {
            arr.push(item[key]);
        }
        writer.write(arr.join(',') + '\n');
    });
    console.log('saved ' + (data.length - 1) + ' items to csv');
}
//# sourceMappingURL=index.js.map