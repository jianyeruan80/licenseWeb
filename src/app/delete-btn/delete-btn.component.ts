import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { AppGlobal } from '../app-global';
@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css']
})
export class DeleteBtnComponent implements OnInit {
 @Output() delEvent:EventEmitter<Object>;
 @Input() delShowEvent:EventEmitter<Object>;
 isShow:boolean=false;
 item:Object={};
  constructor() { 
	this.delEvent = new EventEmitter<Object>();
  this.delShowEvent = new EventEmitter<Object>();
 }
  ngOnInit() {
       this.delShowEvent.subscribe((event) => {
       if(event){
       this.isShow=true;
       this.item=event;
      }else{
        this.isShow=false;
      
      }
     })
  }
  ok(n){
    if(n==false){this.isShow=false
    }else{this.delEvent.emit(this.item)
    }
}

}