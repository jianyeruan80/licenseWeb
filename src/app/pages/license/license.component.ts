import { Component, OnInit,ViewChild ,Renderer, ElementRef,EventEmitter} from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
 tableDataEvent: EventEmitter<Object>;
 tableData:Object={
         "data":Array,"header":Array,"config":Object,"add":true,
         "edit":true,"del":true,"pages":true,
         "placeholder":" MerchantId,LicenseKey"};
 searchArray:Array<Object>=[];

 /**************Form***************/  
license:Object={};
status:string="";
isShowEvent:EventEmitter<Object>;
 /**************Delete***************/  
 delShowEvent:EventEmitter<Object>;

  constructor(public aroute:ActivatedRoute,private myService:MyServiceService) { 
    this.isShowEvent=new  EventEmitter<Object>();
    this.delShowEvent=new EventEmitter<Object>();
    /*this.store["ccc"]="2";*/
    this.tableData["header"]=
[
{
    "title": "#",
    "flex": "0 0 50px",
    "align": "center",
    "field": "",
    

},
{
    "title": "MerchantId",
    "flex": "0 0 130px",
    "align": "left",
    "field": "mId"

},
{
    "title": "License Key",
    "flex": "1",
    "align": "left",
    "field": "licenseKey"
},
{
    "title": "User Count",
     "flex": "0 0 100px",
    "align": "center",
    "field": "users"
},
{
    "title": "Months",
    "flex": "0 0 100px",
    "align": "center",
    "field": "months"
},

{

    "title": "Opera",
    "flex": "0 0 90px",
    "align": "center",
    "field": "OPERA"

}
];
this.tableData["data"]=[];
 
 this.tableData["config"]={"total":100,"pageOnCount":100,"totalPage":10,"page":1,
 "searchInfo":"","searchArray":this.searchArray};
     
  }
ngOnInit() {
     /* this.aroute.params.subscribe(params => {
              console.log(params);
           });*/
     this.search(1);
  }
save(event){
  //console.log(this.store);
}
 
 search(num) {
   this.myService.service("/licenses","get").subscribe(
                 data=> {
                     if(!!data){
                           console.log(data)
                           this.tableData["data"]=data;
                       /*
                        this.appGlobal.toastTime=0.5;
                        this.config["total"]=data.total;
                          this.config["totalPage"]=Math.ceil(data.total/this.config["pageOnCount"]);
                        this.customers=data.data;
                          this.pvParent.emit(this.config);
                       */
                   }}
                  
              )
}
opera(event){
      this.status=event.type;
      
       switch (this.status) {
      case "PAGE":
         this.goTo(event);
        break;
      case "DEL":
        this.isDel(event);
        break;
      default:
       this.openWin(event);
    }
}
goTo(event){
  
  console.log(event);
}

openWin(event){
  var tempJson={};
  tempJson['isShow']=true;
  tempJson["status"]=this.status;
  tempJson['formHeader']=[
     [
     {"label":"MerchantId","field":"mId","type":"input","required":"required","flex":"0 0 200px"},
     {"label":"LicenseKey","field":"licenseKey","type":"input","required":"required","flex":"1"},
     {"label":"Users","field":"users","type":"input","required":"required","flex":"0 0 120px"},
     {"label":"Months","field":"months","type":"input","required":"required","flex":"0 0 120px"}
     ]
       
  ];
  if(event.type=="ADD"){
    
  }
   tempJson['data']=event.data;    
   this.isShowEvent.emit(tempJson);
}
del(event){
   console.log("---------");
   console.log(event)
   console.log("-----------");
  this.delShowEvent.emit();
}
isDel(event){
 
 this.delShowEvent.emit(event.data);
//  console.log(event)
}


}

