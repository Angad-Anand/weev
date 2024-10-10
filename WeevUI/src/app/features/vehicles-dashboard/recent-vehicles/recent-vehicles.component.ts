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
  toptwowheelerlist: Array<any> = new Array<any>();
  recenttwowheelerlist: Array<any> = new Array<any>();

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
      const topVariants = this.twowheelerlist.filter(item => item.variantType === "Top").slice(0, 7);

      this.toptwowheelerlist.push(...topVariants);

      this.recenttwowheelerlist = this.twowheelerlist.filter(item => [1,6,14,17,21,24,25,30,31,33,40].includes(item.twId)).slice(0,7);

      for (var i = 0; i < this.toptwowheelerlist.length; i++) {
        this.recenttwowheelerlist[i] = Object.assign({}, this.recenttwowheelerlist[i], {
          selectedRating: this.recenttwowheelerlist[i].ourRating,
          unSelectRating: 5 - this.recenttwowheelerlist[i].ourRating
        });
      }
      
      for (var i = 0; i < this.toptwowheelerlist.length; i++) {
        this.toptwowheelerlist[i] = Object.assign({}, this.toptwowheelerlist[i], {
          selectedRating: this.toptwowheelerlist[i].ourRating,
          unSelectRating: 5 - this.toptwowheelerlist[i].ourRating
        });
      }
    });
  }  

  onSelect(twId: any) {
    this.router.navigate(['/Selection', twId]);
  }
}
