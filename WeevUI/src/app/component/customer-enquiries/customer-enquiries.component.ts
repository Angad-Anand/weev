import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from 'rxjs';
import { ICustomerenquiries } from 'src/app/_models/IUserRegistration.models';
import { emailValidator } from 'src/app/utils/email-validator.directive';
import { onlyNumber } from 'src/app/utils/only-number.directive';

@Component({
  selector: 'app-customer-enquiries',
  templateUrl: './customer-enquiries.component.html',
  styleUrls: ['./customer-enquiries.component.scss']
})
export class CustomerEnquiriesComponent implements OnInit {
  public onClose!: Subject<string | null>
  title!: string;
  data!: any;
  closeBtnName!: string;
  list!: string[];
  enquiriesForm!: FormGroup;
  userForm: ICustomerenquiries;
  
  constructor(public bsModalRef: BsModalRef) { this.userForm = {} as ICustomerenquiries;}

  ngOnInit(): void {
    this.onClose = new Subject();
    this.enquiriesForm = new FormGroup({
      username: new FormControl(this.userForm.username, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(45),
      ]),      
      email: new FormControl(this.userForm.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        emailValidator(),
      ]),
      mobile: new FormControl(this.userForm.mobile, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),  
        onlyNumber(),      
      ]),
      
    });
  }
  closed() {    
    this.bsModalRef.hide();
    this.onClose.next('');
  }
  onSubmit() {
    if (this.enquiriesForm.invalid) {
      for (const control of Object.keys(this.enquiriesForm.controls)) {
        this.enquiriesForm.controls[control].markAsTouched();
      }
      return;
    }
    this.userForm = this.enquiriesForm.value;
    let data: any = this.userForm;
    this.onClose.next(data);
    this.bsModalRef.hide();
  }

  get username() {
    return this.enquiriesForm.get('username')!;
  }

  get mobile() {
    return this.enquiriesForm.get('mobile')!;
  }

  get email() {
    return this.enquiriesForm.get('email')!;
  }
}
