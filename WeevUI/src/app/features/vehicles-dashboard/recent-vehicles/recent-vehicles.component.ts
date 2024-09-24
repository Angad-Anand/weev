import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-recent-vehicles',
  templateUrl: './recent-vehicles.component.html',
  styleUrls: ['./recent-vehicles.component.scss']
})
export class RecentVehiclesComponent implements OnInit {
  twowheelerlist: Array<any> = new Array<any>();
  filteredtwowheelerlist: Array<any> = new Array<any>();

  constructor(private router: Router, public vehiclesService: VehiclesService) {
    console.log(this.router.url);
  }


  ngOnInit(): void {
    this.getTwoWheelerData();
    window.scrollTo(0, 0); // Scroll to top
  }

  getTwoWheelerData() {
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.twowheelerlist = response;
      // Limit to 8 items
      const topVariants = this.twowheelerlist.filter(item => item.variantType === "Top").slice(0, 8);
      this.filteredtwowheelerlist.push(...topVariants);
      
      for (var i = 0; i < this.filteredtwowheelerlist.length; i++) {
        this.filteredtwowheelerlist[i] = Object.assign({}, this.filteredtwowheelerlist[i], {
          selectedRating: this.filteredtwowheelerlist[i].ourRating,
          unSelectRating: 5 - this.filteredtwowheelerlist[i].ourRating
        });
      }
    });
  }  
  onSelect(twId: any) {
    // console.log(twId);
    this.router.navigate(['/Selection', twId]);
  }

}
