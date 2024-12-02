import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contactForm: FormGroup;

  currentDateYear: Date = new Date();

  constructor(private fb: FormBuilder,private router: Router,) { 
    // Initialize the form with validation rules
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      remarks: [''],
    });}

  ngOnInit(): void {
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      alert('Form Submitted Successfully!');
      this.contactForm.reset(); // Reset the form after submission
    } else {
      console.log('Form Invalid', this.contactForm.errors);
      alert('Please correct the errors in the form.');
    }
  }

  // Utility getters for easy access in the template
  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get number() {
    return this.contactForm.get('number');
  }

  privacypolicy(){
    this.router.navigate(['PrivacyPolicy']);
  }

}


