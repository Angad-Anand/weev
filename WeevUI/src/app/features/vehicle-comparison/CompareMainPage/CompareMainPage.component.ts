import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-CompareMainPage',
  templateUrl: './CompareMainPage.component.html',
  styleUrls: ['./CompareMainPage.component.scss'],
})
export class CompareMainComponent implements OnInit {
  vehicleData: any = {};
  productKeys: string[] = [];
  twowheelerlist: Array<any> = [];
  sections: any[] = []; // Initialize sections as an empty array

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesService: VehiclesService
  ) {}

  vehicleDataObjects: any[] = [];

  ngOnInit(): void {
    window.scroll(0, 0);

    this.route.params.subscribe((params) => {
      const ids =
        window.innerWidth > 768
          ? ['twId1', 'twId2', 'twId3', 'twId4']
          : ['twId1', 'twId2'];

      this.vehiclesService.getTwoWheelerData().subscribe((response) => {
        this.twowheelerlist = response;
        ids.forEach((idKey) => {
          // Decode the URL parameter to replace %20 with spaces
          let productName = params[idKey]
            ? decodeURIComponent(params[idKey])
            : params[idKey];

          this.vehicleData[idKey] = { model: {}, list: [] };
          if (productName && productName !== 'NA') {
            this.getTwoWheelerDatas(productName, idKey, this.twowheelerlist);
          } else {
            // If the productName is 'NA', set the vehicleData to an empty object
            this.vehicleData[idKey] = { model: 'NA', list: [] };
          }
        });

        // Continue with further processing
        this.productKeys = Object.keys(this.vehicleData);
        this.populatecards();
        this.updateSections();
      });
    });
  }

  populatecards() {
    if (this.productKeys.length > 0) {
      this.productKeys.forEach((key) => {
        if (this.vehicleData[key] && this.vehicleData[key].model !== 'NA') {
          // Find all variants for the current manufacturer and model
          const manufacturerModel =
            this.vehicleData[key].manufacturer +
            ' ' +
            this.vehicleData[key].model;
          const variants = this.twowheelerlist
            .filter(
              (item) =>
                item.manufacturer + ' ' + item.model === manufacturerModel
            )
            .map((item) => item.variantType);

          this.vehicleDataObjects.push({
            imageUrl: this.vehicleData[key].path || 'path/to/default/image.jpg',
            title: manufacturerModel,
            manufacturer: this.vehicleData[key].manufacturer,
            model: this.vehicleData[key].model,
            variant:this.vehicleData[key].variant,
            variants: variants,
            price:
              this.vehicleData[key].exShowroomPrice || 'Price not available',
          });
        } else {
          this.vehicleDataObjects.push({ model: 'NA' });
        }
      });
    }
  }

  getTwoWheelerDatas(
    productName: string,
    key: string,
    twowheelerlist: any[]
  ): void {
    const twowheeler = twowheelerlist.find(
      (i) => i.manufacturer + '_' + i.model + '_' + i.variant === productName
    );
    if (twowheeler) {
      this.vehicleData[key] = twowheeler;
    } else {
      this.vehicleData[key] = { model: {}, list: [] };
    }
  }

  getComparisonTitle(): string {
    const vehicleNames = this.vehicleDataObjects
      .filter(item => item.model !== 'NA')
      .map(item => item.title || `${item.manufacturer} ${item.model}`);
      
    return vehicleNames.length > 0 
      ? vehicleNames.join(' vs ') 
      : 'Compare Vehicles';
  }

  // Helper function to format section titles
  formatSectionTitle(sectionKey: string): string {
    return sectionKey
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  toggleSection(section: any): void {
    section.open = !section.open;
  }

  onVehicleSelected(vehicle: any, index: number) {
    console.log(vehicle);
    this.vehicleDataObjects[index] = {
      imageUrl: vehicle.path || 'path/to/default/image.jpg',
      title: `${vehicle.manufacturer} ${vehicle.model} ${vehicle.variant}`,
      variants: [vehicle.variants],
      price: vehicle.price || 'Price not available',
      model: vehicle.model,
      manufacturer: vehicle.manufacturer,
      variant: vehicle.variant,
    };

    const key = `twId${index + 1}`;

    this.getTwoWheelerDatas(
      `${vehicle.manufacturer}_${vehicle.model}_${vehicle.variant}`,
      key,
      this.twowheelerlist
    );
    this.updateSections();
  }

  onCardRemoved(cardData: any, index: number) {
    // Get the key for the card being removed (e.g., 'twId1', 'twId2', etc.)
    const key = this.productKeys[index];

    // Update the vehicleData object for the removed card
    this.vehicleData[key] = { model: 'NA', list: [] };

    // Update the vehicleDataObjects array for the removed card
    this.vehicleDataObjects[index] = { model: 'NA' };

    // Regenerate the sections array to reflect the changes
    this.updateSections();
  }

  updateSections(): void {
    const keyToTitleMap: Record<string, string[]> = {
      powerPerformance: [
        'batteryCapacity',
        'motorType',
        'maxSpeed',
        'chargingTime',
        'continuousPower',
        'motorPower',
        'rangeOfVehicle',
        'chargingTime0To80Perc',
        'chargingTime0To100Perc',
      ],
      brakesWheelsSuspension: [
        'brakesFront',
        'brakesRear',
        'suspensionFront',
        'suspensionRear',
        'tyreSize',
        'wheelSize',
        'wheelsType',
      ],
      dimensionsAndCapacity: [
        'dimensionsAndCapacity',
        'bootSpace',
        'width',
        'length',
        'height',
        'saddleHeight',
        'groundClearance',
        'wheelbase',
        'kerbWeight',
        'loadCarryingCapacity',
      ],
      featuresTechnology: [
        'instrumentConsole',
        'bluetoothConnectivity',
        'navigation',
        'geoFencing',
        'antiTheftAlarm',
        'usbchargingPort',
        'underseatStorage',
        'distanceToEmptyIndicator',
        'musicControl',
        'internetConnectivity',
        'mobileApplication',
      ],
      warrantyAndReliability: [
        'motorWarrantyForMonths',
        'motorWarrantyForKm',
        'batteryWarrantyForMonths',
        'batteryWarrantyForKm',
        'waterProofRating',
      ],
      performance: [
        'accelration0To60kmph',
        'accelration0To40kmph',
        'gradeability',
        'topSpeed',
      ],
      aestheticsAndDesign: ['bodyType', 'turnSignalLamp', 'drls'],
      charging: [
        'chargingAtHome',
        'noOfBatteries',
        'swappableBattery',
        'chargingStationLocater',
        'chargerOutputMin',
        'chargerOutputMax',
        'fastCharging',
        'fastChargingTimeUpto80Perc',
      ],
      additionalFeatures: [
        'abstractrtificialExhaustSoundSystem',
        'callOrsmsalerts',
        'externalSpeakers',
        'carryHook',
        'clock',
        'centralLocking',
        'cruiseControl',
      ],
    };

    const humanReadableMap: Record<string, string> = {
      batteryCapacity: 'Battery Capacity',
      motorType: 'Motor Type',
      maxSpeed: 'Max Speed',
      chargingTime: 'Charging Time',
      continuousPower: 'Continuous Power',
      motorPower: 'Motor Power',
      rangeOfVehicle: 'Range of Vehicle',
      chargingTime0To80Perc: 'Charging Time 0-80%',
      chargingTime0To100Perc: 'Charging Time 0-100%',
      brakesFront: 'Front Brakes',
      brakesRear: 'Rear Brakes',
      suspensionFront: 'Front Suspension',
      suspensionRear: 'Rear Suspension',
      tyreSize: 'Tyre Size',
      wheelSize: 'Wheel Size',
      wheelsType: 'Wheel Type',
      dimensionsAndCapacity: 'Dimensions & Capacity',
      bootSpace: 'Boot Space',
      width: 'Width',
      length: 'Length',
      height: 'Height',
      saddleHeight: 'Saddle Height',
      groundClearance: 'Ground Clearance',
      wheelbase: 'Wheelbase',
      kerbWeight: 'Kerb Weight',
      loadCarryingCapacity: 'Load Carrying Capacity',
      instrumentConsole: 'Instrument Console',
      bluetoothConnectivity: 'Bluetooth Connectivity',
      navigation: 'Navigation',
      geoFencing: 'Geo-Fencing',
      antiTheftAlarm: 'Anti-Theft Alarm',
      usbchargingPort: 'USB Charging Port',
      underseatStorage: 'Underseat Storage',
      distanceToEmptyIndicator: 'Distance to Empty Indicator',
      musicControl: 'Music Control',
      internetConnectivity: 'Internet Connectivity',
      mobileApplication: 'Mobile Application',
      motorWarrantyForMonths: 'Motor Warranty (Months)',
      motorWarrantyForKm: 'Motor Warranty (Kilometers)',
      batteryWarrantyForMonths: 'Battery Warranty (Months)',
      batteryWarrantyForKm: 'Battery Warranty (Kilometers)',
      waterProofRating: 'Waterproof Rating',
      accelration0To60kmph: 'Acceleration 0-60 kmph',
      accelration0To40kmph: 'Acceleration 0-40 kmph',
      gradeability: 'Gradeability',
      topSpeed: 'Top Speed',
      bodyType: 'Body Type',
      turnSignalLamp: 'Turn Signal Lamp',
      drls: 'Daytime Running Lights (DRLs)',
      chargingAtHome: 'Charging at Home',
      noOfBatteries: 'Number of Batteries',
      swappableBattery: 'Swappable Battery',
      chargingStationLocater: 'Charging Station Locator',
      chargerOutputMin: 'Charger Output (Min)',
      chargerOutputMax: 'Charger Output (Max)',
      fastCharging: 'Fast Charging',
      fastChargingTimeUpto80Perc: 'Fast Charging Time (80%)',
      abstractrtificialExhaustSoundSystem: 'Artificial Exhaust Sound System',
      callOrsmsalerts: 'Call or SMS Alerts',
      externalSpeakers: 'External Speakers',
      carryHook: 'Carry Hook',
      clock: 'Clock',
      centralLocking: 'Central Locking',
      cruiseControl: 'Cruise Control',
    };

    const valueTransformMap: { [key: string]: (value: any) => string } = {
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

    this.sections = Object.keys(keyToTitleMap).map(
      (sectionKey: string, index: number) => ({
        open: index === 0,
        title: this.formatSectionTitle(sectionKey),
        features: keyToTitleMap[sectionKey].map((key: string) => {
          const transform =
            valueTransformMap[key] || ((value: any) => `${value}`);
          return {
            key: humanReadableMap[key],
            values: this.productKeys
              .map((id: string) => {
                if (this.vehicleData[id]?.model === 'NA') {
                  return ' '; // Return empty string for 'NA' products
                }
                return transform(this.vehicleData[id]?.[key]) || 'NA';
              })
              .filter(Boolean),
          };
        }),
      })
    );
  }
}