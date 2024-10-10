import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';
import { ProductListModel } from 'src/app/modules/auth/_models/product.model';

@Component({
  selector: 'app-categorynavbar',
  templateUrl: './categorynavbar.component.html',
  styleUrls: ['./categorynavbar.component.scss'],
})
export class CategorynavbarComponent implements OnInit {

    @Input() activeTab: string = 'model';

  twId: number = 0;
  productID: number = 0;
  productListModel: ProductListModel | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe((params) => {
      this.productID = params['twId'];
      this.getProductDataWithID(this.productID); // Fetch data when twId changes
    });
    this.productListModel = Object.assign({}, EMPTY_Application);
    if (this.productID != 0 || this.productID != undefined) {
      this.getProductDataWithID(+this.productID);
    }
  }

  getProductDataWithID(productID: number) {
    this.vehiclesService.getProductDataWithID(productID).subscribe((data) => {
      this.productListModel = data;
    });
  }


  onModel() {
    this.twId = this.productID;
    this.router.navigate(['/Selection', this.twId]);
  }

  onSpecs() {
    this.twId = this.productID;
    this.router.navigate(['/Selection', this.twId, 'Specs']);
  }

  onVarient() {
    this.twId = this.productID;
    this.router.navigate(['/Selection', this.twId]).then(() => {
      setTimeout(() => {
        const variants_Container = document.getElementById('variantsContainer');
        if (variants_Container) {
          variants_Container.scrollIntoView({ behavior: 'smooth' });
          console.log('scrolling');
        } else {
          console.error('variantsContainer not found');
        }
      }, 510);
    });
  }

  onImages() {
    this.twId = this.productID;
    this.router.navigate(['/Selection', this.twId, 'Colors']);
    window.scrollTo(0, 0);
  }

  onColors() {
   this.twId = this.productID;
    this.router.navigate(['/Selection', this.twId, 'Colors']).then(() => {
      setTimeout(() => {
        const imageContainer = document.getElementById('image_container');
        if (imageContainer) {
          imageContainer.scrollIntoView({ behavior: 'smooth' });
          // console.log('scrolling');
        }
      }, 510); // Set timeout to 500 milliseconds
    });
  }
}

const EMPTY_Application: ProductListModel = {
  twId: 0,
  manufacturer: undefined,
  model: undefined,
  variant: undefined,
  variantType: undefined,
  exShowroomPrice: 0,
  maxSpeed: 0,
  chargingTime: 0,
  conditionOfVehicle: undefined,
  accelration0To60kmph: 0,
  accelration0To40kmph: 0,
  category: undefined,
  available: undefined,
  offlineOronline: undefined,
  bookingSite: undefined,
  bookingPrice: 0,
  continuousPower: 0,
  motorPower: 0,
  rangeOfVehicle: 0,
  batteryType: undefined,
  batteryCapacity: 0,
  chargingTime0To80Perc: 0,
  chargingTime0To100Perc: 0,
  chargingAtHome: undefined,
  noOfBatteries: 0,
  swappableBattery: undefined,
  instrumentConsole: undefined,
  bluetoothConnectivity: undefined,
  navigation: undefined,
  geoFencing: undefined,
  antiTheftAlarm: undefined,
  usbchargingPort: undefined,
  underseatStorage: 0,
  distanceToEmptyIndicator: undefined,
  chargerOutputMin: 0,
  chargerOutputMax: 0,
  chargingPoint: undefined,
  fastCharging: undefined,
  fastChargingTimeUpto80Perc: undefined,
  ridingModes: undefined,
  additionalFeatures: undefined,
  callOrsmsalerts: undefined,
  musicControl: undefined,
  centralLocking: undefined,
  cruiseControl: undefined,
  externalSpeakers: undefined,
  speedometer: undefined,
  tripmeter: undefined,
  Odometer: undefined,
  carryHook: undefined,
  abstractrtificialExhaustSoundSystem: undefined,
  internetConnectivity: undefined,
  operatingSystem: undefined,
  processor: undefined,
  mobileApplication: undefined,
  chargingStationLocater: undefined,
  gradeability: 0,
  clock: undefined,
  lowBatteryIndicator: undefined,
  bodyType: undefined,
  dimensionsAndCapacity: undefined,
  bootSpace: undefined,
  width: 0,
  length: 0,
  height: 0,
  saddleHeight: 0,
  groundClearance: 0,
  wheelbase: 0,
  kerbWeight: 0,
  loadCarryingCapacity: 0,
  turnSignalLamp: undefined,
  drls: undefined,
  topSpeed: 0,
  motorType: undefined,
  motorWarrantyForMonths: 0,
  motorWarrantyForKm: 0,
  driveType: undefined,
  batteryWarrantyForMonths: 0,
  batteryWarrantyForKm: 0,
  waterProofRating: undefined,
  suspensionFront: undefined,
  suspensionRear: undefined,
  brakesFront: undefined,
  brakesRear: undefined,
  tyreSize: undefined,
  wheelSize: undefined,
  wheelsType: undefined,
  ourRating: 0,
  path: undefined,
};
