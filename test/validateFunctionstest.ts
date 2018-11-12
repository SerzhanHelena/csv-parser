// @ts-ignore
import { expect } from "chai";
import {ValidateExtentions} from "../classes/validateFunctions";
import {time} from "../classes/time";
import {config} from "../assets/config";


// @ts-ignore
describe('ValidateExtentions', ()=> {
    // @ts-ignore
    describe('validateLength', ()=>{
        let res:string = ValidateExtentions.validateLength(2, 6, 'qwe', 'name');
        // @ts-ignore
        it('should return NUll', function () {
            expect(null).to.equal(res);        });    });
    // @ts-ignore
    describe('validateLengthError', ()=>{
        let res:string = ValidateExtentions.validateLength(2, 6, 'qqweqwwe', 'name');
        // @ts-ignore
        it('should Ошибка', function () {
            expect("Ошибка в поле name. Длина поля не входит в диапазон (2-6)").to.equal(res);        });    });
    // @ts-ignore
    describe('validateRange', ()=>{
        let res:string = ValidateExtentions.validateRange(10, 1,100, 'name');
        // @ts-ignore
        it('should return NUll', function () {
            expect(null).to.equal(res);        });    });
    // @ts-ignore
    describe('validateRangeError', ()=>{
        let res:string = ValidateExtentions.validateRange(10, 1,8, 'name');
        // @ts-ignore
        it('should return Error', function () {
            expect("Ошибка в поле name. Значение поля не входит в диапазон (1-8)").to.equal(res);        });    });
    // @ts-ignore
    describe('validateRegexExpression', ()=>{
        let res:string = ValidateExtentions.validateRegexExpression('\\+375 (29|25|44|33) \\d{7}', '+375 25 5565632', 'phone');
        // @ts-ignore
        it('should return NUll', function () {
            expect(null).to.equal(res);        });    });
    // @ts-ignore
    describe('validateRegexExpressionError', ()=>{
        let res:string = ValidateExtentions.validateRegexExpression('\\+375 (29|25|44|33) \\d{7}', '+385 25 5565632', 'phone');
        // @ts-ignore
        it('should return Errrr', function () {
            expect("Ошибка в поле phone. Значение поля +385 25 5565632 не соответствует заданному формату: +375 29/44/25/33 *******").to.equal(res);        });    });
    // @ts-ignore
    describe('validateLengthOFDate', ()=>{
        let res:string = ValidateExtentions.validateLengthOFDate(1,10, '12345678', 'any' );
        // @ts-ignore
        it('should return NUll', function () {
            expect(null).to.equal(res);        });    });
    // @ts-ignore
    describe('validateLengthOFDateError', ()=>{
        let res:string = ValidateExtentions.validateLengthOFDate(1,10, '1234561111111178', 'any' );
        // @ts-ignore
        it('should return NUll', function () {
            expect("Ошибка в поле any. Длина поля не входит в диапазон (1 - 10)").to.equal(res);        });    });
    // @ts-ignore
    describe('validateCurrentDate', ()=>{
        let res:string = ValidateExtentions.validateCurrentDate('05-03-1995', 'date');
        // @ts-ignore
        it('should null', function () {
            expect(null).to.equal(res);     });
    });
        // @ts-ignore
    describe('validateCurrentDateError', ()=>{
        let res:string = ValidateExtentions.validateCurrentDate('05-50-1995', 'date');
        // @ts-ignore
        it('should Ошибка', function () {
            expect("Ошибка в поле date. Неверный формат даты").to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateEmail', ()=>{
        let res:string = ValidateExtentions.validateEmail('qwe@qwe.qwe', 'mail');
        // @ts-ignore
        it('should Ошибка', function () {
            expect(null).to.equal(res);
        });
    });
    // @ts-ignore
    describe('validateEmailEerror', ()=>{
        let res:string = ValidateExtentions.validateEmail('qweqwe.qwe', 'mail');
        // @ts-ignore
        it('should Ошибка', function () {
            expect("Ошибка в поле mail. Поле не соответствует формату").to.equal(res);
        });
    });
    // @ts-ignore
    describe('TimeValidation', ()=>{
        let conf = config.csv.find(obj => obj.name === 'time');
        let res:time = new time('10:00 PM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            expect('22:00').to.equal(res.value);
        });
    });
    // @ts-ignore
    describe('TimeValidationAM', ()=>{
        let conf = config.csv.find(obj => obj.name === 'time');
        let res:time = new time('10:00 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            expect('10:00').to.equal(res.value);
        });
    });
    // @ts-ignore
    describe('TimeValidation', ()=>{
        let conf = config.csv.find(obj => obj.name === 'time');
        let res:time = new time('10:00', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            expect('10:00').to.equal(res.value);
        });
    });
    // @ts-ignore
    describe('TimeValidationInvalid', ()=>{
        let conf = config.csv.find(obj => obj.name === 'time');
        let res:time = new time('10:90 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            expect(false).to.equal(res.valid);
        });
    });
// @ts-ignore
    describe('TimeValidationvalid', ()=>{
        let conf = config.csv.find(obj => obj.name === 'time');
        let res:time = new time('10:50 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            expect(true).to.equal(res.valid);
        });
    });
// @ts-ignore
    describe('TimeValidationvalidHour', ()=>{
        let conf = config.csv.find(obj => obj.name === 'time');
        let res:time = new time('30:50 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            expect('Неправилное значение часов').to.equal(res.error);
        });
    });
    // @ts-ignore
    describe('TimeValidationvalidMinutes', ()=>{
        let conf = config.csv.find(obj => obj.name === 'time');
        let res:time = new time('10:80 AM', conf);
        // @ts-ignore
        it('should Ошибка', function () {
            expect('Неправилное значение минут').to.equal(res.error);
        });
    });

});