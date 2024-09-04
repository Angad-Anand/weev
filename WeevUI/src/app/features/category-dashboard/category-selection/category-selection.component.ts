import {
  Component,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';
import { ProductListModel } from 'src/app/modules/auth/_models/product.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { DialogService } from 'src/app/modules/_services/dialog.service';
import { CustomerEnquiriesComponent } from 'src/app/component/customer-enquiries/customer-enquiries.component';
import { takeWhile } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss'],
})
export class CategorySelectionComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;

  popup = false;

  productListModel: ProductListModel | undefined;
  nextproductListModel: ProductListModel | undefined;
  nextproductlist: Array<ProductListModel> = [];
  tab: any = 'Price';
  isShowPrice: boolean = true;
  isShowSpecs: boolean = false;
  isShowUser: boolean = false;
  isShowExpert: boolean = false;
  isShowVideos: boolean = false;

  isShowOverView: boolean = false;
  isShowEngineTransmission: boolean = false;
  isShowFeatures: boolean = false;

  productID: number = 0;
  productlist: Array<ProductListModel> = new Array<ProductListModel>();
  tabs: Array<any> = new Array<any>();
  ImgName: Array<any> = new Array<any>();
  CllOutResult?: string;
  countRating: number = 5;
  selectedRating: number = 0;
  unSelectRating: number = 0;

  chargingTime: number = 0;
  range: number = 0;
  topSpeed: number = 0;
  fastChargingTime: number = 0;
  warranty: number = 0;

  constructor(
    private modal: UntypedFormBuilder,
    private route: ActivatedRoute,
    private vehiclesService: VehiclesService,
    private authService: AuthService,
    private readonly dialogService: DialogService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    this.route.params.subscribe((params) => (this.productID = params['twId']));
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.productListModel = Object.assign({}, EMPTY_Application);
    if (this.productID != 0 || this.productID != undefined) {
      this.getProductDataWithID(+this.productID);
      this.getImgNameWithID(+this.productID);
      this.getOtherModelswithID(+this.productID);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer!.nativeElement.scrollTop =
        this.myScrollContainer?.nativeElement.scrollHeight;
    } catch (err) {}
  }

  //

  getProductDataWithID(productID: any) {
    this.vehiclesService
      .getProductDataWithID(productID)
      .subscribe((response) => {
        this.productlist = response;
        this.productListModel = this.productlist;

        this.fetchData();
        this.selectedRating = this.productListModel?.ourRating ?? 0;
        this.unSelectRating = this.countRating - this.selectedRating;
        this.getTabNameWithID(productID);
      });
  }


  getOtherModelswithID(productID: any) {
    const generateRandomOffsets = (count: number, min: number, max: number) => {
      const offsets = [];
      for (let i = 0; i < count; i++) {
        const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        offsets.push(randomValue);
      }
      return offsets;
    };
  
    const offsets = generateRandomOffsets(10, 1, 27);
    
    offsets.forEach((offset) => {
      // Fetch other models
      this.vehiclesService
        .getOtherModelswithID(productID + offset)
        .subscribe((response) => {
          this.nextproductlist.push(response); // Store each response in the array
          this.nextproductListModel = response; // Update the current model
        });
    });
  
    console.log(this.nextproductlist); // Logs all product models after the loop
  }
  
  
  

  getTabNameWithID(productID: any) {
    this.vehiclesService.getTabNameWithID(productID).subscribe((response) => {
      this.tabs = response;
      if (this.tabs[0] != 'No_Result') {
        this.CllOutResult = this.productListModel?.path?.toString();
      } else {
        this.tabs[0] = 'Default';
        this.CllOutResult = 'assets/images/pr4.png';
      }
    });
  }
  getImgNameWithID(productID: any) {
    this.vehiclesService.getImgNameWithID(productID).subscribe((response) => {
      this.ImgName = response;
    });
  }

  onClickDynamic(check: any) {
    if (check != 'Default') {
      this.CllOutResult = check;
      this.CllOutResult = this.ImgName[check.toLowerCase()];
    } else {
      this.CllOutResult = 'assets/images/pr4.png';
    }
  }

  public open(modal: any): void {
    const name = { type: 'Customeenquiry', value: 'vinay' };
    this.dialogService
      .openModal('Custome Enquiry', name, CustomerEnquiriesComponent)
      .pipe(takeWhile(() => true))
      .subscribe((customeData: any) => {
        if (!!customeData) {
          console.log(customeData);
          this.authService.Customerenquiries(customeData);
        }
      });
  }

  ////////////////
  keySpecs: any[] = [];
  appFeatures: any[] = [];
  activeTab: string = 'KeySpecs';
  //keyspecs
  fetchData(): void {
    const keyspecsjson = {
      KeySpecs: [
        {
          icon: 'assets/svg/Charging Time.png',
          label: 'Charging Time',
          value: this.productListModel?.chargingTime ?? 0,
        },
        {
          icon: 'assets/svg/range.png',
          label: 'Range',
          value: this.productListModel?.rangeOfVehicle ?? 0,
        },
        {
          icon: 'assets/svg/Top Speed.png',
          label: 'Top Speed',
          value: this.productListModel?.topSpeed ?? 0,
        },
        {
          icon: 'assets/svg/Fast Charging.png',
          label: 'Fast Charging Time',
          value: this.productListModel?.fastChargingTimeUpto80Perc ?? 'N/A',
        },
        {
          icon: 'assets/svg/Warrenty.png',
          label: 'Warranty',
          value: this.productListModel?.batteryWarrantyForMonths ?? 0,
        },
      ],
      AppFeatures: [
        {
          icon: 'assets/svg/Top Speed.png',
          label: 'Top Speed',
          value: this.productListModel?.topSpeed ?? 0,
        },
        {
          icon: 'assets/svg/Fast Charging.png',
          label: 'Fast Charging Time',
          value: this.productListModel?.fastChargingTimeUpto80Perc ?? 'N/A',
        },
        {
          icon: 'assets/svg/Warrenty.png',
          label: 'Warranty',
          value: this.productListModel?.batteryWarrantyForMonths ?? 0,
        },
      ],
    };
    // console.log(keyspecsjson); 
    this.keySpecs = keyspecsjson.KeySpecs.slice(0, 5); // Limit to first 5 items
    this.appFeatures = keyspecsjson.AppFeatures.slice(0, 5); // Limit to first 5 items
    this.cd.detectChanges(); // Force change detection
  }

  onTabClick(tabId: string): void {
    this.activeTab = tabId;
  }

  //specs
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
    exShowroomPrice: (value) => `$${value} (Estimated)`,
    maxSpeed: (value) => `${value} km/h`,
    chargingTime: (value) => `${(value / 60).toFixed(2)} hours`,
    available: (value) => (value ? 'Yes' : 'No'),
    batteryCapacity: (value) => `${value} kWh`,
    chargingTime0To80Perc: (value) =>
      `${(value / 60).toFixed(2)} hours (0-80%)`,
    chargingTime0To100Perc: (value) =>
      `${(value / 60).toFixed(2)} hours (0-100%)`,
    rangeOfVehicle: (value) => `${value / 60} km`,
    fastChargingTimeUpto80Perc: (value) => `${(value / 60).toFixed(2)} hours`,
    motorPower: (value) => `${value / 60} kW`,
    motorWarrantyForMonths: (value) => `${value} months`,
    motorWarrantyForKm: (value) => `${value} km`,
    batteryWarrantyForMonths: (value) => `${value} months`,
    batteryWarrantyForKm: (value) => `${value} km`,
    width: (value) => `${value / 100} m`,
    length: (value) => `${value / 100} m`,
    height: (value) => `${value / 100} m`,
    saddleHeight: (value) => `${value / 100} m`,
    groundClearance: (value) => `${value / 100} m`,
    wheelbase: (value) => `${value / 100} m`,
    kerbWeight: (value) => `${value / 100} kg`,
    loadCarryingCapacity: (value) => `${value / 100} kg`,
    turnSignalLamp: (value) => (value ? 'Yes' : 'No'),
    drls: (value) => (value ? 'Yes' : 'No'),
    topSpeed: (value) => `${value / 60} km/h`,
    tyreSize: (value) => `${value / 100} m`,
    wheelSize: (value) => `${value / 100} m`,
    wheelsType: (value) => (value ? 'Yes' : 'No'),
    ourRating: (value) => `${value} / 5`,
    path: (value) => (value ? 'Yes' : 'No'),
    // Add more key-value transformations as needed
  };

  getProductEntries(): Array<{ key: string; value: any }> {
    return Object.entries(this.productListModel || {})
      .filter(
        ([key, value]) => value !== undefined && value !== '' && value !== null
      ) // Filter out invalid values
      .slice(0, 8)
      .map(([key, value]) => {
        const transformedValue = this.valueTransformMap[key]
          ? this.valueTransformMap[key](value) // Apply the transformation if it exists
          : value; // Use the original value if no transformation is defined

        return {
          key: this.keyDisplayMap[key] || key, // Use mapped key or original key
          value: transformedValue,
        };
      });
  }
}

const EMPTY_Application: ProductListModel = {
  tWId: 0,
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

// onClick(check: any) {
//   if (check == 1) {
//     this.tab = 'Price';
//     this.isShowPrice = true;
//     this.isShowSpecs = false;
//     this.isShowUser = false;
//     this.isShowExpert = false;
//     this.isShowVideos = false;
//     this.isShowOverView = false;
//     this.isShowEngineTransmission = false;
//     this.isShowFeatures = false;
//   } else if (check == 2) {
//     this.tab = 'Specs';
//     this.isShowPrice = false;
//     this.isShowSpecs = true;
//     this.isShowUser = false;
//     this.isShowExpert = false;
//     this.isShowVideos = false;
//     this.isShowOverView = true;
//     this.isShowEngineTransmission = false;
//     this.isShowFeatures = false;
//   } else if (check == 3) {
//     this.tab = 'User';
//     this.isShowPrice = false;
//     this.isShowSpecs = false;
//     this.isShowUser = true;
//     this.isShowExpert = false;
//     this.isShowVideos = false;
//     this.isShowOverView = false;
//     this.isShowEngineTransmission = false;
//     this.isShowFeatures = false;
//   } else if (check == 4) {
//     this.tab = 'Expert';
//     this.isShowPrice = false;
//     this.isShowSpecs = false;
//     this.isShowUser = false;
//     this.isShowExpert = true;
//     this.isShowVideos = false;
//     this.isShowOverView = false;
//     this.isShowEngineTransmission = false;
//     this.isShowFeatures = false;
//   } else if (check == 5) {
//     this.tab = 'Videos';
//     this.isShowPrice = false;
//     this.isShowSpecs = false;
//     this.isShowUser = false;
//     this.isShowExpert = false;
//     this.isShowVideos = true;
//     this.isShowOverView = false;
//     this.isShowEngineTransmission = false;
//     this.isShowFeatures = false;
//   } else if (check == 6) {
//     this.tab = 'OverView';
//     this.isShowPrice = false;
//     this.isShowSpecs = true;
//     this.isShowUser = false;
//     this.isShowExpert = false;
//     this.isShowVideos = false;
//     this.isShowOverView = true;
//     this.isShowEngineTransmission = false;
//     this.isShowFeatures = false;
//   } else if (check == 7) {
//     this.tab = 'EngineTransmission';
//     this.isShowPrice = false;
//     this.isShowSpecs = true;
//     this.isShowUser = false;
//     this.isShowExpert = false;
//     this.isShowVideos = false;
//     this.isShowOverView = false;
//     this.isShowEngineTransmission = true;
//     this.isShowFeatures = false;
//   } else if (check == 8) {
//     this.tab = 'Features';
//     this.isShowPrice = false;
//     this.isShowSpecs = true;
//     this.isShowUser = false;
//     this.isShowExpert = false;
//     this.isShowVideos = false;
//     this.isShowOverView = false;
//     this.isShowEngineTransmission = false;
//     this.isShowFeatures = true;
//   }
// }
