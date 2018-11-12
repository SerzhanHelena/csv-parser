 // @ts-ignore
 const moment = require('moment');

export class ValidateExtentions {

    public static validateLength(min:number, max:number, value:String, fieldName:string): string {
        if (value.length < min || value.length > max) {
            return "Ошибка в поле " + fieldName + ". Длина поля не входит в диапазон (" + min.toString() +  "-" + max.toString() + ")";
        }
        else return null;
    }

   public static validateRegexExpression(expression: string, value: string, fieldName: string) :string {
        let regexp = new RegExp(expression, 'g');
        // @ts-ignore
        let res = value.match(regexp);
        let length = value.length;
        if ((res == null
             ||length != res.length) && fieldName!='phone') {
            return "Ошибка в поле " + fieldName + ". Значение поля '"+value+"' не соответствует заданному формату: " + expression;
        }
        else if ((res==null || res[0].length!=length) && fieldName=='phone') {
            return "Ошибка в поле " + fieldName + ". Значение поля '"+value+"' не соответствует заданному формату: +375 29/44/25/33 *******" ;
        }
        return null;
    }

    public static validateRange(value: number, min: number, max: number, fieldName: string) {
        if(value < min || value > max) {
            return "Ошибка в поле " + fieldName + ". Значение поля не входит в диапазон (" + min.toString() + "-" + max.toString() + ")";
        }
        return null;
    }

     public static validateLengthOFDate(min:number, max:number, value:String, fieldName:string): string {
         if (value.length < min || value.length-2 > max) {
             return "Ошибка в поле " + fieldName + ". Длина поля не входит в диапазон (" + min.toString() + " - " + max.toString() + ")";
         }
         else return null;
     }

     public static validateCurrentDate (value: string, fieldName: string) {
         let today = new Date();
         let dd = today.getDate();
         let mm = today.getMonth()+1; //January is 0!
         let yyyy = today.getFullYear();

         value = value.replace('/','.').replace('-', '.');
         // @ts-ignore
         let valueDate = moment(value, "DD.MM.YYYY");
         if (!valueDate.isValid()) {
             return 'Ошибка в поле ' + fieldName + ". Неверный формат даты";
         }

         if (valueDate > today){
             return 'Ошибка в поле ' + fieldName + ". Значение поля '" + value + "' не может быть больше сегодняшней даты " + today;
         }
         return null;
     }

     public static validateEmail(value: string, fieldName: string): string {
         if (value.indexOf("@") == -1 || value.indexOf(".") == -1) {
             return "Ошибка в поле " + fieldName + ". Поле не соответствует формату";
         }
             return null;
     }


}