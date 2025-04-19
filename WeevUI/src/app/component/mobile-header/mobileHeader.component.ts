import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobileHeader.component.html',
  styleUrls: ['./mobileHeader.component.scss'],
})
export class MobileHeaderComponent implements OnInit {
  token: any;
  isLogin: boolean = false;

  suggestionsVisible: boolean = false; // Initially hidden
  suggestions: Array<any> = new Array<any>();
  filteredSuggestions: Array<any> = []; // To hold filtered suggestions
  searchTerm: string = ''; // To hold the current input value
  suggestionTitleVisible: boolean = true; // Flag to control suggestion title visibility

  constructor(
    private authService: AuthService,
    private router: Router,
    public vehiclesService: VehiclesService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getTwoWheelerData();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const searchBox = document.querySelector('.search-box');

    if (searchBox && !searchBox.contains(target)) {
      this.suggestionsVisible = false;
      this.resetLayout(); // Hide suggestions when clicking outside
    }
  }

   specificTwIds: Array<any> = [34,3,8,5,21]; 

   showSuggestions() {
    if (this.searchTerm) {
      const searchWords = this.searchTerm.toLowerCase().split(/\s+/); // Split input into words
  
      this.filteredSuggestions = this.suggestions.filter(suggestion => 
        searchWords.every(word => 
          suggestion.manufacturer.toLowerCase().includes(word) ||
          suggestion.model.toLowerCase().includes(word) ||
          suggestion.variant.toLowerCase().includes(word)
        )
      );
  
      this.suggestionsVisible = this.filteredSuggestions.length > 0;
    } else {
      this.filteredSuggestions = this.suggestions.filter(suggestion =>
        this.specificTwIds.includes(suggestion.twId)
      );
      
      this.filteredSuggestions.sort((a, b) => 
        this.specificTwIds.indexOf(a.twId) - this.specificTwIds.indexOf(b.twId)
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
      // console.log(this.suggestions);
    });
  }

  selectSuggestion(twId: any) {
    this.onSelect(twId);
    this.searchTerm = ''; 
    this.hideSuggestions(); 
  }

  onSelect(twId: any) {
    const twowheeler = this.suggestions.find(i => i.twId === twId);
    this.router.navigate(['/Selection', twowheeler.manufacturer+'_'+twowheeler.model+'_'+twowheeler.variant]);
  }

  isSearchBoxActive: boolean = false;

  resetLayout() {
    this.renderer.setStyle(document.querySelector('.leftarea'), 'width', '15%');
    this.renderer.setStyle(document.querySelector('.leftarea'), 'display', 'flex');
    this.renderer.setStyle(document.querySelector('.rightarea'), 'width', '40%');
    this.renderer.setStyle(document.querySelector('.search-box'), 'width', '100%');
  }

  onSearchBoxClick() {
    this.search();
    this.isSearchBoxActive = true; // Set to true when search box is clicked
    this.renderer.setStyle(document.querySelector('.leftarea'), 'display', 'none');
    this.renderer.setStyle(document.querySelector('.rightarea'), 'width', '100%');
    this.renderer.setStyle(document.querySelector('.search-box'), 'width', '100%');
  }
}
