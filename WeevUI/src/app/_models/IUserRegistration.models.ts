export interface IUserRegistration {  
    fullname:string,
    username:string,
    email: string,
    mobile:string,
    password: string,
    confirmPassword: string,
    acceptTerms:boolean,
    roleName:string,
    isActive:boolean
  }


  export interface IUserLogin { 
    lusername:string,
    lpassword: string
  }

  export interface ICustomerenquiries {
    username: string;
    email: string;
    mobile: string;
  }