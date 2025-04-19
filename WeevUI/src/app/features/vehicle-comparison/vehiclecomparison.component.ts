import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicleComparison',
  templateUrl: './vehiclecomparison.component.html',
  styleUrls: ['./vehiclecomparison.component.scss'],
})
export class VehicleComparisonComponent implements OnInit {
  isDesktop = false;
  cards: any[] = []; // Holds card data
  showMessage = false; // To control the visibility of the message

  constructor(private router: Router) {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    // Initialize the cards array with empty objects
    this.cards = this.isDesktop ? [{}, {}, {}, {}] : [{}, {}];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isDesktop = window.innerWidth > 768;
    // Update the cards array based on screen size
    this.cards = this.isDesktop ? [{}, {}, {}, {}] : [{}, {}];
  }

  compareVehicles(): void {
    const selectedCards = this.cards.filter(card => card.title);
    if (selectedCards.length < 2) {
      this.showMessage = true;
      return;
    }
  
    // Ensure we always have exactly 4 values
    const twIds = Array(4).fill('NA').map((_, i) => {
      if (i < this.cards.length && this.cards[i].manufacturer && this.cards[i].model) {
        return `${this.cards[i].manufacturer}_${this.cards[i].model}_${this.cards[i].variant || ''}`;
      }
      return 'NA';
    });
  
    this.router.navigate(['/Compare', ...twIds]);
  }

  // Method to handle vehicle selection from CompareEmptyCard
  onVehicleSelected(vehicle: any, index: number) {
    this.cards[index] = {
      manufacturer: vehicle.manufacturer, 
      model: vehicle.model, 
      variant: vehicle.variant, 
      title: `${vehicle.manufacturer} ${vehicle.model} ${vehicle.variant}`,
      imageUrl: vehicle.path,
      price: vehicle.price,
      variants:[vehicle.variants]
    };
  }

  // Method to handle card removal
  onCardRemoved(cardData: any, index: number) {
    this.cards[index] = {}; // Reset the card to empty
  }
}