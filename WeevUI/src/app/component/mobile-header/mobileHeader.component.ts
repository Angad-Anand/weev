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
      this.resetLayout();// Hide suggestions when clicking outside
    }
  }

  showSuggestions() {
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.manufacturer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      suggestion.model.toLowerCase().includes(this.searchTerm.toLowerCase())||
      suggestion.variant.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(0, 10);
    this.suggestionsVisible = this.filteredSuggestions.length > 0; // Show if there are filtered suggestions
    this.suggestionTitleVisible = this.searchTerm.length === 0; // Hide title if there is input
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
      console.log(this.suggestions);
    });
  }

  selectSuggestion(twId: any) {
    this.onSelect(twId);
    this.searchTerm = ''; 
    this.hideSuggestions(); 
  }

  onSelect(twId: any) {
    this.router.navigate(['/Selection', twId]);
  }

  isSearchBoxActive: boolean = false;

  resetLayout() {
    this.renderer.setStyle(document.querySelector('.leftarea'), 'width', '15%');
    this.renderer.setStyle(document.querySelector('.leftarea'), 'display', 'flex');
    this.renderer.setStyle(document.querySelector('.rightarea'), 'width', '75%');
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

// ngOnInit(): void {
// this.token=localStorage.getItem("token");
// if(this.token =="" || this.token ==undefined){
//   this.authService.logout();
//   this.isLogin=true;
// }else{
//   this.isLogin=false;
// }
// }

// onSubmit(isLogin:boolean) {
//   if(!isLogin){
//     this.isLogin=true;
//     this.authService.logout();
//   }
// }
