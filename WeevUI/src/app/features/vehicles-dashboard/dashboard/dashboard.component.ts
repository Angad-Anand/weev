import { Component, OnInit , HostListener} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isVisible: boolean = false; 
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0); 
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isVisible = window.scrollY > 200; // Change 200 to your desired scroll position
  }

  scrollToTop(): void{
    window.scrollTo({top:0,behavior:'smooth'});
  }

}
