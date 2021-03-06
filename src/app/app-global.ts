
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();

    userInfo:Object={};
    storeInfo:Object={};
    navInfo:any;
    toastTime=0;
    loading:boolean=false;
    error:Object={};
    navSelect:string;
    isStaff:String="Staff";
    isDel:boolean =false;
    isPopup:boolean=false;
    isSelect:boolean =false;
    isDebug: boolean = true;
    currentPage:String="";
    server: string = this.isDebug ? "http://192.168.1.190:10086/api" : "http://service520.com:3999/api";
    picUrl: string = this.isDebug ? "http://192.168.1.190:10086/" : "http://service520.com:3999/";
    ///apiUrl: string = "/MobileApi/api";
     
    pageSize: number = 10;
    flag:boolean = true;
    constructor() {

         this.error["message"]="";
         this.error["delay"]=3;
         this.error["type"]="";//success,info,warning,error
        if (AppGlobal.instance) {
             throw new Error("error: Use AppGlobal.getInstance() replace new.");
        }
        AppGlobal.instance = this;
    }

 
    public static getInstance(): AppGlobal {
        return AppGlobal.instance;
    }


}
