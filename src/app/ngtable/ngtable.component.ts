import { Component, OnInit,ViewChild ,Renderer, EventEmitter,ElementRef,Input,Output} from '@angular/core';
/*import { Table } from './table';
import { Content } from './content';*/
import { FormControl } from '@angular/forms';
import {Router,ActivatedRoute}  from '@angular/router';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
@Component({
  selector: 'app-ngtable',
  templateUrl: './ngtable.component.html',
  styleUrls: ['./ngtable.component.css']
})
export class NgtableComponent implements OnInit{
 @Input() tableData:Object;
 @Output() operaEvent: EventEmitter<Object>;
 searchInfo = new FormControl();
 config:Object={"total":0,"pageOnCount":0,"totalPage":0,"page":1,"searchInfo":""};
   constructor() {
   	this.operaEvent=new EventEmitter<Object>();
  }
  ngOnInit() {
  	this.config=this.tableData["config"];
  	console.log(this.tableData)
  	this.searchInfo.valueChanges
                 .debounceTime(600)
                 .distinctUntilChanged()
                 .map(i => i).subscribe(val => {
                 console.log(val)
                   this.config["page"]=1;
                   this.config["searchInfo"]=val;
                   this.operaEvent.emit({type:"PAGE",data:this.config});
         });
  }
 public getPadding(name){
         return name=="OPERA"?"0":"10px 5px";
    }

   goPage(event){
    this.operaEvent.emit({type:"PAGE",data:event});
   }
  add(){
  	this.operaEvent.emit({type:"ADD",data:""});
  }
  edit(event,item){
  	if(event.target.className.indexOf("fa-times")!=-1){
    	this.operaEvent.emit({type:"DEL",data:item});
  	}else if(event.target.className.indexOf("fa-pencil")!=-1){
  		this.operaEvent.emit({type:"EDIT",data:item});
  	}else{
  		this.operaEvent.emit({type:"VIEW",data:item});
  	}
  	console.log(item);
  	//this.operaEvent.emit({type:"EDIT",data:item});
  }
  del(item){
  	this.operaEvent.emit({type:"DEL",data:item});
  }
  search(){
  	this.config["page"]=1;
  	this.operaEvent.emit({type:"PAGE",data:this.config});
  }
/*
 ngOnInit(): void {
   this.searchInfo.valueChanges
                 .debounceTime(600)
                 .distinctUntilChanged()
                 .map(i => i).subscribe(val => {
                     ///this.config["searchData"]["searchInfo"]=val;
                     
                    // this.search(1);
         });
   }     */         
}
