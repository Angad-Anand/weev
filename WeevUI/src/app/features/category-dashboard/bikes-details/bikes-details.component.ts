import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-bikes-details',
  templateUrl: './bikes-details.component.html',
  styleUrls: ['./bikes-details.component.scss'],
})
export class BikesDetailsComponent implements OnInit {
  title: string = '';
  twowheelerlist: Array<any> = new Array<any>();
  filteredtwowheelerlist: Array<any> = new Array<any>();

  constructor(private router: Router, public vehiclesService: VehiclesService) {
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
      this.twowheelerlist = response;
      for (var i = 0; i < this.twowheelerlist.length; i++) {
        if (this.twowheelerlist[i].variantType === "Top") {
          this.filteredtwowheelerlist.push(this.twowheelerlist[i]);          
        }
      }
      for (var i = 0; i < this.filteredtwowheelerlist.length; i++) {
        this.filteredtwowheelerlist[i] = Object.assign({}, this.filteredtwowheelerlist[i], {
          selectedRating: this.filteredtwowheelerlist[i].ourRating,
          unSelectRating: 5-this.filteredtwowheelerlist[i].ourRating
        });
      }

    });
    
  }
  // manufacturer + model //exShowroomPrice //

  onSelect(twId: any) {
    // console.log(twId);
    this.router.navigate(['/Selection', twId]);
  }
}
