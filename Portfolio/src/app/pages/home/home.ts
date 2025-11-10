import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Skills } from '../../components/skills/skills';
import { Projects } from '../../components/projects/projects';
import { Reviews } from '../../components/reviews/reviews';
import { ContactForm } from '../../components/contact-form/contact-form';

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
 *
 * @remarks
 * This is a container component that orchestrates all major sections of the
 * portfolio into a single-page scrollable layout.
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
