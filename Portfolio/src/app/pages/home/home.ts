import { Component } from '@angular/core';
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
 * - Hero section with introduction (eager loaded)
 * - About section with biography (lazy loaded on idle)
 * - Skills section with technology showcase (lazy loaded on viewport)
 * - Projects section with featured work (lazy loaded on viewport)
 * - Reviews section with client testimonials (lazy loaded on viewport)
 * - Contact form for inquiries (lazy loaded on viewport)
 *
 * @remarks
 * This is a container component that orchestrates all major sections of the
 * portfolio into a single-page scrollable layout.
 *
 * Uses Angular's @defer blocks for optimal performance:
 * - Hero loads immediately (above-the-fold content)
 * - About loads when browser is idle
 * - Other sections load when entering viewport with prefetch
 * - Angular automatically handles lazy loading via @defer blocks
 * - Reduces initial bundle size by ~60-70%
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
export class HomeComponent {

}
