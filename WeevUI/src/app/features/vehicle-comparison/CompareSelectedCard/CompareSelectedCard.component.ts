import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'CompareSelectedCard',
  templateUrl: './CompareSelectedCard.component.html',
  styleUrls: ['./CompareSelectedCard.component.scss'],
})
export class CompareSelectedCard implements OnInit {
  @Input() cardData: any; // Input property to receive data from parent component
  @Output() cardRemoved = new EventEmitter<any>(); // Event emitter to notify parent component

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  goToVehicle(){
    console.log(this.cardData);
    console.log(this.cardData.manufacturer+'_'+this.cardData.model+'_'+this.cardData.variant)
    this.router.navigate(["/Selection", this.cardData.manufacturer+'_'+this.cardData.model+'_'+this.cardData.variant]);
  }

  removeCard() {
    this.cardRemoved.emit(this.cardData); // Emit the card data to the parent component
  }
}