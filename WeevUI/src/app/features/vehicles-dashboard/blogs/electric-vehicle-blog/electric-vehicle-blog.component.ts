import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-electric-vehicle-blog',
  templateUrl: './electric-vehicle-blog.component.html',
  styleUrls: ['./electric-vehicle-blog.component.scss'],
})
export class ElectricVehicleBlogComponent {
  title = 'Driving Towards a Greener Future: Exploring the EV Market in India';
  sectionTitle = 'Introduction to Electric Vehicles (EVs)';

  // Section I: Introduction
  subSectionA = {
    title: 'Definition and Overview of EVs',
    content: `Electric vehicles, commonly referred to as EVs, are automobiles powered by electric motors 
    instead of traditional internal combustion engines. They rely on electricity stored in rechargeable batteries 
    to propel the vehicle forward, offering a cleaner and more sustainable alternative to conventional cars.`,
  };

  subSectionB = {
    title: 'Importance of Transitioning to EVs for a Sustainable Future',
    content: `Transitioning to electric vehicles is crucial for ensuring a sustainable and greener future. 
    EVs produce zero tailpipe emissions, reducing air pollution and mitigating the adverse effects of climate change. 
    By embracing EVs, we can significantly reduce our carbon footprint, improve air quality, and safeguard the 
    environment for future generations.`,
  };

  // Section II: Types of Electric Vehicles
  sectionTitle2 = 'Current Scenario of the EV Market in India';

  subSectionC = {
    title: 'Government initiatives and policies promoting EV adoption',
    content: `The Indian government has taken proactive measures to promote the adoption of electric vehicles. Initiatives such as the Faster Adoption and Manufacturing of (Hybrid &) Electric Vehicles (FAME) scheme provide substantial financial incentives to both manufacturers and consumers. Additionally, the government has set ambitious goals such as achieving 30% EV penetration by 2030.`,
  };

  subSectionD = {
    title: 'Statistics and growth trends of EV sales in India',
    content: `The EV market in India has witnessed significant growth in recent years. According to industry reports, EV sales in India will surpass 14.5 million units in 2023, representing a whopping 170%+  increase compared to the previous year. This upward trend is expected to continue as more consumers recognize the benefits of EVs and embrace the transition.`,
  };

  subSectionE = {
    title: 'Hybrid Electric Vehicles (HEVs)',
    content: `Hybrid Electric Vehicles (HEVs) combine an internal combustion engine with an electric motor, 
    but unlike PHEVs, they cannot be plugged in to charge. They rely on regenerative braking to charge the battery.`,
  };
  subSectionF = {
    title: 'Key players and their contributions to the EV market',
    content: `Several key players have emerged in the Indian EV market, making substantial contributions to its growth. Companies like Tata Motors, Mahindra & Mahindra, and Hero Electric have been at the forefront of developing and manufacturing electric vehicles tailored to Indian roads and consumer preferences. Their efforts have played a pivotal role in driving the popularity and acceptance of EVs among Indian consumers.`,
  };

  // Section III: Benefits of Electric Vehicles
  sectionTitle3 = 'Challenges Hindering the Growth of EV Market in India';

  subSectionG = {
    title: 'High upfront costs of EVs and limited affordability',
    content: `One of the primary challenges hindering the wider adoption of EVs in India is the high upfront cost associated with purchasing an electric vehicle. EVs currently come at a premium price due to the expensive battery technology they rely on. However, as economies of scale improve and technological advancements continue, it is expected that the cost of EVs will gradually decrease, making them more affordable for the masses. India. Established automobile manufacturers are now compelled to invest in electric vehicle technology to remain competitive in the evolving market. Companies that fail to adapt to the changing landscape may face significant challenges as consumer preferences shift towards sustainable transportation solutions.`,
  };

  subSectionH = {
    title: 'Lack of charging infrastructure and range anxiety',
    content: `The limited availability of charging infrastructure is another hurdle hindering the growth of the EV market in India. Range anxiety, the fear of running out of battery charge during a journey, also discourages potential EV buyers. However, the government is addressing this issue by implementing plans to expand the charging infrastructure across the country. Additionally, innovative solutions such as fast-charging stations and battery swapping facilities are being introduced to alleviate range anxiety.`,
  };

  subSectionI = {
    title: 'Battery technology limitations and environmental concerns',
    content: `The current limitations of battery technology, including limited range and relatively long charging times, pose a challenge for the widespread adoption of EVs in India. However, significant advancements are being made in battery technology, aiming to increase the range of EVs and reduce charging times. Moreover, there are growing concerns regarding the environmental impact of battery production and disposal. It is crucial for the industry to develop sustainable and eco-friendly solutions to address these concerns effectively.`,
  };

  // Section IV: Challenges and Future of EVs
  sectionTitle4 = 'Impact of EVs on the Automotive Industry in India';

  subSectionJ= {
    title: 'Disruption of Traditional Automobile Manufacturers',
    content: `The rise of EVs is disrupting the traditional landscape of the Indian automobile industry. Established manufacturers are facing a paradigm shift, adapting to the changing demands of the market and investing heavily in EV technologies. This disruption not only challenges their conventional production techniques but also prompts them to reimagine their business models.
Transition from internal combustion engines: As EVs gain prominence, manufacturers are compelled to reorient their production lines towards electric vehicle technologies. This entails significant investments in research and development to design new EV models while phasing out some of the conventional internal combustion engines. The shift towards electric power promises cleaner and more sustainable mobility solutions, aligning with the global push for emission reduction.


Embracing sustainable practices: With EVs, traditional manufacturers are under pressure to embrace sustainable practices throughout their supply chains. From sourcing ethically produced materials for battery production to adopting renewable energy sources for manufacturing processes, the entire ecosystem is being reevaluated. This holistic approach towards sustainability not only minimizes environmental impact but also enhances the overall brand reputation.
`,
  };

  subSectionK = {
    title: 'Opportunities for New Players and Startups in the EV Market',
    content: `The thriving EV market in India presents a plethora of opportunities for new players and startups to enter the industry. The evolving landscape offers a level playing field for innovative minds and adventurous entrepreneurs to make their mark.
Technological innovation: With the advent of EVs, there is a surge in opportunities for technological innovation across various domains. Startups focusing on battery technology, charging infrastructure, software development, and connected mobility solutions are gaining traction. This influx of fresh ideas is pushing boundaries and driving the industry forward, challenging established players to stay competitive.


Collaborations and partnerships: The EV market in India encourages collaborations between startups, established manufacturers, and government organizations. Joint ventures and partnerships are fostering knowledge sharing, resource pooling, and faster implementation of EV-related projects. This collaborative approach not only accelerates progress but also allows for cross-pollination of ideas, ultimately benefitting consumers and the environment.
`,
  };

  subSectionL = {
    title: 'Job Creation and Economic Benefits',
    content: `The growth of the EV market in India brings with it significant job creation and economic prosperity. As the transition to EVs gains momentum, the demand for skilled workers across various sectors rises, providing employment opportunities and economic growth.
Manufacturing and supply chain: The production of EVs requires a skilled workforce, ranging from engineers specialized in electric powertrains to technicians knowledgeable in battery assembly. With increased production and demand, manufacturers are expanding their production facilities and investing in workforce training programs. This surge in job opportunities not only boosts the manufacturing sector but also stimulates economic growth.


Service and infrastructure: As the EV market expands, the need for charging infrastructure and maintenance services grows. This opens up job prospects for electricians, charging station operators, and service technicians specializing in EV diagnostics and repairs. The growth of these service-related sectors not only caters to the immediate needs of EV users but also creates a ripple effect, augmenting the local economy.
As the EV market continues to grow, job creation and economic benefits are unfolding, further solidifying India's pursuit of a greener future. Embracing this transition is not only a step towards sustainability but also an opportunity for the Indian automotive industry to lead the way in the global electric revolution.
`,
  };
  sectionTitle5 = 'Key Factors Driving the Consumer Adoption of EVs in India';

  subSectionM= {
    title: 'Lower operating costs and potential savings',
    content: `One of the primary factors driving consumer adoption of EVs in India is the lower operating costs compared to conventional vehicles. EVs typically have lower maintenance and fuel costs, offering potential long-term savings for the owners. Additionally, government incentives and lower electricity rates further contribute to reducing the overall cost of owning and operating an electric vehicle`,
  };

  subSectionN = {
    title: ' Improved technology and features compared to conventional vehicles',
    content: `Electric vehicles boast advanced technology and features that make them attractive to consumers. From regenerative braking systems to instant torque and seamless connectivity options, EVs offer a superior driving experience. Additionally, the continuous evolution of electric vehicle technology promises exciting innovations that will further enhance their appeal to Indian consumers.`,
  };

  subSectionO = {
    title: 'Public awareness and changing consumer preferences',
    content: `With increasing public awareness about the environmental impact of fossil fuel-powered vehicles, there has been a notable shift in consumer preferences towards greener transportation alternatives. People are actively seeking eco-friendly options, and EVs align perfectly with their desire to contribute to sustainable living. As awareness grows and consumer attitudes change, the demand for EVs in India is expected to soar.`,
  };
  sectionTitle6 = 'Future Trends and Projections for the EV Market in India';

  subSectionP= {
    title: 'Evolving market dynamics and consumer preferences',
    content: `The EV market in India is expected to undergo significant transformations in the coming years. As technology improves, battery costs decline, and charging infrastructure expands, the adoption of EVs is likely to accelerate. Additionally, shifting consumer preferences and the government's commitment to sustainable transportation will fuel further growth in the EV market.`,
  };

  subSectionQ = {
    title: 'Forecasted growth and market share of EVs',
    content: `Industry experts predict robust growth for the EV market in India. Forecasts indicate that EVs will capture a substantial market share in the overall automotive industry. With supportive government policies, increasing consumer acceptance, and technological advancements, EVs are poised to revolutionize the transportation sector in India.`,
  };

  subSectionR= {
    title: 'Potential opportunities for India in the global EV market',
    content: `India's growing expertise and investments in the EV sector position the country as a potential global player in the electric vehicle market. With a massive manufacturing base, skilled workforce, and a robust charging infrastructure, India has the potential to become an exporter of EVs and components. This presents significant economic and technological opportunities, further propelling India towards a greener and sustainable future.`,
  };


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
    this.router.navigate(['/Bikes', Brand]); // Ensure this matches the route configuration
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
    this.router.navigate(['/Selection', twId]);
  }
  

  
}
