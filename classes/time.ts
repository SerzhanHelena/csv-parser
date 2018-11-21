const twentyHours = 12;
const minTimeLength = 5;

export class time {
     public valid:boolean = true;
     public error:string = null;

     hh:number;
     mm:number;
     public value:string;
     constructor(val:string, config:any) {
         this.value = val;

         if (val.length && val.length>minTimeLength) {
             this.hh = +val.split(' ')[0].split(':')[0];
             this.mm = +val.split(' ')[0].split(':')[1];
             if (val.indexOf('PM')!=-1) {
                 this.hh+=twentyHours;
             }
         }
         else {
             this.hh = +val.split(':')[0];
             this.mm = +val.split(':')[1];
         }
            this.validateTime(config);
            this.value = this.convertToHHMMformat(this.value);
     }

     private convertToHHMMformat(val:string):string {
         let result = '';
         result = this.hh.toString().length==2 ? this.hh.toString() : '0' + this.hh;
         result += ':';
         result += this.mm.toString().length==2 ? this.mm.toString() : '0' + this.mm;
         return result;
     }

     private validateTime(config:any) {
        if (config.minHour>this.hh || config.maxHour<this.hh) {
            this.valid = false;
            this.error = "Неправилное значение часов";
        }
        if (config.minMinute>this.mm || config.maxMinute<this.mm){
            this.valid = false;
            this.error = "Неправилное значение минут";
        }
    }

 }