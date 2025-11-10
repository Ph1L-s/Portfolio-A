import { Component } from '@angular/core';

/**
 * Contact page component - standalone contact page.
 *
 * Provides a dedicated route for the contact section, accessible via /contact URL.
 * Currently displays placeholder content.
 *
 * @remarks
 * This component serves as a simple page component. The main contact form
 * functionality is implemented in the ContactForm component which is used
 * on the home page. This page could be expanded to include the ContactForm
 * component or other contact-related content.
 */
@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

}
