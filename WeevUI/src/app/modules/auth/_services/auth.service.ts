import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICustomerenquiries, IUserRegistration } from 'src/app/_models/IUserRegistration.models';
const Auth_URL = `${environment.localApiUrl}/Auth`;
const LAPI_URL = `${environment.localApiUrl}/Vehicles`;
@Injectable()
export class AuthService {
  token: any; 
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { } 

  login(Username:any, Password:any) {   
    let UserDto:any;
    UserDto ={username: "Vinay",password: "Admin"}     
    this.http.post(`${Auth_URL}/login`,  UserDto )
      .subscribe((res: any) => {
        this.token = JSON.stringify(res);
        localStorage.setItem("token", JSON.stringify(res));   
        if (this.token!=""||this.token!=undefined) {
          // logged in so return true
          this.router.navigate(['']);
      } 
      else{
        //this.router.navigate(['Login']);
      }        
      });
  }

  logout() {
    this.token = null;
    //this.router.navigateByUrl('login');
    localStorage.setItem("token", ""); 
    this.router.navigate(['Login']);
  } 

  isAuthorized() {
    // Just check if token exists
    // It not, user has never logged in current session
    return Boolean(this.token);
  }

  Register(userRegistrationForm:IUserRegistration) {   
    let UserRegister:any;
    UserRegister ={fullname: userRegistrationForm.fullname,
      username: userRegistrationForm.username,
      mobile: userRegistrationForm.mobile,
      email: userRegistrationForm.email,
      password:userRegistrationForm.password,
      isActive: userRegistrationForm.isActive,
      roleName: userRegistrationForm.roleName}     
    this.http.post(`${Auth_URL}/register`,  UserRegister )
      .subscribe((res: any) => {
        
        localStorage.setItem("registerMessage", JSON.stringify(res.Message));   
        
     
        this.router.navigate(['Login']);
             
      });
  }

  Customerenquiries(userRegistrationForm:ICustomerenquiries) {   
    let UserRegister:any;
    UserRegister ={
      username: userRegistrationForm.username,
      mobile: userRegistrationForm.mobile,
      email: userRegistrationForm.email
      }     
    this.http.post(`${LAPI_URL}/Customerenquiries`,  UserRegister )
      .subscribe((res: any) => {
        
        localStorage.setItem("CustomerenquiriesMessage", JSON.stringify(res.Message));   
        
     
        
             
      });
  }
} 