import { Component, OnInit } from '@angular/core';
 import { AuthService } from 'src/app/modules/auth/_services/auth.service';
 import { Validators,FormControl, FormGroup } from '@angular/forms';
 import { emailValidator } from 'src/app/utils/email-validator.directive';
 import { onlyNumber } from 'src/app/utils/only-number.directive';
 import Validation from 'src/app/utils/validation';
 import { IUserRegistration } from 'src/app/_models/IUserRegistration.models';
 import {IUserLogin} from 'src/app/_models/IUserRegistration.models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tab : any = 'Login';
  isShowRegisteration : boolean=false;
  isShowLogin:boolean=true;

  reactiveRegisteration!: FormGroup;
  userRegistrationForm: IUserRegistration;

  reactiveLogin!: FormGroup;
  userLoginForm: IUserLogin;
 
 
  constructor(private authService: AuthService) {
    this.userRegistrationForm=Object.assign({}, EMPTY_Registration);
    this.userLoginForm=Object.assign({},Empty_Login);
    this.getLogin();
  }

  ngOnInit(): void {
    this.getLogin();
    this.reactiveRegisteration = new FormGroup({
      fullname: new FormControl(this.userRegistrationForm.fullname, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      username: new FormControl(this.userRegistrationForm.username, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),      
      email: new FormControl(this.userRegistrationForm.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        emailValidator(),
      ]),
      mobile: new FormControl(this.userRegistrationForm.mobile, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),  
        onlyNumber(),      
      ]),
      password:  new FormControl(this.userRegistrationForm.password, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]),
     
      confirmPassword: new FormControl(this.userRegistrationForm.confirmPassword, [ Validators.required]),
      acceptTerms:new FormControl(this.userRegistrationForm.acceptTerms, [ Validators.requiredTrue])
    
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    });

    this.reactiveLogin = new FormGroup({
      lusername: new FormControl(this.userLoginForm.lusername, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      lpassword:  new FormControl(this.userLoginForm.lpassword, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ])
    });

  }

  get lusername() {
    return this.reactiveLogin.get('lusername')!;
  }
  get lpassword() {
    return this.reactiveLogin.get('lpassword')!;
  }
  get fullname() {
    return this.reactiveRegisteration.get('fullname')!;
  }
  get username() {
    return this.reactiveRegisteration.get('username')!;
  }

  get mobile() {
    return this.reactiveRegisteration.get('mobile')!;
  }

  get email() {
    return this.reactiveRegisteration.get('email')!;
  }
  get password() {
    return this.reactiveRegisteration.get('password')!;
  }
  get confirmPassword() {
    return this.reactiveRegisteration.get('confirmPassword')!;
  }
  get acceptTerms() {
    return this.reactiveRegisteration.get('acceptTerms')!;
  }
  onSubmit(check:any) {
    if(check==1){
      if (this.reactiveRegisteration.invalid) {
        for (const control of Object.keys(this.reactiveRegisteration.controls)) {
          this.reactiveRegisteration.controls[control].markAsTouched();
        }
        return;
      }
  
      this.userRegistrationForm = this.reactiveRegisteration.value;
      this.userRegistrationForm.isActive=false;
      this.userRegistrationForm.roleName='Agent';
    this.getRegistration();
    }
  else if(check==2){
    if (this.reactiveLogin.invalid) {
      for (const control of Object.keys(this.reactiveLogin.controls)) {
        this.reactiveLogin.controls[control].markAsTouched();
      }
      return;
    }

    this.userLoginForm = this.reactiveLogin.value;
       this.getLogin();
  }
    
  }
  getLogin() {
    
  this.authService.login(this.userLoginForm.lusername,this.userLoginForm.lpassword);  
  }
  getRegistration() 
  {    
    
    this.authService.Register(this.userRegistrationForm);  
  }

  onClick(check:any)
  {   
  if(check==1){
  this.tab = 'Login';
  this.isShowLogin=true;
  this.isShowRegisteration=false;
  }else if(check==2){
  this.tab = 'Registration';
  this.isShowLogin=false;
  this.isShowRegisteration=true;          
   }
  }
}


const EMPTY_Registration: IUserRegistration = {
  fullname:'', 
  username:'',
  email: '',
  mobile:'',
  password: '',
  confirmPassword: '',
  acceptTerms:false,
  roleName:'',
  isActive:false
}

const Empty_Login:IUserLogin={lusername:'',lpassword: ''}