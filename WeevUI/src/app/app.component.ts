import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'WEev';

  constructor() {
    // Observe window resize events
    const resizeObserver = new ResizeObserver(() => {
      if (this.isDesktopMode() !== this.previousMode) {
        this.previousMode = this.isDesktopMode();
        window.location.reload(); // Refresh the page
      }
    });
    resizeObserver.observe(document.body); // Observe the body for size changes
  }

  previousMode: boolean = this.isDesktopMode(); // Store the initial mode

  isDesktopMode(): boolean {
    return window.innerWidth > 768;
  }
}
