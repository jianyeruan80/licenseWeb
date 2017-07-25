import { Component, OnInit,EventEmitter } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 tableDataEvent: EventEmitter<Object>;
 tableData:Object={
         "data":Array,"header":Array,"config":Object,"add":true,
         "edit":true,"del":true,"pages":true,
         "placeholder":" First Name , Last Name , Age"};
 searchArray:Array<Object>=[
       {
       "select":"1",
       "field":"status","label":"Status","data":[
       {"id":"1","value":"One"},
       {"id":"2","value":"W"},
       {"id":"3","value":"Hree"}
   ]}];

 /**************Form***************/  
store:Object={};
addressInfo:Object={};
status:string="";
isShowEvent:EventEmitter<Object>;
 /**************Delete***************/  
 delShowEvent:EventEmitter<Object>;

  constructor(public aroute:ActivatedRoute) { 
    this.isShowEvent=new  EventEmitter<Object>();
    this.delShowEvent=new EventEmitter<Object>();
    this.store["ccc"]="2";
    this.tableData["header"]=
[
{
    "title": "#",
    "flex": "0 0 50px",
    "align": "center",
    "field": "",
    

},
{
    "title": "First Name",
    "flex": "1",
    "align": "left",
    "field": "firstName"

},
{
    "title": "Last Name",
    "flex": "1",
    "align": "center",
    "field": "lastName"
},
{
    "title": "Age",
    "flex": "1",
    "align": "center",
    "field": "age"
},{

    "title": "Opera",
    "flex": "0 0 90px",
    "align": "center",
    "field": "OPERA"

}
];
this.tableData["data"]=[

    {"firstName":"222","lastName":"555","age":"12"},
    {"firstName":"333","lastName":"666","age":"132"},
    {"firstName":"111","lastName":"444","age":"12"},
    {"firstName":"222","lastName":"555","age":"12"},
    {"firstName":"333","lastName":"666","age":"132"},
    {"firstName":"111","lastName":"444","age":"12"},
    {"firstName":"222","lastName":"555","age":"12"},
    {"firstName":"333","lastName":"666","age":"132"}
 ];
 
 this.tableData["config"]={"total":100,"pageOnCount":100,"totalPage":10,"page":1,
 "searchInfo":"","searchArray":this.searchArray};
     
  }

  ngOnInit() {
  	  this.aroute.params.subscribe(params => {
              console.log(params);
           });
     // this.search(1);
  }
save(event){
  //console.log(this.store);
}
 
 search(num) {

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

/*    <fieldset ngModelGroup="name">
        <div>
          <label>Firstname:</label>
          <input type="text" name="firstname" ngModel>
        </div>
        <div>
          <label>Lastname:</label>
          <input type="text" name="lastname" ngModel>
        </div>
      </fieldset>
      <fieldset ngModelGroup="address">
        <div>
          <label>Street:</label>
          <input type="text" name="street" ngModel>
        </div>
        <div>
          <label>Zip:</label>
          <input type="text" name="zip" ngModel>
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" ngModel>
        </div>
      </fieldset>*/
    
  var tempJson={};
  tempJson['isShow']=true;
  tempJson["status"]=this.status;
  tempJson['formHeader']=[
     [
        {
         "group":"77777","flex":"1","fields":[
               {"label":"vvvv","field":"aa1","type":"input","required":"required","flex":"1","dataType":"Date"},
               {"label":"ccccc","field":"bb1","type":"input","required":"required","flex":"1"},
             ]
         }
     ],


     [
       {"label":"AAAA","field":"aa","type":"input","required":"required","flex":"0 0 100px","dataType":"Date"},
       {"label":"BBBB","field":"bb","type":"input","required":"required","flex":"1"},
       {"label":"CCCCC","field":"ccc","type":"select","flex":"","select":"2","data":[
       {"id":"1","value":"One"},
       {"id":"2","value":"W"},
       {"id":"3","value":"Hree"}
   ]},

   {"label":"ddddd","field":"ccc","type":"checkbox","flex":"1","data":[
       {"id":"1","value":"One"},
       {"id":"2","value":"W"},
       {"id":"3","value":"Hree"}
   ]}
       ]
  ];
   tempJson['data']=this.store;    
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
