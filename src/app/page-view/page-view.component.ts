import { Component,ElementRef,Renderer,ViewChild,OnInit,Input,Output,EventEmitter,AfterViewInit,AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-page-view',
  styleUrls: ['./page-view.component.css'],
  templateUrl: './page-view.component.html'
  
})

export class PageViewComponent implements OnInit,AfterContentInit {
 pageViewHTML:String;
 
 @Input() config:Object={};
 @Output() goPage: EventEmitter<Object>;
 
 constructor(private elRef:ElementRef,private renderer:Renderer) { 
  this.goPage = new EventEmitter<Object>();
  }
  ngOnInit() {
    this.pageViewHTML = this.showPageCommon(this.config['page'],this.config['totalPage'],this.config['total']);
   }
  ngAfterContentInit(){
     
  }
goLink(evt){
  var target = evt.target || evt.srcElement;
  if(target.nodeName.toLowerCase() == 'a'){
    let p=(!!target.className == isNaN(target.className))?target.innerHTML:target.className;
    if(!isNaN(p)){
        this.config["page"]=parseInt(p);
        this.goPage.emit(this.config);
        this.pageViewHTML = this.showPageCommon(this.config["page"],this.config["totalPage"],this.config["total"]);

      }
   
  }
}
showPageCommon=function(page,totalPage,total) {  
       if(total<=0) return '<b>total:'+total+'</b>';
       var str = '<li><a class="active">' + page + '</a></li>';

        for (var i = 1; i <= 2; i++) {
            if (page - i > 1) {
                str = '<li><a>' + (page - i) + '</a></li> ' + str;
            }
            if (page + i < totalPage) {
                str = str + ' <li><a>' + (page + i)+'</a></li>';
            }
        }

        if (page - 3 > 1) {
            str = '<li><a>... </a></li>' + str;
        }

        if (page > 1) {
            str = '<li><a  class="'+(page - 1)+'">&laquo;</a></li><li><a>' + 1 + '</a></li> ' + str;
        }

        if (page + 3 < totalPage) {
            str = str + '<li ><a>... </a></li>';
        }

        if (page < totalPage) {
            str = str + '<li><a>' + totalPage + '</a></li><li ><a class="'+(page + 1)+'">&raquo;</a></li>';
        }

       return '<li><a><b>total:'+total+'</b></a></li>'+str;


}
}
