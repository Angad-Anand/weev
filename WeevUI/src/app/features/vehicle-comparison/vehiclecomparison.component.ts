import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';


@Component({
  selector: 'app-vehicleComparison',
  templateUrl: './vehiclecomparison.component.html',
  styleUrls: ['./vehiclecomparison.component.scss']
})
export class VehicleComparisonComponent {
  ngOnInit(): void {
    window.scroll(0,0)
  }

}
