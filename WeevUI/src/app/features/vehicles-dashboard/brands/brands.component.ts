import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }


  brands: any[] = [];
  ngOnInit(): void {
    this.http.get<any[]>('assets/json/brands.json').subscribe(data => {
      this.brands = data;
    //   console.log(this.brands);
    }); 
  }


  navigateToBrand(Brand: string) {
    console.log(`Navigating to brand: ${Brand}`); // Debugging line
    this.router.navigate(['/Bikes', Brand]); // Ensure this matches the route configuration
}

}
