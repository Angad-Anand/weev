import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomerenquiries } from 'src/app/_models/IUserRegistration.models';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { emailValidator } from 'src/app/utils/email-validator.directive';
import { onlyNumber } from 'src/app/utils/only-number.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicles-dashboard',
  templateUrl: './vehicles-dashboard.component.html',
  styleUrls: ['./vehicles-dashboard.component.scss'],
})
export class VehiclesDashboardComponent implements OnInit {
  popup = false;
  submitedPopup = false;
  reactiveForm!: FormGroup;
  userForm: ICustomerenquiries;

  constructor(private authService: AuthService, private router: Router) {
    this.userForm = {} as ICustomerenquiries;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
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

    setInterval(() => this.nextSlide(), 5000);
  }

  get username() {
    return this.reactiveForm.get('username')!;
  }

  get mobile() {
    return this.reactiveForm.get('mobile')!;
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  public getRegistration() {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.userForm = this.reactiveForm.value;

    console.info('Name:', this.userForm.username);
    console.info('mobile:', this.userForm.mobile);
    console.info('Email:', this.userForm.email);
    this.authService.Customerenquiries(this.userForm);
    this.reactiveForm.reset();
    this.popup = false;
    this.submitedPopup = true;
  }
  public open(modal: any): void {
    if (!this.popup) {
      this.popup = true;
    } else {
      this.popup = false;
    }
    this.submitedPopup = false;
  }

  public CSubmit(): void {
    this.getRegistration();
  }

  currentSlide = 0;

  carouselItems = [
    {
      title: 'Our Top Bikes',
      image: 'assets/images/ultravoillet.png',
      type: 'Bikes',
    },
    {
      title: 'Our Top Scooters',
      image: 'assets/images/ola s1 pro.png',
      type: 'Scooters',
    },
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.carouselItems.length) %
      this.carouselItems.length;
  }

  navigateToCategory(type: string) {
    this.router.navigate(['/Bikes/Type/',type]);
  }


}
