import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-vehicles-category',
  templateUrl: './vehicles-category.component.html',
  styleUrls: ['./vehicles-category.component.scss']
})
export class VehiclesCategoryComponent implements OnInit {
  twowheelerlist: Array<any> = new Array<any>();
  constructor(public vehiclesService: VehiclesService,) { }

  ngOnInit(): void {    
      
  }

  
}
