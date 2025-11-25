import { Component, signal, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Portfolio');
  private lastScrollTop = 0;
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.printConsoleArt();
  }

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true
    });
  }

  /**
   * Detects scroll direction and applies CSS class to html element.
   * Creates a wave effect on the scrollbar based on scroll direction.
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const html = document.documentElement;

    // Clear previous timeout to debounce
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Determine scroll direction
    if (scrollTop > this.lastScrollTop) {
      html.classList.remove('scrolling-up');
      html.classList.add('scrolling-down');
    } else if (scrollTop < this.lastScrollTop) {
      html.classList.remove('scrolling-down');
      html.classList.add('scrolling-up');
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Remove classes after scrolling stops (smooth fade out)
    this.scrollTimeout = setTimeout(() => {
      html.classList.remove('scrolling-up', 'scrolling-down');
    }, 150);
  }

  ngOnDestroy(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  /**
   * Prints ASCII art initials "P.S" to the browser console.
   * Uses website brand colors (green #3DCFB6 and white).
   */
  private printConsoleArt(): void {
    const asciiArt = `
%c██████╗ %c   %c███████╗
%c██╔══██╗%c   %c██╔════╝
%c██████╔╝%c   %c███████╗
%c██╔═══╝ %c   %c╚════██║
%c██║     %c██╗%c███████║
%c╚═╝     %c╚═╝%c╚══════╝
`;
    const white = 'color: #FFFFFF; font-weight: bold;';
    const green = 'color: #3DCFB6; font-weight: bold;';
    const dot = 'color: #3DCFB6; font-weight: bold;';

    console.log(
      asciiArt,
      white, dot, green,
      white, dot, green,
      white, dot, green,
      white, dot, green,
      white, dot, green,
      white, dot, green
    );

    console.log(
      '%cFrontend Developer',
      'color: #3DCFB6; font-size: 14px; font-weight: bold;'
    );
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
