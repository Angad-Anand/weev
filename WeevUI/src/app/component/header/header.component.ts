import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token: any; 
  isLogin:boolean=false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem("token"); 
    if(this.token =="" || this.token ==undefined){
      this.authService.logout();  
      this.isLogin=true;
    }else{
      this.isLogin=false;
    }
  }

  // onSubmit(isLogin:boolean) {
  //   if(!isLogin){
  //     this.isLogin=true;
  //     this.authService.logout();       
  //   }
  // }

}
