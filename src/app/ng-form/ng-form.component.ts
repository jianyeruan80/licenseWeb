import { Component, OnInit,ViewChild ,Renderer, EventEmitter,ElementRef,Input,Output} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  @Input() myFormEvent: EventEmitter<any>;
  formHeader:any;
  myForm: FormGroup;
  @Output() outFormEvent: EventEmitter<any>;
  form:any=
  {
       "header":Array,"data":FormGroup,"type":"","i":Number  
  }

 constructor(private _fb: FormBuilder) { 
    this.myFormEvent = new EventEmitter<any>();
    this.outFormEvent = new EventEmitter<any>();
    this.myForm = this._fb.group({});
   
   }
 ngOnInit() {
  this.myFormEvent.subscribe(
     (event) => {
      this.formHeader=event.header;
      this.myForm = event.data;
      console.log("============777777========================");
    console.log(this.formHeader);
    console.log(this.myForm);
    console.log("=============99999999999=======================");
  },
  (error) => {
    console.log(2);
  },
  () => {
    console.log(3);
 
  }
     )

  }
 
  save(type,i){
    
  	this.form["header"]=this.formHeader;
    this.form["data"]=this.myForm;
    this.form["type"]=type;
    if(i>=0)this.form["i"]=i;
    
    this.outFormEvent.emit(this.form);
  }

}
