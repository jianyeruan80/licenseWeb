import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
   appGlobal = AppGlobal.getInstance();
 /*  deliveryFee:any=[];*/
   distances:any=[];
   fees:any=[];
   store:Object={};
   @ViewChild('uploadPic') uploadPic:ElementRef;
   @ViewChild('showPic') showPic:ElementRef;
   constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute) { 
       /*this.deliveryFee=[{"distance":0,"fee":0},{"distance":0,"fee":0},{"distance":0,"fee":0},{"distance":0,"fee":0},{"distance":0,"fee":0}]*/
       this.distances=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
       for(let i=0;i<100;i++){
         this.fees.push(i);
       }
       
   }
   ngOnInit() {
  	this.aRoute.params.subscribe(params => {
  				this.store= JSON.parse(JSON.stringify(this.appGlobal.storeInfo));
          console.log(this.store)
  				if(!this.store["addressInfo"]) this.store["addressInfo"]={}; 
  				

  	})
  }
addOrderTime(i,n){
  
   if(n>0){
    this.store['orderTime'][i+n]["status"]=true;
   }else{
    this.store['orderTime'][i]["status"]=false;
   } 
}  
upload(event): void {
this.show(this.showPic,event.target.name);
}
show(pic,name):void{
 let file = this.uploadPic.nativeElement.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
          var dataURL = reader.result;
          
          pic.nativeElement.src=dataURL;
}
reader.readAsDataURL(file);
this.myService.upload("/uploadPic",file,name).subscribe(
               data=> {if(!!data && !!data.key){
               	this.store[data.key]=(data.value || "");
                this.uploadPic.nativeElement=null;
               	}}
               	
                 
               );

  }
uploadPicture(){
      this.uploadPic.nativeElement.click();
  }
  save(){
  	// this.store['deliveryFee']=this.deliveryFee;
   // console.log(this.deliveryFee);
   console.log(this.store)
  		this.myService.service("/stores/"+this.store["_id"],"put",this.store).subscribe(
               data=>{this.store=(data || this.store);this.appGlobal.storeInfo=this.store;}
               
               );

  	
  }
}
