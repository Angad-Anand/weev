import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface VehicleData {
  twId: number;
  manufacturer: string;
  model: string;
  variant: string;
  path?: string;
  exShowroomPrice?: number | string;
  variantType?: string;
}

export interface CompareCardData {
  imageUrl?: string;
  title?: string;
  manufacturer?: string;
  model?: string;
  variant?: string;
  variants?: string[];
  price?: string | number;
  path?: string;
  isEmpty?: boolean; 
}

@Injectable({
  providedIn: 'root',
})
export class VehicleComparisonService {
  private maxComparisons = 4;
  private vehicleCards: BehaviorSubject<CompareCardData[]> =
    new BehaviorSubject<CompareCardData[]>([]);
  private vehicleSuggestions: BehaviorSubject<VehicleData[]> =
    new BehaviorSubject<VehicleData[]>([]);

  constructor() {
    this.initializeCards();
  }

  private initializeCards(): void {
    const isDesktop = window.innerWidth > 768;
    const numCards = isDesktop ? 4 : 2;
    const emptyCards = Array(numCards)
      .fill(null)
      .map(() => ({ isEmpty: true }));
    this.vehicleCards.next(emptyCards);
  }

  getVehicleCards(): Observable<CompareCardData[]> {
    return this.vehicleCards.asObservable();
  }

  getVehicleSuggestions(): Observable<VehicleData[]> {
    return this.vehicleSuggestions.asObservable();
  }

  setVehicleSuggestions(suggestions: VehicleData[]): void {
    this.vehicleSuggestions.next(suggestions);
  }

addVehicleToComparison(vehicle: VehicleData, index: number): void {
  const currentCards = this.vehicleCards.value;

  if (index >= 0 && index < currentCards.length) {
    const updatedCards = [...currentCards];
    updatedCards[index] = {
      imageUrl: vehicle.path,
      title: `${vehicle.manufacturer} ${vehicle.model} ${vehicle.variant}`,
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      variant: vehicle.variant,
      variants: [vehicle.variantType || ''],
      price: vehicle.exShowroomPrice,
      path: vehicle.path,
      isEmpty: false,
    };

    this.vehicleCards.next(updatedCards);
  }
}

removeVehicleFromComparison(index: number): void {
  const currentCards = this.vehicleCards.value;

  if (index >= 0 && index < currentCards.length) {
    const updatedCards = [...currentCards];
    updatedCards[index] = { isEmpty: true };
    this.vehicleCards.next(updatedCards);
  }
}   

  getSelectedVehiclesCount(): number {
    return this.vehicleCards.value.filter((card) => !card.isEmpty).length;
  }

  getComparisonData(): string[] {
    return this.vehicleCards.value.map((card) => {
      if (card.isEmpty) {
        return 'NA';
      }
      return `${card.manufacturer}_${card.model}_${card.variant}`;
    });
  }

  updateCardsForScreenSize(): void {
    const isDesktop = window.innerWidth > 768;
    const numCards = isDesktop ? 4 : 2;
    const currentCards = this.vehicleCards.value;

    if (currentCards.length === numCards) {
      return; // No change needed
    }

    const newCards = Array(numCards)
      .fill(null)
      .map((_, i) => {
        if (i < currentCards.length && !currentCards[i].isEmpty) {
          return currentCards[i];
        }
        return { isEmpty: true };
      });

    this.vehicleCards.next(newCards);
  }
}
