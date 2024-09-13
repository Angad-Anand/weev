import { Component,OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';
import { ProductListModel } from 'src/app/modules/auth/_models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehiclecolorpage',
  templateUrl: './vehiclecolorpage.component.html',
  styleUrls: ['./vehiclecolorpage.component.scss']
})
export class VehicleColorPageComponent {
  productListModel: ProductListModel | undefined;
  productID: number = 0;
  productlist: Array<ProductListModel> = new Array<ProductListModel>();
  imagePaths: string[] = [];
  currentIndex: number = 0; // {{ edit_3 }}: Track the current index of the carousel

  
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private vehiclesService: VehiclesService,
  ) { 
    this.route.params.subscribe((params) => (this.productID = params['twId']));
  }

  ngOnInit(): void {
    this.productListModel = Object.assign({}, EMPTY_Application);
    // this.imagePaths = [
    //   'assets/path/to/image1.png', 
    //   'assets/path/to/image2.png', 
    //   'assets/path/to/image3.png', 
    // ];
    if (this.productID != 0 || this.productID != undefined) {
      this.getProductDataWithID(+this.productID);
    }
  }

  getTruncatedFeatures(features: string | undefined): string {
    if (features) {
      return features.length > 20 ? features.slice(0, 50) + '...' : features;
    }
    return '';
  }

  private transformResponse(response: any): any {
    const transformedResponse: any = {};

    // Iterate over the keys in keyDisplayMap
    for (const key in this.keyDisplayMap) {
      if (response.hasOwnProperty(key)) {
        transformedResponse[key] = this.valueTransformMap[key]
          ? this.valueTransformMap[key](response[key])
          : response[key];
      }
    }

    return transformedResponse;
  }

  getProductDataWithID(productID: any) {
    this.vehiclesService
      .getProductDataWithID(productID)
      .subscribe((response) => {
        const transformedResponse = this.transformResponse(response); // Transform the response
        this.productlist = transformedResponse; // Assign transformed response
        this.productListModel = this.productlist;
        this.imagePaths = [
          this.productListModel?.path ?? '',
          "assets/images/pr4.png",
          "assets/images/pr2.png",
          "assets/images/pr2.png",
          "assets/images/pr2.png",
          "assets/images/pr2.png",
          "assets/images/pr2.png",
        ];
        console.log(this.productListModel);
      });
  }


  onDetails() {
    this.router.navigate(["/Selection", this.productID]);
  }

  prevSlide() { // {{ edit_4 }}: Method to go to the previous slide
      this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.imagePaths.length - 1;
  }

  nextSlide() { // {{ edit_5 }}: Method to go to the next slide
      this.currentIndex = (this.currentIndex < this.imagePaths.length - 1) ? this.currentIndex + 1 : 0;
  }

  private keyDisplayMap: { [key: string]: string } = {
    manufacturer: 'Manufacturer',
    model: 'Model',
    variant: 'Variant',
    variantType: 'Variant Type',
    exShowroomPrice: 'Ex Showroom Price',
    maxSpeed: 'Max Speed',
    chargingTime: 'Charging Time',
    conditionOfVehicle: 'Condition of Vehicle',
    accelration0To60kmph: 'Accelration 0-60 kmph',
    accelration0To40kmph: 'Accelration 0-40 kmph',
    category: 'Category',
    available: 'Available',
    offlineOronline: 'Offline/Online',
    bookingSite: 'Booking Site',
    bookingPrice: 'Booking Price',
    continuousPower: 'Continuous Power',
    motorPower: 'Motor Power',
    rangeOfVehicle: 'Range of Vehicle',
    batteryType: 'Battery Type',
    batteryCapacity: 'Battery Capacity',
    chargingTime0To80Perc: 'Charging Time 0-80%',
    chargingTime0To100Perc: 'Charging Time 0-100%',
    chargingAtHome: 'Charging At Home',
    noOfBatteries: 'No of Batteries',
    swappableBattery: 'Swappable Battery',
    instrumentConsole: 'Instrument Console',
    bluetoothConnectivity: 'Bluetooth Connectivity',
    navigation: 'Navigation',
    geoFencing: 'Geo Fencing',
    antiTheftAlarm: 'Anti Theft Alarm',
    usbchargingPort: 'USB Charging Port',
    underseatStorage: 'Underseat Storage',
    distanceToEmptyIndicator: 'Distance to Empty Indicator',
    chargerOutputMin: 'Charger Output Min',
    chargerOutputMax: 'Charger Output Max',
    chargingPoint: 'Charging Point',
    fastCharging: 'Fast Charging',
    fastChargingTimeUpto80Perc: 'Fast Charging Time Upto 80%',
    ridingModes: 'Riding Modes',
    additionalFeatures: 'Additional Features',
    callOrsmsalerts: 'Call/SMS Alerts',
    musicControl: 'Music Control',
    centralLocking: 'Central Locking',
    cruiseControl: 'Cruise Control',
    externalSpeakers: 'External Speakers',
    speedometer: 'Speedometer',
    tripmeter: 'Tripmeter',
    Odometer: 'Odometer',
    carryHook: 'Carry Hook',
    abstractrtificialExhaustSoundSystem:
      'Abstractrtificial Exhaust Sound System',
    internetConnectivity: 'Internet Connectivity',
    operatingSystem: 'Operating System',
    processor: 'Processor',
    mobileApplication: 'Mobile Application',
    chargingStationLocater: 'Charging Station Locater',
    gradeability: 'Gradeability',
    clock: 'Clock',
    lowBatteryIndicator: 'Low Battery Indicator',
    bodyType: 'Body Type',
    dimensionsAndCapacity: 'Dimensions And Capacity',
    bootSpace: 'Boot Space',
    width: 'Width',
    length: 'Length',
    height: 'Height',
    saddleHeight: 'Saddle Height',
    groundClearance: 'Ground Clearance',
    wheelbase: 'Wheelbase',
    kerbWeight: 'Kerb Weight',
    loadCarryingCapacity: 'Load Carrying Capacity',
    turnSignalLamp: 'Turn Signal Lamp',
    drls: 'DRLS',
    topSpeed: 'Top Speed',
    motorType: 'Motor Type',
    motorWarrantyForMonths: 'Motor Warranty For Months',
    motorWarrantyForKm: 'Motor Warranty For Km',
    driveType: 'Drive Type',
    batteryWarrantyForMonths: 'Battery Warranty For Months',
    batteryWarrantyForKm: 'Battery Warranty For Km',
    waterProofRating: 'Water Proof Rating',
    suspensionFront: 'Suspension Front',
    suspensionRear: 'Suspension Rear',
    brakesFront: 'Brakes Front',
    brakesRear: 'Brakes Rear',
    tyreSize: 'Tyre Size',
    wheelSize: 'Wheel Size',
    wheelsType: 'Wheels Type',
    ourRating: 'Our Rating',
    path: 'Path',
  };

  valueTransformMap: { [key: string]: (value: any) => string } = {
    exShowroomPrice: (value) => `₹ ${value.toLocaleString('en-IN')}`,
    maxSpeed: (value) => `${value} km/h`,
    chargingTime: (value) => `${(value / 60).toFixed(2)} hours`,
    batteryCapacity: (value) => `${value} kWh`,
    chargingTime0To80Perc: (value) =>
      `${(value / 60).toFixed(2)} hours (0-80%)`,
    chargingTime0To100Perc: (value) =>
      `${(value / 60).toFixed(2)} hours (0-100%)`,
    bookingPrice: (value) => `${value} ₹`,
    accelration0To60kmph: (value) => `${value} sec (0-60 km/h)`,
    accelration0To40kmph: (value) => `${value} sec (0-40 km/h)`,
    continuousPower: (value) => `${value} kW`,
    motorPower: (value) => `${value} kW`,
    rangeOfVehicle: (value) => `${value} km`,
    underseatStorage: (value) => `${value} liters`,
    chargerOutputMin: (value) => `${value} kW`,
    chargerOutputMax: (value) => `${value} kW`,
    gradeability: (value) => `${value} degrees`,
    width: (value) => `${value} mm`,
    length: (value) => `${value} mm`,
    height: (value) => `${value} mm`,
    saddleHeight: (value) => `${value} mm`,
    groundClearance: (value) => `${value} mm`,
    wheelbase: (value) => `${value} mm`,
    kerbWeight: (value) => `${value} kg`,
    loadCarryingCapacity: (value) => `${value} kg`,
    topSpeed: (value) => `${value} km/h`,
    motorWarrantyForMonths: (value) => `${value} months`,
    motorWarrantyForKm: (value) => `${value} km`,
    batteryWarrantyForMonths: (value) => `${value} months`,
    batteryWarrantyForKm: (value) => `${value} km`,
    // ourRating: (value) => `${value}`,
    abstractrtificialExhaustSoundSystem: (value) => `${value}`,
    drls: (value) => `${value}`,
    turnSignalLamp: (value) => `${value}`,
    internetConnectivity: (value) => `${value}`,
    bluetoothConnectivity: (value) => `${value}`,
    geoFencing: (value) => `${value}`,
    antiTheftAlarm: (value) => `${value}`,
    usbchargingPort: (value) => `${value}`,
    fastCharging: (value) => `${value}`,
    fastChargingTimeUpto80Perc: (value) => `${value}`,
    ridingModes: (value) => `${value}`,
    musicControl: (value) => `${value}`,
    externalSpeakers: (value) => `${value}`,
    centralLocking: (value) => `${value}`,
    cruiseControl: (value) => `${value}`,
    lowBatteryIndicator: (value) => `${value}`,
    waterProofRating: (value) => `${value}`,
    suspensionFront: (value) => `${value}`,
    suspensionRear: (value) => `${value}`,
    brakesFront: (value) => `${value}`,
    brakesRear: (value) => `${value}`,
    tyreSize: (value) => `${value}`,
    wheelSize: (value) => `${value}`,
    wheelsType: (value) => `${value}`,
    bodyType: (value) => `${value}`,
    dimensionsAndCapacity: (value) => `${value}`,
    bootSpace: (value) => `${value} liters`,
  };
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