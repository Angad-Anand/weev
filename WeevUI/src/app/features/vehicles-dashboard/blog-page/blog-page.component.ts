import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})

export class BlogPageComponent {
  blogs = [
    { 
      id: 1, 
      title: 'Driving Towards a Greener Future: Exploring the EV Market in India', 
      sectionTitle: 'Introduction to the EV Market',
      content: 'Electric vehicles have come a long way in recent years, with advancements in battery technology and charging infrastructure. Despite their growing popularity, there are still many misconceptions about EVs that need to be addressed. In this blog post, we will explore some of the most common myths and provide factual information to help you understand the benefits and limitations of electric vehicles.',
      heading:'Importance of Transitioning to EVs for a Sustainable Future',
      para:' Transitioning to electric vehicles is crucial for ensuring a sustainable and greener future. EVs produce zero tailpipe emissions, reducing air pollution and mitigating the adverse effects of climate change. By embracing EVs, we can significantly reduce our carbon footprint, improve air quality, and safeguard the environment for future generations.'  ,
      imageUrl: 'assets/images/blogs/1.jpg'
    },
    { 
      id: 2, 
      title: 'A Beginners Guide to Owning an Electric Vehicle: What You Need to Know', 
      sectionTitle: 'Introduction',
      content: 'The electric vehicle revolution has been gaining momentum in recent years, with more and more people opting for these environmentally friendly alternatives to traditional vehicles. In this beginners guide, we will explore the reasons behind the growing popularity of electric vehicles and delve into the important factors one should consider when making the switch.',
      heading:'Environmental Benefits of Electric Vehicles',
      para:' One of the most significant advantages of electric vehicles is their positive impact on the environment. Unlike traditional vehicles that rely on fossil fuels, electric vehicles produce zero tailpipe emissions, helping to reduce air pollution and combat climate change. By choosing an electric vehicle, you can play a role in creating a cleaner and greener future for generations to come',
      imageUrl: 'assets/images/blogs/2.jpg'


    },
    { 
      id: 3, 
      title: 'Debunking Myths About Electric Vehicles: Separating Fact from Fiction', 
      sectionTitle: 'Introduction to Electric Vehicles (EVs)',
      content: 'Electric vehicles have come a long way in recent years, with advancements in battery technology and charging infrastructure. Despite their growing popularity, there are still many misconceptions about EVs that need to be addressed. In this blog post, we will explore some of the most common myths and provide factual information to help you understand the benefits and limitations of electric vehicles.',
      heading:'Myth 1: EVs Have Limited RangeElectric Vehicle',
      para:' One of the most persistent myths about EVs is that they have limited range. While earlier models may have had shorter ranges, modern EVs are capable of traveling hundreds of miles on a single charge. With the rapid expansion of charging infrastructure, it`s becoming increasingly easy to find charging stations along popular routes. Additionally, many EV owners choose to charge their vehicles at home, ensuring they have a full charge for their daily commute..',
      imageUrl: 'assets/images/blogs/3.jpg'


    },
    // { 
    //   id: 4, 
    //   title: 'The Rise of Charging Stations: A Backbone for EV Adoption', 
    //   sectionTitle: 'Charging Station Infrastructure',
    //   content: 'The development of widespread charging infrastructure is critical for the growth of EVs worldwide.'
    // },
    // { 
    //   id: 5, 
    //   title: 'The Future is Electric: How EVs Are Transforming Transportation', 
    //   sectionTitle: 'Future of Transportation',
    //   content: 'EVs are reshaping how we move, offering greener and more innovative transportation solutions.'
    // },
  ];

  visibleBlogs = this.blogs.slice(0, 4); // Initially show the first 4 blogs.

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSelect(blogId: number): void {
    if(blogId===1){
      this.router.navigate(['/Blog']);
    }
    else if(blogId===2){
      this.router.navigate(['/Blog2']);
    }
    else if(blogId===3){
      this.router.navigate(['/Blog3']);
    }
  }
}
  
