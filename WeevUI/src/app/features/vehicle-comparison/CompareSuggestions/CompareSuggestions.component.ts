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
  manufacturer: string;
  model: string;
  variant: string;
  price: string;
  image: string;
  productName: string;
}

interface SelectedVehicle {
  imageUrl: string;
  title: string;
  manufacturer: string;
  model: string;
  variant: string;
  price: string;
  productName: string;
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
  allTwoWheelerList: Array<any> = new Array<any>();
  selectedVehicles: any[] = [null, null]; 
  canCompare: boolean = false;
  emptyCardVehicles: (SelectedVehicle | null)[] = [null, null];
  showEmptyCard: boolean = true;

  constructor(private router: Router,
    public vehiclesService: VehiclesService,
  ) {}

  ngOnInit(): void {
    this.isComparePage = this.router.url.includes('Compare');
    this.getTwoWheelerData();
  }

  @ViewChild('suggestcards', { static: false }) suggestcards!: ElementRef;
  showLeftArrow = false; // Visibility of the left arrow
  showRightArrow = false; // Visibility of the right arrow

  ngAfterViewInit(): void {
    this.updateArrowVisibility(); // Check arrow visibility when the component loads
    this.assignProductNames();
  }

  getTwoWheelerData() {
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.allTwoWheelerList = response;
    });
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

  CompareThis(twId1: any, twId2: any) {
    this.router.navigate(['/Compare', twId1, twId2,'NA','NA']);
  }

  goToVehicle(vehicle:any){
    this.router.navigate(["/Selection", vehicle.manufacturer+'_'+vehicle.model+'_'+vehicle.variant]);
  }


  assignProductNames(): void {
    (['bike', 'scooter'] as const).forEach((category: 'bike' | 'scooter') => {
      this.comparisonCards[category].forEach((group) => {
        group.vehicles.forEach((vehicle) => {
          vehicle.productName =vehicle.manufacturer+"_"+vehicle.model+"_"+vehicle.variant;
        });
      });
    });
  }

  onVehicleSelected(index: number, vehicle: any) {
    this.emptyCardVehicles[index] = {
      imageUrl: vehicle.path || 'assets/images/default-vehicle.jpg',
      title: `${vehicle.manufacturer} ${vehicle.model} ${vehicle.variant}`,
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      variant: vehicle.variant,
      price: vehicle.price || 'Price not available',
      productName: `${vehicle.manufacturer}_${vehicle.model}_${vehicle.variant}`
    };
    this.updateCanCompare();
  }

  removeVehicle(index: number) {
    this.emptyCardVehicles[index] = null;
    this.updateCanCompare();
  }

  updateCanCompare() {
    this.canCompare = !!this.emptyCardVehicles[0] && !!this.emptyCardVehicles[1];
  }

  compareSelectedVehicles() {
    if (!this.canCompare) return;
    
    const twId1 = this.emptyCardVehicles[0]!.productName;
    const twId2 = this.emptyCardVehicles[1]!.productName;
    
    this.router.navigate(['/Compare', twId1, twId2, 'NA', 'NA']);
  }


  comparisonCards: {
    bike: ComparisonCard[];
    scooter: ComparisonCard[];
  } = {
    bike: [
      {
        vehicles: [
          {
            manufacturer: 'Revolt',
            model: 'RV400',
            variant: 'STD',
            price: 'Rs. 1,24,999*',
            image: 'assets/images/2W/Revolt/Images/1.jpeg',
            productName: '',
          },
          {
            manufacturer: 'Torq',
            model: 'Kratos',
            variant: 'R',
            price: 'Rs. 1,37,499*',
            image: 'assets/images/2W/Torq/Kartos/Images/1.jpeg',
            productName: '',
          },
        ],
      },
      {
        vehicles: [
          {
            manufacturer: 'Revolt',
            model: 'RV400',
            variant: 'STD',
            price: 'Rs. 1,24,999*',
            image: 'assets/images/2W/Revolt/Images/1.jpeg',
            productName: '',
          },
          {
            manufacturer: 'Kabira Mobility',
            model: 'KM 4000',
            variant: '',
            price: 'Rs. 1,37,499*',
            image: 'assets/images/2W/Kabira Mobility/KM 4000/Images/1.jpeg',
            productName: '',
          },
        ],
      },
    ],
    scooter: [
      {
        vehicles: [
          {
            manufacturer: 'Ola',
            model: 'S1 Pro',
            variant: '',
            price: 'Rs. 1,39,999*',
            image: 'assets/images/2W/ola/S1 Pro/Images/1.jpeg',
            productName: '',
          },
          {
            manufacturer: 'Bajaj',
            model: 'Chetak',
            variant: 'Premium 2023',
            price: 'Rs. 1,50,934*',
            image: 'assets/images/2W/Bajaj/Chetak Premium 2023/Images/1.jpeg',
            productName: '',
          },
        ],
      },
    ],
  };
}
