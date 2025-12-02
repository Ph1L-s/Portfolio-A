import { Component, AfterViewInit, HostListener } from '@angular/core';
import { Hero } from '@components/hero/hero';
import { About } from '@components/about/about';
import { Skills } from '@components/skills/skills';
import { Projects } from '@components/projects/projects';
import { Reviews } from '@components/reviews/reviews';
import { ContactForm } from '@components/contact-form/contact-form';

/**
 * Home page component - main portfolio page.
 *
 * Serves as the main landing page that composes all portfolio sections:
 * - Hero section with introduction
 * - About section with biography
 * - Skills section with technology showcase
 * - Projects section with featured work
 * - Reviews section with client testimonials
 * - Contact form for inquiries
 */
@Component({
  selector: 'app-home',
  imports: [
    Hero,
    About,
    Skills,
    Projects,
    Reviews,
    ContactForm
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements AfterViewInit {
  private currentSection = 0;
  private sections: HTMLElement[] = [];
  private isMobile = false;
  private wheelThrottleTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly WHEEL_THROTTLE = 100;

  ngAfterViewInit(): void {
    this.sections = Array.from(
      document.querySelectorAll('app-hero, app-about, app-skills, app-projects, app-reviews, app-footer')
    );
    this.isMobile = window.innerWidth <= 1081;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth <= 1081;
  }

  /** Checks if wheel navigation should be skipped. */
  private shouldSkipWheelNavigation(): boolean {
    return this.isMobile || !this.sections.length || !!this.wheelThrottleTimer;
  }

  /** Starts wheel throttle timer. */
  private startThrottleTimer(): void {
    this.wheelThrottleTimer = setTimeout(() => {
      this.wheelThrottleTimer = null;
    }, this.WHEEL_THROTTLE);
  }

  /** Navigates to next or previous section. */
  private navigateSection(direction: number): void {
    const max = this.sections.length - 1;
    this.currentSection = direction > 0
      ? Math.min(this.currentSection + 1, max)
      : Math.max(this.currentSection - 1, 0);
    this.sections[this.currentSection].scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.shouldSkipWheelNavigation()) return;
    event.preventDefault();
    this.startThrottleTimer();
    this.detectCurrentSection();
    this.navigateSection(event.deltaY);
  }

  /** Finds section closest to current viewport. */
  private findClosestSection(): number {
    const viewportTop = window.scrollY;
    return this.sections.reduce((best, section, i) => {
      const distance = Math.abs(viewportTop + section.getBoundingClientRect().top - viewportTop);
      return distance < best.distance ? { index: i, distance } : best;
    }, { index: 0, distance: Infinity }).index;
  }

  /** Syncs currentSection with actual scroll position. */
  private detectCurrentSection(): void {
    this.currentSection = this.findClosestSection();
  }
}
