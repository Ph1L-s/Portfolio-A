import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portfolio');

  constructor() {
    this.printConsoleArt();
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
