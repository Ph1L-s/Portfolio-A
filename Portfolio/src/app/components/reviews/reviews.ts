import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * Testimonials carousel component with infinite scrolling functionality.
 *
 * Displays client testimonials in a carousel that can be navigated with previous/next buttons.
 * Uses a triple-array approach to achieve seamless infinite scrolling without visual jumps.
 *
 * @remarks
 * The carousel works by creating three copies of the testimonials array and positioning
 * the viewport to start at the middle copy. When reaching the end of the second copy or
 * the beginning of the first copy, it instantly resets to the middle copy during the
 * transition, creating the illusion of infinite scrolling.
 */
@Component({
  selector: 'app-reviews',
  imports: [TranslateModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class Reviews implements OnInit, OnDestroy {
  private translate = inject(TranslateService);
  private langChangeSubscription?: Subscription;

  /** Responsive breakpoint configuration for card widths. */
  private readonly CARD_CONFIG = {
    gap: 32,
    mobile: { maxWidth: 480, cardWidth: 0 },
    tablet: { maxWidth: 768, cardWidth: 400 },
    small: { maxWidth: 1024, cardWidth: 480 },
    default: { cardWidth: 520 }
  };
  /**
   * Current active testimonial index in the testimonials array.
   * Starts at the middle array (originalTestimonials.length) for infinite scroll.
   */
  currentIndex = 0;

  /**
   * Original testimonials data containing client feedback.
   * This is the source array that gets tripled for infinite scrolling.
   * Loaded dynamically from translation files.
   */
  originalTestimonials: Array<{ text: string; author: string; role: string }> = [];

  /**
   * Tripled testimonials array for infinite scrolling.
   * Contains three copies of originalTestimonials: [original, original, original].
   */
  testimonials: any[] = [];

  /**
   * Flag preventing multiple simultaneous transitions.
   * Set to true during slide animations to ignore navigation button clicks.
   */
  isTransitioning = false;

  /**
   * Initializes the component and sets up language change subscription.
   */
  ngOnInit() {
    this.loadTestimonials();

    // Subscribe to language changes to reload testimonials
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTestimonials();
    });
  }

  /**
   * Cleanup subscription on component destroy.
   */
  ngOnDestroy() {
    this.langChangeSubscription?.unsubscribe();
  }

  /**
   * Loads testimonials from the current translation and initializes the carousel.
   *
   * @remarks
   * The carousel starts at the middle copy (index = originalTestimonials.length) to allow
   * both forward and backward navigation from the initial state.
   */
  private loadTestimonials() {
    this.translate.get('reviews.testimonials').subscribe((testimonials: any[]) => {
      if (testimonials && Array.isArray(testimonials)) {
        this.originalTestimonials = testimonials;
        // Triple array for smooth infinite scrolling
        this.testimonials = [
          ...this.originalTestimonials,
          ...this.originalTestimonials,
          ...this.originalTestimonials
        ];
        // Start at middle item (index 1) of the middle array copy
        this.currentIndex = this.originalTestimonials.length + Math.floor(this.originalTestimonials.length / 2);
      }
    });
  }

  /**
   * Advances to the next testimonial with seamless infinite scroll behavior.
   *
   * When reaching the end of the second array copy, it instantly resets to the
   * middle copy during the CSS transition to maintain the infinite scroll illusion.
   *
   * @returns void
   *
   * @remarks
   * - Prevents multiple simultaneous transitions using isTransitioning guard
   * - Uses 500ms timeout matching the CSS transition duration
   * - Resets to middle array (index = originalTestimonials.length) when reaching 2x length
   * - The instant reset happens during the transition, making it invisible to users
   */
  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;

    if (this.currentIndex >= (2 * this.originalTestimonials.length)) {
      setTimeout(() => {
        this.isTransitioning = false;
        this.currentIndex = this.originalTestimonials.length;
      }, 500);
    } else {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    }
  }

  /**
   * Moves to the previous testimonial with seamless infinite scroll behavior.
   *
   * When reaching the beginning of the middle array copy, it instantly resets to the
   * end of the second copy during the CSS transition to maintain infinite scroll.
   *
   * @returns void
   *
   * @remarks
   * - Prevents multiple simultaneous transitions using isTransitioning guard
   * - Uses 500ms timeout matching the CSS transition duration
   * - Resets to end of second array (2x length - 1) when reaching middle array start
   * - The instant reset happens during the transition, making it invisible to users
   */
  previousSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;

    if (this.currentIndex < this.originalTestimonials.length) {
      setTimeout(() => {
        this.isTransitioning = false;
        this.currentIndex = (2 * this.originalTestimonials.length) - 1;
      }, 500);
    } else {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    }
  }

  /** Gets card width based on current viewport. */
  private getCardWidth(): number {
    if (typeof window === 'undefined') return this.CARD_CONFIG.default.cardWidth;

    const width = window.innerWidth;
    const { mobile, tablet, small } = this.CARD_CONFIG;

    if (width <= mobile.maxWidth) return mobile.cardWidth;
    if (width <= tablet.maxWidth) return tablet.cardWidth;
    if (width <= small.maxWidth) return small.cardWidth;
    return this.CARD_CONFIG.default.cardWidth;
  }

  /** Calculates CSS transform for carousel positioning. */
  getTransform(): string {
    const cardWidth = this.getCardWidth();
    if (cardWidth === 0) return 'none';

    const totalWidth = cardWidth + this.CARD_CONFIG.gap;
    const offset = this.currentIndex * totalWidth;
    return `translateX(calc(50% - ${offset}px - ${cardWidth / 2}px))`;
  }

  /**
   * Gets the currently displayed testimonial object.
   *
   * @returns The testimonial object at the current index with text and author properties
   */
  getCurrentTestimonial() {
    return this.testimonials[this.currentIndex];
  }

  /**
   * Gets the previous testimonial object in the carousel.
   *
   * Uses modulo arithmetic to wrap around to the end of the array if at the beginning.
   *
   * @returns The testimonial object before the current index
   */
  getPrevTestimonial() {
    const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    return this.testimonials[prevIndex];
  }

  /**
   * Gets the next testimonial object in the carousel.
   *
   * Uses modulo arithmetic to wrap around to the beginning of the array if at the end.
   *
   * @returns The testimonial object after the current index
   */
  getNextTestimonial() {
    const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
    return this.testimonials[nextIndex];
  }
}
