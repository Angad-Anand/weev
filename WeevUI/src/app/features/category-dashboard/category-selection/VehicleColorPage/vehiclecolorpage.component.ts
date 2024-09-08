import { Component,OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';
import { ProductListModel } from 'src/app/modules/auth/_models/product.model';

@Component({
  selector: 'app-vehiclecolorpage',
  templateUrl: './vehiclecolorpage.component.html',
  styleUrls: ['./vehiclecolorpage.component.scss']
})
export class VehicleColorPageComponent {
  productID: number = 0;

  
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe((params) => (this.productID = params['twId']));
  }

  ngOnInit(): void {
  }

  onDetails() {
    this.router.navigate(["/Selection", this.productID]);
  }
}