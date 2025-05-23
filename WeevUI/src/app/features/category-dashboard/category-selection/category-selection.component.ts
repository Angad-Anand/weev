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
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss'],
})
export class CategorySelectionComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;

  scrollToVariants() {
    const variants_Container = document.getElementById('variantsContainer');
    variants_Container!.scrollIntoView({ behavior: 'smooth' });
  }

  popup = false;

  productListModel: ProductListModel | undefined;
  nextproductListModel: ProductListModel | undefined;
  varientListModel: ProductListModel | undefined;
  nextproductlist: Array<ProductListModel> = [];
  varientList: Array<ProductListModel> = [];
  tab: any = 'Price';
  isShowPrice: boolean = true;
  isShowSpecs: boolean = false;
  isShowUser: boolean = false;
  isShowExpert: boolean = false;
  isShowVideos: boolean = false;

  isShowOverView: boolean = false;
  isShowEngineTransmission: boolean = false;
  isShowFeatures: boolean = false;

  twId: number = 0;
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
  title: string = '';
  loading: boolean = false; // Add loading state
  loadingTimeout: any;
  productName: string = '';
  twowheelerlist: Array<any> = [];
  variantsList: number[] = [];

  constructor(
    private modal: UntypedFormBuilder,
    private route: ActivatedRoute,
    private vehiclesService: VehiclesService,
    private authService: AuthService,
    private readonly dialogService: DialogService,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.startLoading();
    this.scrollToBottom();
    this.route.params.subscribe((params) => {
      this.productName = params['twId'];
      this.getTwoWheelerDatas();
    });
  }

  getTwoWheelerDatas() {
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.twowheelerlist = response;
      const twowheeler = this.twowheelerlist.find(
        (i) =>
          i.manufacturer + '_' + i.model + '_' + i.variant === this.productName
      );
      this.productID = twowheeler.twId;
      this.scrollToBottom();
      this.productListModel = Object.assign({}, EMPTY_Application);
      if (this.productID != 0 || this.productID != undefined) {
        this.productlist = twowheeler;
        this.productListModel = this.transformResponse(this.productlist);
        this.fetchData();
        this.selectedRating = this.productListModel?.ourRating ?? 0;
        this.unSelectRating = this.countRating - this.selectedRating;
        this.getTabNameWithID(this.productID);
        this.getOtherModelswithID(+this.productID);
        this.getAllTabNameWithID(+this.productID);
        // this.getTwoWheelerData();
        // this.getforVarientsData();

        this.variantsList = this.twowheelerlist
          .filter((item) => item.model === this.productListModel?.model)
          .map((item) => item.twId);

        // Fetch variant data once variantsList is populated
        if (this.variantsList.length > 0) {
          this.getforVarientsData();
        }
      }
    });
  }

  startLoading() {
    this.loading = true;
    this.loadingTimeout = setTimeout(() => {
      this.loading = false;
      this.cd.detectChanges(); // Force change detection after navigation
    }, 500);
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

  // getProductDataWithID(productID: any) {
  //   this.vehiclesService
  //     .getProductDataWithID(productID)
  //     .subscribe((response) => {
  //       const transformedResponse = this.transformResponse(response); // Transform the response
  //       this.productlist = transformedResponse; // Assign transformed response
  //       this.productListModel = this.productlist;
  //       // console.log(this.productListModel);
  //       this.fetchData();
  //       this.selectedRating = this.productListModel?.ourRating ?? 0;
  //       this.unSelectRating = this.countRating - this.selectedRating;
  //       this.getTabNameWithID(productID);
  //     });
  // }

  // getTwoWheelerData() {
  //   this.vehiclesService.getTwoWheelerData().subscribe((response) => {
  //     this.twowheelerlist = response;

  //     // Merge objects into one with multiple props
  //   });
  // }

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

  getforVarientsData() {
    // console.log(this.variantsList);

    // Ensure variant list is processed sequentially
    this.variantsList.forEach((variantId) => {
      this.vehiclesService
        .getProductDataWithID(variantId)
        .subscribe((response) => {
          const transformedResponse = this.transformResponse(response);
          this.varientList.push(transformedResponse); // Store transformed response
        });
    });
  }

  onVarientClick(item: any) {
    this.loading = true;
    // console.log(this.twowheelerlist);
    const twowheeler = this.twowheelerlist.find(
      (i) =>
        // console.log(i.twid);
        i.twId === item
    );
    const vehicle =
      twowheeler.manufacturer +
      '_' +
      twowheeler.model +
      '_' +
      twowheeler.variant;
    console.log(vehicle);
    this.varientList = [];

    window.scrollTo(0, 0);
    setTimeout(() => {
      this.router.navigate(['/Selection', vehicle]).then(() => {
        this.loading = false;
        this.cd.detectChanges();
      });
    }, 510);
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
        .getOtherModelswithID(offset)
        .subscribe((response) => {
          this.nextproductlist.push(response); // Store each response in the array
          this.nextproductListModel = response; // Update the current model
        });
    });

    // console.log(this.nextproductlist);
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
    const productName = this.productName.replace(/_/g, ' ');
    this.dialogService
      .openModal(
        'Interested in ' + productName,
        name,
        CustomerEnquiriesComponent
      )
      .pipe(takeWhile(() => true))
      .subscribe((customeData: any) => {
        if (!!customeData) {
          // console.log(customeData);

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
          value: this.productListModel?.chargingTime ?? 'N/A',
        },
        {
          icon: 'assets/svg/range.png',
          label: 'Range',
          value: this.productListModel?.rangeOfVehicle ?? 'N/A',
        },
        {
          icon: 'assets/svg/Top Speed.png',
          label: 'Top Speed',
          value: this.productListModel?.topSpeed ?? 'N/A',
        },
        {
          icon: 'assets/svg/Fast Charging.png',
          label: 'Fast Charging Time',
          value: this.productListModel?.fastChargingTimeUpto80Perc ?? 'N/A',
        },
        {
          icon: 'assets/svg/Warrenty.png',
          label: 'Warranty',
          value: this.productListModel?.batteryWarrantyForMonths ?? 'N/A',
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
          value: this.productListModel?.batteryWarrantyForMonths ?? 'N/A',
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
  getProductSpecs(): Array<{ key: string; value: any }> {
    const selectedKeys = [
      'rangeOfVehicle', // Range
      'maxSpeed', // Max Speed
      'chargingTime', // Charging Time
      'noOfBatteries', // No. Of Batteries
      'batteryCapacity', // Battery Capacity
      'motorPower', // Motor Power (w)
      'fastCharging', // Fast Charging
      'swappableBattery', // Swappable Battery
      'tyreSize', // Tubeless Tyre
    ];

    return selectedKeys
      .map((key) => {
        const value = this.productListModel?.[key as keyof ProductListModel];
        return value !== undefined && value !== '' && value !== null
          ? {
              key: this.keyDisplayMap[key] || key, // Use mapped key or original key
              value: value, // Use the transformed value directly
            }
          : null;
      })
      .filter((item): item is { key: string; value: any } => item !== null); // Type guard to filter out null values
  }

  //Features
  getProductFeatures(): Array<{ key: string; value: any }> {
    const selectedKeys = [
      'instrumentConsole', // Range
      'bluetoothConnectivity', // Max Speed
      'navigation', // Charging Time
      'antiTheftAlarm', // No. Of Batteries
      'usbchargingPort', // Battery Capacity
      'lowBatteryIndicator', // Motor Power (w)
      'ridingModes', // Fast Charging
      'underseatStorage', // Swappable Battery
      'waterProofRating', // Tubeless Tyre
    ];

    return selectedKeys
      .map((key) => {
        const value = this.productListModel?.[key as keyof ProductListModel];
        return value !== undefined && value !== '' && value !== null
          ? {
              key: this.keyDisplayMap[key] || key, // Use mapped key or original key
              value: value, // Use the transformed value directly
            }
          : null;
      })
      .filter((item): item is { key: string; value: any } => item !== null); // Type guard to filter out null values
  }

  imageCount: number = 0;
  getAllTabNameWithID(productID: any) {
    this.vehiclesService
      .getAllTabNameWithID(productID)
      .subscribe((response) => {
        this.imageCount = response.length;
        // console.log(this.imageCount);
      });
  }

  colorCount: number = 0;
  getTabNameWithID(productID: any) {
    this.vehiclesService.getTabNameWithID(productID).subscribe((response) => {
      this.colorCount = response.length;
      // console.log(this.colorCount);
    });
  }

  onImages() {
    this.twId = this.productID;
    this.router.navigate(['/Selection', this.productName, 'Colors']);
    window.scrollTo(0, 0);
  }

  onColors() {
    this.twId = this.productID;
    //vinay
    this.router
      .navigate(['/Selection', this.productName, 'Colors'])
      .then(() => {
        setTimeout(() => {
          const imageContainer = document.getElementById('image_container');
          if (imageContainer) {
            imageContainer.scrollIntoView({ behavior: 'smooth' });
            // console.log('scrolling');
          }
        }, 510); // Set timeout to 500 milliseconds
      });

    // this.router.navigate(['/Selection', this.twId, 'Colors']).then(() => {
    //   setTimeout(() => {
    //     const imageContainer = document.getElementById('image_container');
    //     if (imageContainer) {
    //       imageContainer.scrollIntoView({ behavior: 'smooth' });
    //       // console.log('scrolling');
    //     }
    //   }, 510); // Set timeout to 500 milliseconds
    // });
  }
  onSpecs() {
    this.twId = this.productID;
    this.router.navigate(['/Selection', this.productName, 'Specs']);
  }

  private keyDisplayMap: { [key: string]: string } = {
    twId: 'twId',
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
    exShowroomPrice: (value) =>
      value === 'NA' ? value : `₹ ${value.toLocaleString('en-IN')}`,
    maxSpeed: (value) => (value === 'NA' ? value : `${value} km/h`),
    chargingTime: (value) =>
      value === 'NA' ? value : `${(value / 60).toFixed(2)} hours`,
    batteryCapacity: (value) => (value === 'NA' ? value : `${value} kWh`),
    chargingTime0To80Perc: (value) =>
      value === 'NA' ? value : `${(value / 60).toFixed(2)} hours (0-80%)`,
    chargingTime0To100Perc: (value) =>
      value === 'NA' ? value : `${(value / 60).toFixed(2)} hours (0-100%)`,
    bookingPrice: (value) => (value === 'NA' ? value : `₹ ${value}`),
    accelration0To60kmph: (value) =>
      value === 'NA' ? value : `${value} sec (0-60 km/h)`,
    accelration0To40kmph: (value) =>
      value === 'NA' ? value : `${value} sec (0-40 km/h)`,
    continuousPower: (value) => (value === 'NA' ? value : `${value} kW`),
    motorPower: (value) => (value === 'NA' ? value : `${value} kW`),
    rangeOfVehicle: (value) => (value === 'NA' ? value : `${value} km`),
    underseatStorage: (value) => (value === 'NA' ? value : `${value} liters`),
    chargerOutputMin: (value) => (value === 'NA' ? value : `${value} kW`),
    chargerOutputMax: (value) => (value === 'NA' ? value : `${value} kW`),
    gradeability: (value) => (value === 'NA' ? value : `${value} degrees`),
    width: (value) => (value === 'NA' ? value : `${value} mm`),
    length: (value) => (value === 'NA' ? value : `${value} mm`),
    height: (value) => (value === 'NA' ? value : `${value} mm`),
    saddleHeight: (value) => (value === 'NA' ? value : `${value} mm`),
    groundClearance: (value) => (value === 'NA' ? value : `${value} mm`),
    wheelbase: (value) => (value === 'NA' ? value : `${value} mm`),
    kerbWeight: (value) => (value === 'NA' ? value : `${value} kg`),
    loadCarryingCapacity: (value) => (value === 'NA' ? value : `${value} kg`),
    topSpeed: (value) => (value === 'NA' ? value : `${value} km/h`),
    motorWarrantyForMonths: (value) =>
      value === 'NA' ? value : `${value} months`,
    motorWarrantyForKm: (value) => (value === 'NA' ? value : `${value} km`),
    batteryWarrantyForMonths: (value) =>
      value === 'NA' ? value : `${value} months`,
    batteryWarrantyForKm: (value) => (value === 'NA' ? value : `${value} km`),
    bootSpace: (value) => (value === 'NA' ? value : `${value} liters`),
    abstractrtificialExhaustSoundSystem: (value) => value,
    drls: (value) => value,
    turnSignalLamp: (value) => value,
    internetConnectivity: (value) => value,
    bluetoothConnectivity: (value) => value,
    geoFencing: (value) => value,
    antiTheftAlarm: (value) => value,
    usbchargingPort: (value) => value,
    fastCharging: (value) => value,
    musicControl: (value) => value,
    externalSpeakers: (value) => value,
    centralLocking: (value) => value,
    cruiseControl: (value) => value,
    lowBatteryIndicator: (value) => value,
    otaUpdates: (value) => value,
    regenerativeBraking: (value) => value,
    hillAssist: (value) => value,
    parkingAssist: (value) => value,
    waterProofRating: (value) => (value === 'NA' ? value : `IP${value}`),
    fastChargingTimeUpto80Perc: (value) =>
      value === 'NA' ? value : `${value} minutes (0-80%)`,
    ridingModes: (value) =>
      value === 'NA' ? value : `${value} mode${value !== '1' ? 's' : ''}`,
    suspensionFront: (value) => value,
    suspensionRear: (value) => value,
    brakesFront: (value) => value,
    brakesRear: (value) => value,
    wheelsType: (value) => value,
    bodyType: (value) => value,
    dimensionsAndCapacity: (value) => value,
    transmissionType: (value) => value,
    driveType: (value) => value,
    batteryType: (value) => value,
    chargingPort: (value) => value,
    headlight: (value) => value,
    taillight: (value) => value,
    instrumentConsole: (value) => value,
    tyreSize: (value: string) => {
      if (value === 'NA') return value;
      const sizes = value.split(',').map((size: string) => size.trim());
      return sizes.join('\n');
    },
    wheelSize: (value: string) => {
      if (value === 'NA') return value;
      const sizes = value.split(',').map((size: string) => size.trim());
      return sizes.join('\n');
    },
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
