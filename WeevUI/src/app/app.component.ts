import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from './modules/_services/google-analytics.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'WEev';

  constructor(private gaService: GoogleAnalyticsService, private router: Router) {
    // Observe window resize events
    const resizeObserver = new ResizeObserver(() => {
      if (this.isDesktopMode() !== this.previousMode) {
        this.previousMode = this.isDesktopMode();
        window.location.reload(); // Refresh the page
      }
    });
    resizeObserver.observe(document.body); // Observe the body for size changes
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.gaService.trackEvent('page_view', { page_path: event.urlAfterRedirects });
      }
    });
  }

  previousMode: boolean = this.isDesktopMode(); // Store the initial mode

  isDesktopMode(): boolean {
    return window.innerWidth > 768;
  }
}
