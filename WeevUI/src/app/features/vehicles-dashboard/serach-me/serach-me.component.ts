import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serach-me',
  templateUrl: './serach-me.component.html',
  styleUrls: ['./serach-me.component.scss']
})
export class SerachMeComponent implements OnInit {
  show:boolean = false;
  currentValue:string="";
  tab : any = 'home';
  isShow : boolean=true;
  isShowMenu:boolean=false;
  constructor() { }
  
  ngOnInit(): void {
  }

  onClick(check:any){
    //    console.log(check);
        if(check==1){
          this.tab = 'home';
          this.isShow=true;
          this.isShowMenu=false;
        }else if(check==2){
          this.tab = 'menu1';
          this.isShow=false;
          this.isShowMenu=true;
        }
      
    }

   
}
