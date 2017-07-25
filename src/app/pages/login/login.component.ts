import { Component, OnInit,ViewContainerRef,ViewChild } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-login',
  providers: [MyServiceService,AppGlobal],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();
 
  loginForm:Object=  {};
  constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute,private storeService: LocalStorageService) { 
  }
  ngOnInit() {
          

            this.aRoute.params.subscribe(params => {
              this.myService.service("/stores/top","get").subscribe(
              data=> {

                  if(!!data){
              
                   this.loginForm["userName"]="admin";
                    this.loginForm["password"]="admin";
                    this.loginForm["mId"]=data.mId;
                    this.appGlobal.toastTime=0;
                  
                    this.storeService.set("ZONEINFO", data.zoneInfo);
                    
                    this.appGlobal.storeInfo=data;
                    }else{
                     //this.router.navigate(['']);
                     alert("NddO")
                   }
                 }
             )


           });
  }

   login(form: any): void{
     this.appGlobal.loading=true;
     this.myService.service("/admin/login","post",this.loginForm).subscribe(
               data=> {
                   if(!!data){
                    this.appGlobal.toastTime=0.5;
                     this.appGlobal.userInfo=data;
                     this.router.navigate(["index/store"] );
                   }
                 }
                
            );


  }
/*    onSelect(mobile: Mobile) {
        this._router.navigate( ['MobileDetail', { id:mobile.id }] );
    }

    isSelected(m: Mobile) { 
        return m.id === this._selectedId; 
    }*/
}
