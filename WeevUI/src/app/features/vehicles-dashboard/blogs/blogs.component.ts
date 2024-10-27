import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  blog(){
    this.router.navigate(['/Blog']);
  }
  blog2(){
    this.router.navigate(['/Blog2']);
  }
blog3()
{
  this.router.navigate(['/Blog3']);
}


}
