import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-bikes-details',
  templateUrl: './bikes-details.component.html',
  styleUrls: ['./bikes-details.component.scss'],
})
export class BikesDetailsComponent implements OnInit {
  title: string = '';

  allTwoWheelerList: Array<any> = new Array<any>();
  bikeList: Array<any> = new Array<any>();
  scooterList: Array<any> = new Array<any>();

  filteredtwowheelerlist: Array<any> = new Array<any>();

  loading: boolean = false;
  activeFilter: string = 'all'; // Track active filter

  itemsToShow: number = 20; // Number of items to show initially
  private loadingMore: boolean = false;

  constructor(
    private router: Router,
    public vehiclesService: VehiclesService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    // console.log(this.router.url);
    this.title = this.router.url.replace('/', '');
    // this.title.replace("/",'');
  }
  brand: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log('Route parameters:', params); // Log all parameters
      this.brand = params['Brand']; // This should match the route parameter name
      console.log(`Brand received: ${this.brand}`); // Debugging line
    });
    this.getTwoWheelerData();

    window.scrollTo(0, 0); // Scroll to top
    this.loadMoreItems();
  }

  loadMoreItems() {
    this.filteredtwowheelerlist = this.filteredtwowheelerlist.slice(
      0,
      this.itemsToShow
    );
  }
  // @HostListener('window:scroll', [])
  // onScroll() {
  //   const pos =
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000; // Trigger when near bottom
  //   if (pos && !this.loadingMore) {
  //     this.loadingMore = true; // Set loading flag
  //     setTimeout(() => {
  //       this.itemsToShow += 8; // Increase the number of items to show
  //       this.loadMoreItems(); // Load more items
  //       this.loadingMore = false; // Reset loading flag
  //     }, 1000); // 1 second delay
  //   }
  // }

  getTwoWheelerData() {
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.allTwoWheelerList = response;
      if (this.title == 'Bikes') {
        this.filterByType('all');
        this.title = 'All Vehicles';
      }
      if (this.title == 'Bikes/Type/Bikes') {
        this.filterByType('bike');
        this.title = 'Bikes';
      }
      if (this.title == 'Bikes/Type/Scooters') {
        this.filterByType('scooter');
        this.title = 'Scooters';
      }
      if (this.brand) {
        this.filterByType('Brand');
        this.title = this.brand;
      }
      // console.log(this.allTwoWheelerList);
    });

    this.vehiclesService
      .getTwoWheelerDataByType('bike')
      .subscribe((response) => {
        this.bikeList = response;
        // console.log(this.bikeList);
      });

    this.vehiclesService
      .getTwoWheelerDataByType('Scooter')
      .subscribe((response) => {
        this.scooterList = response;
        // console.log(this.scooterList);
      });
  }

  filterByType(type: string) {
    this.activeFilter = type;
    this.loading = true;
    setTimeout(() => {
      this.filteredtwowheelerlist = [];
      if (type === 'all') {
        for (var i = 0; i < this.allTwoWheelerList.length; i++) {
          if (this.allTwoWheelerList[i].variantType === 'Top') {
            this.filteredtwowheelerlist.push(this.allTwoWheelerList[i]);
          }
        }
        console.log(this.filteredtwowheelerlist.length)
      } else if (type === 'bike') {
        for (var i = 0; i < this.bikeList.length; i++) {
          if (this.bikeList[i].variantType === 'Top') {
            this.filteredtwowheelerlist.push(this.bikeList[i]);
          }
        }
      } else if (type === 'scooter') {
        for (var i = 0; i < this.scooterList.length; i++) {
          if (this.scooterList[i].variantType === 'Top') {
            this.filteredtwowheelerlist.push(this.scooterList[i]);
          }
        }
      } else if (type === 'Brand') {
        for (var i = 0; i < this.allTwoWheelerList.length; i++) {
          if (this.allTwoWheelerList[i].manufacturer === this.brand) {
            this.filteredtwowheelerlist.push(this.allTwoWheelerList[i]);
          }
        }
      }
      // console.log(this.filteredtwowheelerlist);
      for (var i = 0; i < this.filteredtwowheelerlist.length; i++) {
        this.filteredtwowheelerlist[i] = Object.assign(
          {},
          this.filteredtwowheelerlist[i],
          {
            selectedRating: this.filteredtwowheelerlist[i].ourRating,
            unSelectRating: 5 - this.filteredtwowheelerlist[i].ourRating,
          }
        );
      }
      this.loading = false; // Reset loading state after filtering
      this.cd.detectChanges(); // Force change detection after navigation
    }, 500);
  }
  // manufacturer + model //exShowroomPrice //

  onSelect(twId: any) {
    this.router.navigate(['/Selection', twId]);
  }
}

// for (var i = 0; i < this.twowheelerlist.length; i++) {
//   if (this.twowheelerlist[i].variantType === "Top") {
//     this.filteredtwowheelerlist.push(this.twowheelerlist[i]);
//   }
// }
// for (var i = 0; i < this.filteredtwowheelerlist.length; i++) {
//   this.filteredtwowheelerlist[i] = Object.assign({}, this.filteredtwowheelerlist[i], {
//     selectedRating: this.filteredtwowheelerlist[i].ourRating,
//     unSelectRating: 5-this.filteredtwowheelerlist[i].ourRating
//   });
// }
