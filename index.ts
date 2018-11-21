import {Person} from "./person";
import {config} from "./assets/config";
import {ValidateExtentions} from "./classes/validateFunctions";
import {time} from "./classes/time";

// @ts-ignore
import * as fs from 'fs';
class Parser {
    getData(filename) {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            let arr: Person [] = [];
            // @ts-ignore
            const csv = require('fast-csv');
            csv.fromPath(`${filename}.csv`, {
                headers: true,
                strictColumnHandling: true,
                delimiter: ',',
                ignoreEmpty: true
            })
                .on('data', (data: Person) => arr.push(data))
                .on('end', () => {
                    resolve(arr);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }
}

let validItems: Person[] = [];
let invalidItems: Person[] = [];
let parser = new Parser();
parser.getData('../assets/Users')
    .then((array: Person[]) => {

        for(let i = 0; i < array.length; i++){

            let res = validate(array[i]);
            if (res.valid) {
                validItems.push(res);
            }
            else {
                invalidItems.push(res);

            }
        }
        saveToDB(validItems);
        saveToCSV(invalidItems);
    })
    .catch((error) => {
        console.log('все накрылось, потому что: ', error)
    });


function validate(data: Person): Person {
    data.valid = true;
    if (!data) {
        data.valid = false;
        return data;
    }

    const errors: any = {};
    data.errors = [];

    let field = 'name';
    let conf = config.csv.find(obj => obj.name === field);
    let Res = ValidateExtentions.validateLength(conf.minLength, conf.maxLength, data.Name, field);
    data = EvaluateRes(Res, data);
    Res = ValidateExtentions.validateRegexExpression(conf.regExp, data.Name, field);
    data = EvaluateRes(Res, data);

    field = 'surname';
    conf = config.csv.find(obj => obj.name === field);
    Res = ValidateExtentions.validateLength(conf.minLength, conf.maxLength, data.Surname, field);
    data = EvaluateRes(Res, data);
    Res = ValidateExtentions.validateRegexExpression(conf.regExp, data.Surname, field);
    data = EvaluateRes(Res, data);

    field = 'age';
    conf = config.csv.find(obj => obj.name === field);
    Res = ValidateExtentions.validateLength(conf.minLength, conf.maxLength, data.Age, field);
    data = EvaluateRes(Res, data);
    Res = ValidateExtentions.validateRegexExpression(conf.regExp, data.Age, field);
    data = EvaluateRes(Res, data);

    field = 'date';
    conf = config.csv.find(obj => obj.name === field);
    Res = ValidateExtentions.validateLengthOFDate(conf.minLength, conf.maxLength, data.DateOfReg, field);
    data = EvaluateRes(Res, data);
    // Res = ValidateExtentions.validateDateOfReg(data.DateOfReg, field);
    // data = EvaluateRes(Res, data);
    Res = ValidateExtentions.validateCurrentDate(data.DateOfReg, field);
    data = EvaluateRes(Res, data);

    field = 'email';
    conf = config.csv.find(obj => obj.name === field);
    Res = ValidateExtentions.validateEmail(data.Email, field);
    data = EvaluateRes(Res, data);

    field = 'phone';
    conf = config.csv.find(obj => obj.name === field);
    Res = ValidateExtentions.validateLength(conf.minLength, conf.maxLenght, data.Phone, field);
    data = EvaluateRes(Res, data);
    Res = ValidateExtentions.validateRegexExpression(conf.regExp, data.Phone, field);
    data = EvaluateRes(Res, data);

    field = 'time';
    conf = config.csv.find(obj => obj.name === field);
    let tm = new time(data.Time, conf);
    if (!tm.valid) {
        data.valid = false;
        data.errors.push(tm.error);
    }
    else data.Time = tm.value;
    if (data.valid) {
        Res = ValidateExtentions.validateRange(+data.Age, conf.min, conf.max, field);
        data = EvaluateRes(Res, data);
    }

    return data;
}

function EvaluateRes(Res: string, data: Person): Person {
    if (Res!= null) {
        data.valid = false;
        data.errors.push(Res);
    }
    return data;
}

function saveToDB(validData: Array<Person>) {
    if (!validData || !validData.length) {
        return;
    }
    // @ts-ignore
    const mysql      = require('mysql');
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'localhost',
        database : 'csv'
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log('CONNECTED TO DB:');

        let cnt = 0;

        validData.forEach((item, index) => {
            const sql = `INSERT INTO persons (id, name, surname, age, email, dateofreg, time, phone) VALUES ('${cnt}', '${item.Name}\',\'${item.Surname}\',${item.Age}, \'${item.Email}\', \'${item.DateOfReg}\', \'${item.Time}\', \'${item.Phone}\')`;
            cnt++;
            connection.query(sql, (err, result) => {
                if (err) throw err;

                if (index === validData.length - 1) {
                    connection.end();
                }
            });
        });
        console.log(cnt + " records inserted");

    });
}

function saveToCSV(data:Person[]) {
    let writer = fs.createWriteStream('../assets/invalid.csv');
    writer.write(Object.keys(data[0]).join(',') + '\n');
    data.forEach((item, index) => {
        let arr = [];
        for (let key in item) {
            arr.push(item[key]);
        }
        writer.write(arr.join(',') + '\n');
    });
    console.log('saved '+(data.length-1)+' items to csv');
}