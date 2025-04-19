import { Injectable } from '@angular/core';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private isGAInitialized = false;

  constructor() {
    this.loadGoogleAnalytics();
  }

  private loadGoogleAnalytics() {
    console.log("Loading Google Analytics...");

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5WGG8XLBLT';
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Google Analytics script loaded.");

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      window.gtag('js', new Date());
      window.gtag('config', 'G-5WGG8XLBLT');

      this.isGAInitialized = true; 
    };
  }

  trackEvent(eventName: string, eventParams: any = {}) {
    if (!this.isGAInitialized) {
      console.warn('Google Analytics is not initialized yet.');
      return;
    }

    console.log(`Tracking event: ${eventName}`, eventParams);
    window.gtag('event', eventName, eventParams);
  }
}
