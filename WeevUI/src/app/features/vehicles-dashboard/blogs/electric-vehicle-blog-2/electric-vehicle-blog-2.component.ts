import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-electric-vehicle-blog-2',
  templateUrl: './electric-vehicle-blog-2.component.html',
  styleUrls: ['./electric-vehicle-blog-2.component.scss'],
})
export class ElectricVehicleBlogComponent2 {
  title = 'A Beginners Guide to Owning an Electric Vehicle: What You Need to Know';
  sectionTitle = 'Introduction to Electric Vehicles (EVs)';

  // Section I: Introduction
  subSectionA = {
    title: 'Introduction',
    content: `The electric vehicle revolution has been gaining momentum in recent years, with more and more people opting for these environmentally friendly alternatives to traditional vehicles. In this beginner's guide, we will explore the reasons behind the growing popularity of electric vehicles and delve into the important factors one should consider when making the switch.`,
  };


  // Section II: Types of Electric Vehicles
  sectionTitle2 = 'Advantages of Electric Vehicles';

  subSectionB = {
    title: 'Environmental Benefits of Electric Vehicles',
    content: `One of the most significant advantages of electric vehicles is their positive impact on the environment. Unlike traditional vehicles that rely on fossil fuels, electric vehicles produce zero tailpipe emissions, helping to reduce air pollution and combat climate change. By choosing an electric vehicle, you can play a role in creating a cleaner and greener future for generations to come`,
  };

  subSectionC = {
    title: 'Long-Term Cost Savings Compared to Traditional Vehicles',
    content: `While the upfront cost of an electric vehicle may be higher than that of a traditional vehicle, the long-term savings can be substantial. Electric vehicles have lower operating costs since electricity is generally cheaper than gasoline or diesel. Furthermore, maintenance costs are often reduced as electric vehicles have fewer moving parts and do not require oil changes or regular engine servicing. Over time, the savings on fuel and maintenance can make owning an electric vehicle more cost-effective.`,
  };

  subSectionD = {
    title: 'Reduced Dependence on Fossil Fuels',
    content: `Electric vehicles offer a promising solution to reduce our dependence on fossil fuels, which are finite resources. By utilizing electricity as their primary source of power, electric vehicles help diversify our energy sources and contribute to energy independence. This not only benefits individual vehicle owners but also helps promote energy security on a larger scale.`,
  };
  
  // Section III: Benefits of Electric Vehicles
  sectionTitle3 = 'Types of Electric Vehicles';
  

  subSectionE = {
    title: 'Battery Electric Vehicles (BEVs)',
    content: `Battery Electric Vehicles, or BEVs, are fully electric vehicles that run solely on battery power. They do not have any internal combustion engines and need to be charged using external sources of electricity. BEVs are popular among environmentally conscious drivers as they produce zero emissions and offer a longer driving range.`,
  };

  subSectionF = {
    title: 'Plug-in Hybrid Electric Vehicles (PHEVs)',
    content: `Plug-in Hybrid Electric Vehicles, or PHEVs, combine an internal combustion engine with an electric motor and a battery. PHEVs can be charged using external electricity sources, but they also have a traditional fuel tank. These vehicles provide the flexibility to drive using either electricity or gasoline, making them suitable for longer trips or when charging infrastructure might be limited.`,
  };

  subSectionG = {
    title: 'Extended Range Electric Vehicles (EREVs)',
    content: `Extended Range Electric Vehicles, or EREVs, are similar to PHEVs but with a larger battery capacity. They can primarily be driven using electric power, with the internal combustion engine only acting as a generator to recharge the battery when it runs low. EREVs offer a longer electric driving range, providing a more sustainable driving experience.`,
  };
  subSectionH= {
    title: 'Hydrogen Fuel Cell Electric Vehicles (FCEVs)',
    content: `Hydrogen Fuel Cell Electric Vehicles, or FCEVs, are an emerging type of electric vehicle that use a fuel cell stack to convert hydrogen into electricity, which then powers an electric motor. FCEVs produce zero emissions and offer the advantage of faster refueling times compared to battery electric vehicles. However, the availability of hydrogen fueling stations is currently limited.`,
  };

  // Section IV: Challenges and Future of EVs
  sectionTitle4 = 'Choosing the Right Electric Vehicle';



  subSectionI= {
    title: 'Determining Your Needs and Budget',
    content: `Before making a purchase, assess your driving patterns, such as daily commute distance and the need for long trips. Consider the size and type of vehicle that suits your lifestyle and fits within your budget. Researching different models and comparing prices can help you make an informed decision.
`,
  };

  subSectionJ = {
    title: 'Evaluating the Range and Charging Infrastructure',
    content: `Take into account the range offered by the electric vehicle and whether it aligns with your driving requirements. Additionally, assess the availability of charging infrastructure in your area and along frequently traveled routes. Understanding the charging options and network can ensure a smooth transition to electric vehicle ownership.
`,
  };
  subSectionK= {
    title: 'Considering Available Incentives and Rebates',
    content: `Many governments and organizations offer incentives and rebates to encourage the adoption of electric vehicles. These incentives can significantly reduce the upfront cost of purchasing an electric vehicle, making it more affordable. Explore the available incentives and rebates in your region to take advantage of potential savings.`,
  };
  subSectionL = {
    title: ' Reviewing Customer Reviews and Ratings',
    content: `Accessing customer reviews and ratings can provide valuable insights into the performance, reliability, and overall satisfaction of different electric vehicle models. Take the time to read reviews from reputable sources and engage with electric vehicle owners to gain a better understanding of their experiences.`,
  };
  sectionTitle5 = 'The Charging Network and Infrastructure';

  subSectionM = {
    title: 'Home Charging Options and Installation',
    content: `One of the most convenient ways to charge an electric vehicle is at home. Installing a Level 2 charging station, which operates at 240 volts, provides a faster charging time compared to a standard 120-volt outlet. Consider the installation requirements, charging capacity, and associated costs when setting up a home charging solution.`,
  };
  subSectionN= {
    title: 'Public Charging Stations and Networks',
    content: `For those who do not have access to private charging infrastructure, relying on public charging stations is crucial. Charging stations are becoming increasingly prevalent in public areas such as shopping centers, parking lots, and along highways. Familiarize yourself with the locations and availability of charging stations in your area to charge your vehicle while on the go.`,
  };
  subSectionO = {
    title: 'Fast-Charging Stations and Their Benefits',
    content: `Fast-charging stations, also known as Level 3 or DC fast chargers, provide a significantly shorter charging time compared to Level 2 chargers. These stations utilize higher voltage and power levels, allowing electric vehicle owners to recharge their vehicles quickly. Identify the locations of fast-charging stations in your area to plan for convenient and time-efficient charging stops.`,
  };
  subSectionP= {
    title: 'Planning for Long Road Trips and Routes with Charging Stops',
    content: `If you're planning a long road trip, it is essential to consider the availability of charging stations along your route. Proper planning can ensure a stress-free journey with strategically planned charging stops to keep your electric vehicle powered throughout the trip. Utilize online resources and smartphone applications that provide information on charging station locations and availability..`,
  };


  sectionTitle6 = 'Maintaining and Extending Battery Life';

  subSectionQ= {
    title: 'Battery Maintenance Tips and Best Practices',
    content: `Regularly monitoring and maintaining the health of your electric vehicle battery is essential. Follow the manufacturer's recommendations regarding charging and discharging levels, and avoid extreme temperatures that can negatively impact battery performance. Additionally, periodically inspecting the battery and keeping it clean and free of debris can contribute to its longevity`,
    

  };
  subSectionR= {
    title: 'Maximizing Battery Range Through Efficient Driving Habits',
    content: `To optimize the battery range of your electric vehicle, consider adopting efficient driving habits. Techniques such as gentle acceleration and deceleration, maintaining a consistent speed, and reducing unnecessary energy consumption through HVAC systems can help you get the most out of each charge`,
    

  };
  subSectionS= {
    title: 'Addressing Common Misconceptions About Battery Life and Durability',
    content: `There are common myths surrounding electric vehicle batteries, including concerns about degradation and replacement costs. It's essential to gather accurate information and separate fact from fiction. Modern electric vehicle batteries are designed to be durable and have warranty coverage that ensures long-term peace of mind for owners.`,
    

  };
  
 
  sectionTitle7 = 'Financing and Insurance Considerations';
  subSectionT= {
    title: 'Financing Options for Purchasing an Electric Vehicle',
    content: `Various financing options are available to assist potential electric vehicle owners in their purchase. Research loans, lease agreements, and incentives provided by manufacturers, financial institutions, and government programs to determine the most suitable financing plan for your needs.`,
    

  };
  subSectionU= {
    title: 'Insurance Considerations Specific to Electric Vehicles',
    content: `Insurance policies for electric vehicles can vary based on factors such as the vehicle's value, range, and charging infrastructure. It is advisable to discuss your specific requirements with insurance providers who specialize in electric vehicle coverage to ensure you have comprehensive coverage that meets your needs.`,
    

  };
  subSectionV= {
    title: 'Calculating Long-Term Cost Savings and Return on Investment',
    content: `Determining the long-term cost savings of owning an electric vehicle compared to a traditional vehicle can help you evaluate the financial impact. Consider factors such as fuel savings, reduced maintenance costs, and potential tax incentives to calculate your return on investment over the lifetime of the vehicle.`,
    

  };
  sectionTitle8 = 'Overcoming Range Anxiety';
  subSectionW= {
    title: 'Calculating Long-Term Cost Savings and Return on Investment',
    content: `Determining the long-term cost savings of owning an electric vehicle compared to a traditional vehicle can help you evaluate the financial impact. Consider factors such as fuel savings, reduced maintenance costs, and potential tax incentives to calculate your return on investment over the lifetime of the vehicle.`,
    

  };
  subSectionX= {
    title: 'Calculating Long-Term Cost Savings and Return on Investment',
    content: `Determining the long-term cost savings of owning an electric vehicle compared to a traditional vehicle can help you evaluate the financial impact. Consider factors such as fuel savings, reduced maintenance costs, and potential tax incentives to calculate your return on investment over the lifetime of the vehicle.`,
    

  };
  sectionTitle9 = 'Safety and Maintenance Requirements';

  subSectionY= {
    title: 'Basic Safety Features in Electric Vehicles',
    content: `Electric vehicles are equipped with a range of safety features, including advanced driver assistance systems, collision avoidance technologies, and robust battery management systems. These features help ensure the safety of passengers and pedestrians while driving an electric vehicle.`,
    

  };
  subSectionZ= {
    title: 'Maintenance Requirements Specific to Electric Vehicles',
    content: `While electric vehicles generally require less maintenance compared to traditional vehicles, some routine servicing is necessary to keep your vehicle running smoothly. Follow manufacturer-recommended maintenance guidelines, which may include periodic inspections, fluid checks, and brake system examinations. Additionally, battery health monitoring and software updates should be considered when maintaining your electric vehicle.`,
    

  };
  subSectionAA= {
    title: 'Servicing Electric Vehicles and Finding Qualified Technicians',
    content: `Finding qualified technicians who specialize in servicing electric vehicles is important for ensuring proper maintenance and repair. Seek out service centers with trained personnel who are familiar with electric vehicle technology, as they will possess the necessary skills and knowledge to address any concerns or issues that may arise`,
    

  };
  sectionTitle10 = 'EV Ownership and the Future';
  subSectionBB= {
    title: 'Industry Trends and Forecasts for Electric Vehicle Adoption',
    content: `Industry experts and analysts predict a significant increase in electric vehicle adoption in the coming years. Advancements in technology, expanding charging infrastructure, and policy support contribute to the positive outlook for the electric vehicle market. Staying informed about industry trends can help you make informed decisions as an electric vehicle owner.`,
    

  };
  subSectionCC= {
    title: 'Advancements in Electric Vehicle Technology on the Horizon',
    content: `Electric vehicle technology continues to evolve rapidly, with advancements being made in areas such as battery technology, charging infrastructure, and autonomous driving capabilities. Keeping up with the latest developments can help owners stay at the forefront of innovation and take advantage of emerging technologies.`,
    

  };  
  subSectionDD= {
    title: 'The Role of Electric Vehicle Owners in Shaping the Future',
    content: `Electric vehicle owners play a vital role in driving the transition to a more sustainable transportation system. By choosing electric vehicles, you contribute to reducing greenhouse gas emissions, improving air quality, and promoting renewable energy integration. Additionally, providing feedback to manufacturers and engaging in the adoption of charging infrastructure can shape the future of electric vehicle ownership.`,
    

  };
  subSectionEE= {
    title: 'Summary: Making the Switch to Electric Vehicles',
  content:'Switching to an electric vehicle offers numerous benefits, including environmental advantages, long-term cost savings, and reduced dependence on fossil fuels. By determining your needs and budget, evaluating charging infrastructure, maintaining battery life, and considering financing options, you can make an informed decision when choosing the right electric vehicle for your lifestyle. Overcoming range anxiety and understanding safety and maintenance requirements are important aspects of ownership. Embrace the potential of electric vehicles and consider taking the necessary steps towards a cleaner, more sustainable future',
  };
  subSectionFF = {title:'Conclusion',
  content:'The rise of electric vehicles represents a transformative shift in the automotive industry. As the world becomes more environmentally conscious, owning an electric vehicle is increasingly becoming a symbol of progress and sustainability. By joining the electric vehicle revolution, you contribute to a greener future and inspire others to make the switch. Take the next steps towards electric vehicle ownership and experience the benefits firsthand',};



  twowheelerlist: Array<any> = new Array<any>();
  toptwowheelerlist: Array<any> = new Array<any>();
  recenttwowheelerlist: Array<any> = new Array<any>();
  brands: any[] = [];

  constructor(private http: HttpClient, private router: Router, public vehiclesService: VehiclesService){

  }

  // isSticky: boolean=false;
  // stickyOffSet: number=0;

  ngOnInit(): void {
    this.getTwoWheelerData();
    window.scrollTo(0, 0); // Scroll to top
    
    this.http.get<any[]>('assets/json/brands.json').subscribe(data => {
      this.brands = data;
    //   console.log(this.brands);
    });

    // const stickyElement = document.querySelector('.sticky') as HTMLElement;
    // this.stickyOffSet=stickyElement.offsetTop;
  }


  // @HostListener('window:scroll',['$event'])
  // onScroll(event:Event):void{
  //   this.isSticky=window.pageYOffset>this.stickyOffSet;
  // }
  
  navigateToBrand(Brand: string) {
    console.log(`Navigating to brand: ${Brand}`); // Debugging line
    this.router.navigate(['/Bikes/Brand/', Brand]); // Ensure this matches the route configuration
}
 
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
    const twowheeler = this.twowheelerlist.find(
      (i) =>
        // console.log(i.twid);
        i.twId === twId
    );
    const vehicle =
      twowheeler.manufacturer +
      '_' +
      twowheeler.model +
      '_' +
      twowheeler.variant;
    console.log(vehicle);

    window.scrollTo(0, 0);
    setTimeout(() => {
      this.router.navigate(['/Selection', vehicle]).then(() => {
      });
    }, 510);
  }
  

  
}
