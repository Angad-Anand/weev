import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit, ChangeDetectorRef  } from '@angular/core';
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
  styleUrls: ['./category-selection.component.scss']
})


export class CategorySelectionComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;

  popup = false;
  
  productListModel: ProductListModel | undefined;
  tab : any = 'Price';
  isShowPrice : boolean=true;
  isShowSpecs:boolean=false;
  isShowUser:boolean=false;
  isShowExpert:boolean=false;
  isShowVideos:boolean=false;

  isShowOverView:boolean=false;
  isShowEngineTransmission:boolean=false;
  isShowFeatures:boolean=false;

  productID: number=0;
  productlist: Array<ProductListModel> = new Array<ProductListModel>(); 
  tabs: Array<any> = new Array<any>();
  ImgName: Array<any> = new Array<any>();
  CllOutResult?:string;
  countRating : number=5;
  selectedRating : number = 0;
  unSelectRating  : number=0;

  constructor(private modal: UntypedFormBuilder,private route: ActivatedRoute,
    private vehiclesService: VehiclesService,private authService: AuthService,
    private readonly dialogService:DialogService,private http: HttpClient,private cd: ChangeDetectorRef)
   {
    
    this.route.params.subscribe(
      params => this.productID = params['twId']
    );

  }  
  
  ngOnInit(): void {
    this.scrollToBottom();
    this.productListModel = Object.assign({}, EMPTY_Application);
    if(this.productID!=0||this.productID!=undefined ){
      this.getProductDataWithID(+this.productID);
      this.getImgNameWithID(+this.productID);
    }  
    this.fetchData();
    this.fetchSpecifications();

  }



  

ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {
        this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer?.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  onClick(check:any){   
        if(check==1){
          this.tab = 'Price';
          this.isShowPrice=true;
          this.isShowSpecs=false;
          this.isShowUser=false;
          this.isShowExpert=false;
          this.isShowVideos=false;
          this.isShowOverView=false;
          this.isShowEngineTransmission=false;
          this.isShowFeatures=false;
        }else if(check==2){
          this.tab = 'Specs';
          this.isShowPrice=false;
          this.isShowSpecs=true;
          this.isShowUser=false;
          this.isShowExpert=false;
          this.isShowVideos=false;
          this.isShowOverView=true;
          this.isShowEngineTransmission=false;
          this.isShowFeatures=false;
        }
        else if(check==3){
          this.tab = 'User';
          this.isShowPrice=false;
          this.isShowSpecs=false;
          this.isShowUser=true;
          this.isShowExpert=false;
          this.isShowVideos=false;
          this.isShowOverView=false;
          this.isShowEngineTransmission=false;
          this.isShowFeatures=false;
        }
        else if(check==4){
          this.tab = 'Expert';
          this.isShowPrice=false;
          this.isShowSpecs=false;
          this.isShowUser=false;
          this.isShowExpert=true;
          this.isShowVideos=false;
          this.isShowOverView=false;
          this.isShowEngineTransmission=false;
          this.isShowFeatures=false;
        }
        else if(check==5){
          this.tab = 'Videos';
          this.isShowPrice=false;
          this.isShowSpecs=false;
          this.isShowUser=false;
          this.isShowExpert=false;
          this.isShowVideos=true;
          this.isShowOverView=false;
          this.isShowEngineTransmission=false;
          this.isShowFeatures=false;
        }

        else if(check==6){
          this.tab = 'OverView';
          this.isShowPrice=false;
          this.isShowSpecs=true;
          this.isShowUser=false;
          this.isShowExpert=false;
          this.isShowVideos=false;
          this.isShowOverView=true;
          this.isShowEngineTransmission=false;
          this.isShowFeatures=false;
        }
        else if(check==7){
          this.tab = 'EngineTransmission';
          this.isShowPrice=false;
          this.isShowSpecs=true;
          this.isShowUser=false;
          this.isShowExpert=false;
          this.isShowVideos=false;
          this.isShowOverView=false;
          this.isShowEngineTransmission=true;
          this.isShowFeatures=false;
        }
        else if(check==8){
          this.tab = 'Features';
          this.isShowPrice=false;
          this.isShowSpecs=true;
          this.isShowUser=false;
          this.isShowExpert=false;
          this.isShowVideos=false;
          this.isShowOverView=false;
          this.isShowEngineTransmission=false;
          this.isShowFeatures=true;
        }
      
    }

    getProductDataWithID(productID : any) {
      this.vehiclesService.getProductDataWithID(productID)
        .subscribe((response) => {
          this.productlist = response;
          this.productListModel=this.productlist;
          //this.selectedRating = response.find(x => x.twId == productID).ourRating;
          this.selectedRating =this.productListModel?.ourRating ?? 0;
          this.unSelectRating = this.countRating - this.selectedRating;
          this.getTabNameWithID(productID);
          
        });

    }
    getTabNameWithID(productID : any) {
      this.vehiclesService.getTabNameWithID(productID)
        .subscribe((response) => {
          this.tabs = response;
          if(this.tabs[0] !='No_Result'){
            this.CllOutResult= this.productListModel?.path?.toString(); 
          }else {
            this.tabs[0]='Default';
            this.CllOutResult= 'assets/images/pr4.png'; 
          }
                                
        });
    }
    getImgNameWithID(productID : any) {
      this.vehiclesService.getImgNameWithID(productID)
        .subscribe((response) => {
          this.ImgName = response;
        });
    }

    onClickDynamic(check: any){
      if(check !='Default'){
      this.CllOutResult=check;
      this.CllOutResult = this.ImgName[check.toLowerCase()];   
      }else {        
        this.CllOutResult= 'assets/images/pr4.png'; 
      }      
    }
   
    public open(modal: any): void { 
      const name={type:'Customeenquiry',value:'vinay'}
      this.dialogService.openModal('Custome Enquiry',name, CustomerEnquiriesComponent)
      .pipe(takeWhile(()=> true)).subscribe((customeData:any)=>{
        if (!!customeData){
           console.log(customeData);
         this.authService.Customerenquiries(customeData);       
        }
      });
    }


    ////////////////  
    keySpecs: any[] = [];
    appFeatures: any[] = [];
    activeTab: string = 'KeySpecs';

   fetchData(): void {
    this.http.get('assets/json/keyspecs.json').subscribe((data: any) => {
      console.log(data); // Add this line to debug
      this.keySpecs = data.KeySpecs;
      this.appFeatures = data.AppFeatures;
      this.cd.detectChanges(); // Force change detection
    });
  }

  onTabClick(tabId: string): void {
    this.activeTab = tabId;
  }

  //specs
  specifications: any[] = [];
  fetchSpecifications(): void {
    this.http.get<any>('assets/json/modelspecs.json').subscribe(
        (data) => {
          this.specifications = data.specifications;
        },
        (error) => {
          console.error('Error fetching JSON data:', error);
        }
      );
  }

  mainImageSrc: string = '{{productListModel?.path}}'; // Set your default main image source here
  imageList: string[] = [
    '{{productListModel?.path}}',
    '{{productListModel?.path}}',
    '{{productListModel?.path}}'
    
    // Add more image paths as needed
  ];

  changeImage(imageSrc: string): void {
    // Update the main image source
    this.mainImageSrc = imageSrc;
  }

}

const EMPTY_Application: ProductListModel=
{        
    tWId: 0 ,
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
    path:undefined,
}