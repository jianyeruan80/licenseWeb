import { Component, OnInit,EventEmitter} from '@angular/core';
import { HomeComponent } from '../home/home.component';
import {Router}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { AppGlobal } from '../../app-global';
import { AboutComponent } from '../about/about.component';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
appGlobal = AppGlobal.getInstance();
broadcastDel: EventEmitter<boolean>;
testList:any=[];
 constructor(private myService:MyServiceService,private router:Router, private storeService: LocalStorageService) { 
     // this.deleteBnt = new EventEmitter<boolean>();
     this.broadcastDel = new EventEmitter<boolean>();
  	 this.testList=[
  	          {"name":"a","age":1},{"name":"a1","age":2},
  	          {"name":"a3","age":1},{"name":"a4","age":2},
  	          {"name":"a5","age":1},{"name":"a6","age":2},
  	          {"name":"a7","age":1},{"name":"a8","age":2}
  	       ]
   }

  ngOnInit() {
     
  if(!this.appGlobal.userInfo["accessToken"]){
     // alert(location.pathname.split("/")[1])
      this.router.navigate(["/"]);
    }

  }
  linkTo(item){
      
  	this.router.navigate([item.url]);
  	  
  	    //,{relativeTo:this.aRoute}
    //    var json={"xx":"xx"}
  	//this.router.navigate(['/index/about/2',json]);

  }


}
