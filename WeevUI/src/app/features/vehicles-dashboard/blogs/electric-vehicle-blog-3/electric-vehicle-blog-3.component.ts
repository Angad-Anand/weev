import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-electric-vehicle-blog-3',
  templateUrl: './electric-vehicle-blog-3.component.html',
  styleUrls: ['./electric-vehicle-blog-3.component.scss'],
})
export class ElectricVehicleBlogComponent3 {
  title = 'Debunking Myths About Electric Vehicles: Separating Fact from Fiction';
  sectionTitle = 'Introduction to Electric Vehicles (EVs)';

  // Section I: Introduction
  subSection = {
    content: `Electric vehicles have come a long way in recent years, with advancements in battery technology and charging infrastructure. Despite their growing popularity, there are still many misconceptions about EVs that need to be addressed. In this blog post, we will explore some of the most common myths and provide factual information to help you understand the benefits and limitations of electric vehicles.`,
  };

  sectionTitle1 = 'Myth 1: EVs Have Limited Range';

  // Section I: Introduction
  subSection1 = {
    content: `One of the most persistent myths about EVs is that they have limited range. While earlier models may have had shorter ranges, modern EVs are capable of traveling hundreds of miles on a single charge. With the rapid expansion of charging infrastructure, it's becoming increasingly easy to find charging stations along popular routes. Additionally, many EV owners choose to charge their vehicles at home, ensuring they have a full charge for their daily commute.`,
  };


  // Section II: Types of Electric Vehicles
  sectionTitle2 = 'Myth 2: EVs Are Expensive to Purchase and Maintain';

  subSection2 = {
    content: `Another common misconception is that EVs are expensive to purchase and maintain. While the upfront cost of an EV may be higher than a comparable gasoline car, the long-term savings can be significant. EVs require less maintenance due to fewer moving parts, and they have significantly lower fuel costs. Moreover, many governments offer incentives and tax credits to encourage the adoption of EVs, further reducing the overall cost of ownership.`,
  };

  sectionTitle3 = 'Myth 3: EVs Take a Long Time to Charge';

  subSection3 = {
    content: `Many people believe that charging an EV takes a long time. While charging times can vary depending on the charging infrastructure and battery capacity, modern EVs can be charged quickly using DC fast-charging stations. These stations can add hundreds of miles of range in just a few minutes. Additionally, many EV owners choose to charge their vehicles overnight at home, ensuring they have a full charge for their daily commute.`,
  };
  sectionTitle4 = ' Myth 4: EVs Are Bad for the Environment';

  subSection4= {
    content: `Some people argue that EVs are not environmentally friendly due to the manufacturing process and the disposal of batteries. However, the overall environmental impact of EVs is significantly lower than that of gasoline cars. EVs produce zero tailpipe emissions, contributing to cleaner air and reduced pollution. Additionally, the renewable energy sources used to generate electricity can further reduce the environmental impact of EVs.`,
  };
  sectionTitle5= ' Myth 5: EVs Are Not as Fun to Drive';


  subSection5= {
    content: `One of the most surprising aspects of EVs is how fun they are to drive. EVs offer instant torque, providing a thrilling acceleration experience. They are also quieter and smoother than gasoline cars, making for a more comfortable and enjoyable ride. With advancements in EV technology, these vehicles are becoming increasingly capable and sporty, challenging the traditional perception of electric cars.`,
  };
  sectionTitle6= ' Conclusion';


  subSection6= {
    content: `In conclusion, electric vehicles are a viable and exciting transportation option. By debunking the common myths surrounding EVs, we hope to encourage more people to consider these vehicles for their next purchase. With advancements in technology and infrastructure, EVs are becoming increasingly accessible and affordable. It's time to embrace the future of transportation and experience the benefits of electric vehicles for yourself.`,
  };

 







  twowheelerlist: Array<any> = new Array<any>();
  toptwowheelerlist: Array<any> = new Array<any>();
  recenttwowheelerlist: Array<any> = new Array<any>();

  constructor(private router: Router, public vehiclesService: VehiclesService){

  }

  // isSticky: boolean=false;
  // stickyOffSet: number=0;

  ngOnInit(): void {
    this.getTwoWheelerData();
    window.scrollTo(0, 0); // Scroll to top
   

    // const stickyElement = document.querySelector('.sticky') as HTMLElement;
    // this.stickyOffSet=stickyElement.offsetTop;
  }


  // @HostListener('window:scroll',['$event'])
  // onScroll(event:Event):void{
  //   this.isSticky=window.pageYOffset>this.stickyOffSet;
  // }
  

 
  getTwoWheelerData() {
    this.vehiclesService.getTwoWheelerData().subscribe((response) => {
      this.twowheelerlist = response;
      // Limit to 8 items
      const topVariants = this.twowheelerlist.filter(item => item.variantType === "Top" && ['Ola','Ather'].includes(item.manufacturer)).slice(0,4);

      this.toptwowheelerlist.push(...topVariants);
      console.log("sasasa");
      
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
