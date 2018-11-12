 export class time {
     public valid:boolean = true;
     public error:string = null;

     hh:number;
     mm:number;
     public value:string;
     constructor(val:string, config:any) {
         this.value = val;

         if (val.length)
         if (val.length>5) {
             this.hh = +val.split(' ')[0].split(':')[0];
             this.mm = +val.split(' ')[0].split(':')[1];
             if (val.indexOf('PM')!=-1) {
                 this.hh+=12;
             }
         }
         else {
             this.hh = +val.split(':')[0];
             this.mm = +val.split(':')[1];
         }
            this.validateTime(config);
         this.value = this.hh.toString().length==2 ? this.hh.toString() : '0' + this.hh;
         this.value += ':';
         this.value += this.mm.toString().length==2 ? this.mm.toString() : '0' + this.mm;
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