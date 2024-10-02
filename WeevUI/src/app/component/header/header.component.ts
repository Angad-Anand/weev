import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token: any;
  isLogin: boolean = false;

  suggestionsVisible: boolean = false; // Initially hidden
  suggestions: Array<any> = new Array<any>();
  filteredSuggestions: Array<any> = []; // To hold filtered suggestions
  searchTerm: string = ''; // To hold the current input value

  constructor(
    private authService: AuthService,
    private router: Router,
    public vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.getTwoWheelerData();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const searchBox = document.querySelector('.search-box');

    if (searchBox && !searchBox.contains(target)) {
      this.suggestionsVisible = false; // Hide suggestions when clicking outside
    }
  }

  showSuggestions() {
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.manufacturer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      suggestion.model.toLowerCase().includes(this.searchTerm.toLowerCase())||
      suggestion.variant.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.suggestionsVisible = this.filteredSuggestions.length > 0; // Show if there are filtered suggestions
  }

  hideSuggestions() {
    this.suggestionsVisible = false;
  }

  search() {
    this.showSuggestions();
  }

  getTwoWheelerData() {
    const specificTwIds = [2,6,10,11,25]; // Replace with your specific twIds
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.suggestions = response
        .filter((item: any) => specificTwIds.includes(item.twId)) // Filter by specific twIds
        .slice(0, 10);
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
