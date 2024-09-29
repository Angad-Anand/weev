import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    public vehiclesService: VehiclesService,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.router.url);
    this.title = this.router.url.replace('/', '');
    // this.title.replace("/",'');
  }

  ngOnInit(): void {
    if (this.title == 'Bikes') this.getTwoWheelerData();

    window.scrollTo(0, 0); // Scroll to top
  }

  getTwoWheelerData() {
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.allTwoWheelerList = response;
      this.filterByType('all'); // Set default filter to 'all'
      // console.log(this.allTwoWheelerList);
    });

    this.vehiclesService
      .getTwoWheelerDataByType('Bike')
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
      }
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
