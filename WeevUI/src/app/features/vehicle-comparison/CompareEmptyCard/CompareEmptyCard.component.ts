import {
  Component,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'CompareEmptyCard',
  templateUrl: './CompareEmptyCard.component.html',
  styleUrls: ['./CompareEmptyCard.component.scss'],
})
export class CompareEmptyCard implements OnInit {
  @Output() vehicleSelected = new EventEmitter<any>(); // Add this line

  suggestionsVisible: boolean = false;
  suggestions: Array<any> = new Array<any>();
  filteredSuggestions: Array<any> = [];
  searchTerm: string = '';
  suggestionTitleVisible: boolean = true;

  vehicle = {
    title: '',
    manufacturer: '',
    model: '',
    variant: '',
    price: '',
    path: '',
    varients: [] as string[],
  };

  constructor(
    private router: Router,
    public vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.getTwoWheelerData();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const searchBox = document.querySelector('.comparesearchbox');

    if (searchBox && !searchBox.contains(target)) {
      this.suggestionsVisible = false;
    }
  }

  specificTwIds: Array<any> = [34, 3, 8, 5, 21];

  showSuggestions() {
    if (this.searchTerm) {
      const searchWords = this.searchTerm.toLowerCase().split(/\s+/);

      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        searchWords.every(
          (word) =>
            suggestion.manufacturer.toLowerCase().includes(word) ||
            suggestion.model.toLowerCase().includes(word) ||
            suggestion.variant.toLowerCase().includes(word)
        )
      );

      this.suggestionsVisible = this.filteredSuggestions.length > 0;
    } else {
      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        this.specificTwIds.includes(suggestion.twId)
      );

      this.filteredSuggestions.sort(
        (a, b) =>
          this.specificTwIds.indexOf(a.twId) -
          this.specificTwIds.indexOf(b.twId)
      );

      this.suggestionsVisible = this.filteredSuggestions.length > 0;
    }

    this.suggestionTitleVisible = this.searchTerm.length === 0;
  }

  hideSuggestions() {
    this.suggestionsVisible = false;
  }

  search() {
    this.showSuggestions();
  }

  getTwoWheelerData() {
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.suggestions = response.map((item: any) => item);
    });
  }

  selectSuggestion(twId: any) {
    this.onSelect(twId);
    this.vehicleSelected.emit(this.vehicle); // Emit the selected vehicle data
    this.searchTerm = '';
    this.hideSuggestions();
  }

  onSelect(twId: any) {
    const twowheeler = this.suggestions.find((i) => i.twId === twId);
    const manufacturerModel = twowheeler.manufacturer + ' ' + twowheeler.model;
    const variants = this.suggestions
      .filter(
        (item) => item.manufacturer + ' ' + item.model === manufacturerModel
      )
      .map((item) => item.variantType);
    this.vehicle = {
      title: manufacturerModel,
      manufacturer: twowheeler.manufacturer,
      model: twowheeler.model,
      variant: twowheeler.variant,
      price: twowheeler.exShowroomPrice,
      path: twowheeler.path,
      varients: variants
    };
  }
}