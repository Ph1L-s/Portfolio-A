import { Component, signal, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  protected readonly title = signal('Portfolio');

  /**
   * Initializes AOS (Animate On Scroll) library after view is ready.
   * Provides smooth scroll animations for elements as they appear.
   * Only runs in browser (not during SSR).
   */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 800,
          once: true,
          offset: 100
        });
      });
    }
  }

  /**
   * Handles route activation events to scroll to top of page.
   * Called when navigating between routes for better UX.
   */
  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
