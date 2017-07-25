import { Component, OnInit,ViewChild ,Renderer, EventEmitter,ElementRef,Input,Output} from '@angular/core';
/*import { Table } from './table';
import { Content } from './content';*/
import { FormControl } from '@angular/forms';
import {Router,ActivatedRoute}  from '@angular/router';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged"

@Component({
  selector: 'app-ng-form',
  templateUrl: './ng-form.component.html',
  styleUrls: ['./ng-form.component.css']
})
export class NgFormComponent implements OnInit {
formHeader:Object;
formData:Object;
@Input() isShowEvent:EventEmitter<Object>;
isShow:boolean=false;
bntShow:boolean=true;
@Output() saveEvent: EventEmitter<Object>;
  constructor() {
  	this.isShowEvent = new EventEmitter<Object>();
  this.saveEvent = new EventEmitter<Object>();
  	//this.isShowEvent=new EventEmitter<any>;
   }
 ngOnInit() {
    this.isShowEvent.subscribe((event) => {
       if(event.status=="VIEW"){
       	this.bntShow=false;
       }else{
       	this.bntShow=true;
       }
       this.isShow=event.isShow;
       this.formHeader=event.formHeader;
       this.formData=event.data;
      
    })
  }
  hide(){this.isShow=false}
  save(){
  	
    this.saveEvent.emit(this.formData);
  }

}
