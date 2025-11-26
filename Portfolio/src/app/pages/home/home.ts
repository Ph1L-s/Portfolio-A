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

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.isMobile) return;
    event.preventDefault();
    if (!this.sections.length || this.wheelThrottleTimer) return;

    // Throttle wheel events for smoother performance
    this.wheelThrottleTimer = setTimeout(() => {
      this.wheelThrottleTimer = null;
    }, this.WHEEL_THROTTLE);

    // Sync currentSection with actual scroll position
    this.detectCurrentSection();

    if (event.deltaY > 0) {
      this.currentSection = Math.min(this.currentSection + 1, this.sections.length - 1);
    } else {
      this.currentSection = Math.max(this.currentSection - 1, 0);
    }

    this.sections[this.currentSection].scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Detects which section is currently most visible in viewport
   */
  private detectCurrentSection(): void {
    const viewportTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    let bestIndex = 0;
    let bestDistance = Infinity;

    for (let i = 0; i < this.sections.length; i++) {
      const rect = this.sections[i].getBoundingClientRect();
      const sectionTop = viewportTop + rect.top;
      const distance = Math.abs(sectionTop - viewportTop);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    }

    this.currentSection = bestIndex;
  }
}
