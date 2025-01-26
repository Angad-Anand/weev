import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicleComparison',
  templateUrl: './vehiclecomparison.component.html',
  styleUrls: ['./vehiclecomparison.component.scss']
})
export class VehicleComparisonComponent implements OnInit {
  vehicles = [
    { make: '', model: '', variant: '' },
    { make: '', model: '', variant: '' },
    { make: '', model: '', variant: '' },
    { make: '', model: '', variant: '' }
  ];

  makes: string[] = ['Make1', 'Make2', 'Make3'];
  models: string[][] = [[], [], [], []];
  variants: string[][] = [[], [], [], []]; 

  constructor() {}

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  onMakeChange(index: number): void {
    // Fetch models based on the selected make
    const selectedMake = this.vehicles[index].make;
    this.models[index] = this.getModelsByMake(selectedMake); // Replace with service call if needed
    this.variants[index] = []; // Reset variants when make changes
    this.vehicles[index].model = '';
    this.vehicles[index].variant = '';
  }

  onModelChange(index: number): void {
    // Fetch variants based on the selected model
    const selectedModel = this.vehicles[index].model;
    this.variants[index] = this.getVariantsByModel(selectedModel); // Replace with service call if needed
    this.vehicles[index].variant = '';
  }

  compareVehicles(): void {
    console.log('Comparing vehicles:', this.vehicles);
    // Implement comparison logic here
  }

  getModelsByMake(make: string): string[] {
    // Replace this logic with API call
    if (make === 'Make1') return ['Model1A', 'Model1B'];
    if (make === 'Make2') return ['Model2A', 'Model2B'];
    return [];
  }

  getVariantsByModel(model: string): string[] {
    // Replace this logic with API call
    if (model === 'Model1A') return ['Variant1A1', 'Variant1A2'];
    if (model === 'Model2A') return ['Variant2A1', 'Variant2A2'];
    return [];
  }

  
}
