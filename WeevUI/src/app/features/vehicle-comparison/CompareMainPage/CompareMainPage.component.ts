import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-CompareMainPage',
  templateUrl: './CompareMainPage.component.html',
  styleUrls: ['./CompareMainPage.component.scss'],
})
export class CompareMainComponent implements OnInit {
  vehicleData: any = {};
  productKeys: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);

    // Access route parameters
    this.route.params.subscribe((params) => {
      const ids = window.innerWidth > 768 
        ? ['twId1', 'twId2', 'twId3', 'twId4'] 
        : ['twId1', 'twId2'];

      ids.forEach((idKey) => {
        const twId = params[idKey];
        this.vehicleData[idKey] = { model: {}, list: [] }; 
        this.getProductData(twId, idKey);
      });

      this.productKeys = Object.keys(this.vehicleData);
    });
  }

  getProductData(twId: number | null, key: string): void {
    if (!twId) return;

    this.vehiclesService.getProductDataWithID(twId).subscribe((response) => {
      this.vehicleData[key] = response;
      console.log(`${key} data:`, this.vehicleData[key]);
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
