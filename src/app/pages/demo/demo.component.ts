import { Component, OnInit,ViewChildren,EventEmitter,AfterViewInit} from '@angular/core';
import { FormArray,FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {Customer} from './customer.interface';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit,AfterViewInit {
	  myForm: FormGroup;
	  myFormEvent: EventEmitter<any>;
	  form:any={
		  	    "header":
		  	    [
			  	     {
			  	        "row":{"type":""},
			  	        "data":
			  	        	[

			   	    		{"type":"input","label":"store","field":"store","flex":"1","required":false},
			   	    		{"type":"select","label":"contact","field":"contact","flex":"1","required":false,"data":[
			   	    			{"id":"1","value":"Good"},{"id":"2","value":"Bad"}
			   	    		]},
			   	    		{"type":"input","label":"phone","field":"phone","flex":"1","required":false}
			   	    	]
			   	    },
			   	     {
			  	        "row":{"label":"name","field":"name","type":"JSON"},
			  	        "data":
			  	        	[

			   	    		{"type":"input","label":"firstName","field":"firstName","flex":"1","required":false},
			   	    		{"type":"input","label":"lastName","field":"lastName","flex":"1"}
			   	    		
			   	    	]
			   	    }
			   	    ,
			   	     {
			  	        "row":{"label":"Address Info","field":"addresses","type":"ARRAY"},
			  	        "data":[]
			   	    }
		   	    ]
		   	
	   	}
	   	
constructor(private _fb: FormBuilder) { 
  	 this.myFormEvent = new EventEmitter<any>();
 }

  ngAfterViewInit(){
  	 this.form.data=this.myForm;
     this.myFormEvent.emit(this.form);
   }
  ngOnInit() {
  	  this.myForm = this._fb.group({
	   	    store: ['test'], contact: [2], phone: ['test'],
            name: this._fb.group({
                firstName: ['33'],
                lastName: ['8000']
            }),
            addresses: this._fb.array([])
        });

   this.addAddress();
   this.addAddress();
   this.addAddress();

	   this.myForm.patchValue({ 
	   	"store": "a","contact":1, "name": { "firstName": "33", "lastName": "8000" },
	    "addresses": [ { "street": "111111111", "postcode": "1111" }, { "street": "222", "postcode": "222" } ] })
  }
    processEvent(event){
          console.log(event)
    	 switch (event.type) {
            case "+": 
                  this.addAddress();
           
           this.form.data=this.myForm;
           this.myFormEvent.emit(this.form);  
                     break;
            case "-":  this.removeAddress(event.i);
            this.form.data=this.myForm;
           this.myFormEvent.emit(this.form);  
                     break;
            case "close":   console.log(event.i)
                     break;
            
            default: console.log(event.i)
                     break;
           

        }
    }
   initHeaderAddress(){
   	return [      {"type":"input","label":"street","field":"street","flex":"1"},
			   	    		{"type":"input","label":"postcode","field":"postcode","flex":"1"}
			]
   } 
   initAddress() {
        return this._fb.group({
            street: [''],
            postcode: ['']
        });
    }

    addAddress() {

       for(var i=0;i<this.form.header.length;i++){
       	     if(this.form.header[i]['row']['field']=="addresses"){
       	     	this.form.header[i]['data'].push(this.initHeaderAddress());
       	     	break;
       	     }
       }
       const control = <FormArray>this.myForm.controls['addresses'];
       const addrCtrl = this.initAddress();
       control.push(addrCtrl);
       
    
    }
removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
        for(var j=0;j<this.form.header.length;j++){
       	     if(this.form.header[j]['row']['field']=="addresses"){
       	     	this.form.header[j]['data'].splice(i,1);
       	     	break;
       	     }
       }
    }
}
