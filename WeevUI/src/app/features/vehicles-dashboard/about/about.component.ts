import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/modules/_services/vehicles.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})



export class AboutComponent {

  teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      imageUrl: 'assets/images/john.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'Chief Technology Officer',
      imageUrl: 'assets/images/jane.jpg'
    },
    {
      name: 'Alice Brown',
      role: 'Head of Marketing',
      imageUrl: 'assets/images/alice.jpg'
    }
  ];
}

  


