import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

interface Vehicle {
  brand: string;
  model: string;
  price: string;
  image: string;
  twId:number;
}

interface ComparisonCard {
  vehicles: Vehicle[];
}

@Component({
  selector: 'app-CompareSuggestions',
  templateUrl: './CompareSuggestions.component.html',
  styleUrls: ['./CompareSuggestions.component.scss'],
})
export class CompareSuggestionsComponent {
  activeType: 'bike' | 'scooter' = 'bike';
  isComparePage: boolean = false; // Variable to hold the comparison page status
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isComparePage = this.router.url.includes('Compare');
  }

  @ViewChild('suggestcards', { static: false }) suggestcards!: ElementRef;
  showLeftArrow = false; // Visibility of the left arrow
  showRightArrow = false; // Visibility of the right arrow

  ngAfterViewInit(): void {
    this.updateArrowVisibility(); // Check arrow visibility when the component loads
  }

  scroll(direction: 'left' | 'right'): void {
    const scrollContainer = this.suggestcards.nativeElement;

    // Calculate scroll amount dynamically
    const cardWidth =
      scrollContainer.querySelector('.comparison-card')?.offsetWidth || 0;
    const gap = parseFloat(getComputedStyle(scrollContainer).gap) || 0;
    const scrollAmount = cardWidth + gap;

    // Scroll in the specified direction
    const offset = direction === 'left' ? -scrollAmount : scrollAmount;

    // Update scroll position
    scrollContainer.scrollBy({ left: offset, behavior: 'smooth' });

    // Immediately update arrow visibility to prevent the delay
    this.updateArrowVisibility();

    // Recheck visibility after the scroll animation
    setTimeout(() => this.updateArrowVisibility(), 300);
  }

  updateArrowVisibility(): void {
    const scrollContainer = this.suggestcards.nativeElement;

    const maxScrollLeft =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // Check for scrollable content
    const hasScrollableContent =
      scrollContainer.scrollWidth > scrollContainer.clientWidth;

    // Update visibility of arrows
    this.showLeftArrow = hasScrollableContent && scrollContainer.scrollLeft > 0;
    this.showRightArrow =
      hasScrollableContent && scrollContainer.scrollLeft < maxScrollLeft;
  }

  setActiveType(type: 'bike' | 'scooter') {
    this.activeType = type;
    setTimeout(() => this.updateArrowVisibility(), 0);
  }

  compareRedirect() {
    this.router.navigate(['/Compare']);
  }

  CompareThis(twId1: any,twId2:any){
    this.router.navigate(['/Compare',twId1,twId2]);
  }

  comparisonCards: {
    bike: ComparisonCard[];
    scooter: ComparisonCard[];
  } = {
    bike: [
      {
        vehicles: [
          {
            brand: 'Revolt',
            model: 'RV400',
            price: 'Rs. 1,24,999*',
            image: 'assets/images/2W/Revolt/Images/1.jpeg',
            twId: 9,
          },
          {
            brand: 'Torq',
            model: 'Kratos',
            price: 'Rs. 1,37,499*',
            image: 'assets/images/2W/Torq/Kartos/Images/1.jpeg',
            twId:17
          },
        ],
      },
      {
        vehicles: [
          {
            brand: 'Revolt',
            model: 'RV400',
            price: 'Rs. 1,24,999*',
            image: 'assets/images/2W/Revolt/Images/1.jpeg',
            twId:9
          },
          {
            brand: 'Torq',
            model: 'Kratos',
            price: 'Rs. 1,37,499*',
            image: 'assets/images/2W/Torq/Kartos/Images/1.jpeg',
            twId:17
          },
        ],
      },
      {
        vehicles: [
          {
            brand: 'Revolt',
            model: 'RV400',
            price: 'Rs. 1,24,999*',
            image: 'assets/images/2W/Revolt/Images/1.jpeg',
            twId:9
          },
          {
            brand: 'Torq',
            model: 'Kratos',
            price: 'Rs. 1,37,499*',
            image: 'assets/images/2W/Torq/Kartos/Images/1.jpeg',
            twId:17
          },
        ],
      },
      {
        vehicles: [
          {
            brand: 'Revolt',
            model: 'RV400',
            price: 'Rs. 1,24,999*',
            image: 'assets/images/2W/Revolt/Images/1.jpeg',
            twId:9
          },
          {
            brand: 'Torq',
            model: 'Kratos',
            price: 'Rs. 1,37,499*',
            image: 'assets/images/2W/Torq/Kartos/Images/1.jpeg',
            twId:17
          },
        ],
      },
      {
        vehicles: [
          {
            brand: 'Revolt',
            model: 'RV400',
            price: 'Rs. 1,24,999*',
            image: 'assets/images/2W/Revolt/Images/1.jpeg',
            twId:9
          },
          {
            brand: 'Torq',
            model: 'Kratos',
            price: 'Rs. 1,37,499*',
            image: 'assets/images/2W/Torq/Kartos/Images/1.jpeg',
            twId:17
          },
        ],
      },
    ],
    scooter: [
      {
        vehicles: [
          {
            brand: 'Ola',
            model: 'S1 Pro',
            price: 'Rs. 1,39,999*',
            image: 'assets/images/2W/ola/S1 Pro/Images/1.jpeg',
            twId:3
          },
          {
            brand: 'Bajaj',
            model: 'Chetak Premium 2023',
            price: 'Rs. 1,50,934*',
            image: 'assets/images/2W/Bajaj/Chetak Premium 2023/Images/1.jpeg',
            twId:11
          },
        ],
      },
    ],
  };
}
