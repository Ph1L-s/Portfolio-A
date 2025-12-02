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

  /** Console styling constants. */
  private readonly CONSOLE_STYLES = {
    white: 'color: #FFFFFF; font-weight: bold;',
    green: 'color: #3DCFB6; font-weight: bold;',
    title: 'color: #3DCFB6; font-size: 14px; font-weight: bold;'
  };

  /** ASCII art logo. */
  private readonly ASCII_ART = `
%c██████╗ %c   %c███████╗
%c██╔══██╗%c   %c██╔════╝
%c██████╔╝%c   %c███████╗
%c██╔═══╝ %c   %c╚════██║
%c██║     %c██╗%c███████║
%c╚═╝     %c╚═╝%c╚══════╝`;

  /** Prints ASCII art to console. */
  private printConsoleArt(): void {
    const { white, green } = this.CONSOLE_STYLES;
    const styles = Array(6).fill([white, green, green]).flat();
    console.log(this.ASCII_ART, ...styles);
    console.log('%cFrontend Developer', this.CONSOLE_STYLES.title);
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
