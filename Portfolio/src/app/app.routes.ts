import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home';
import { Contact } from '@app/contact/contact';
import { LegalNoticeComponent } from '@pages/legal-notice/legal-notice';
import { Privacy } from '@pages/privacy/privacy';

/**
 * Application routing configuration.
 *
 * Defines all routes for the Angular portfolio application with their
 * corresponding components. Uses a wildcard route to redirect unknown
 * paths back to the home page.
 *
 * @remarks
 * Route structure:
 * - '' (root) - Main portfolio home page
 * - 'contact' - Contact page with form
 * - 'legal' - Legal notice and privacy policy
 * - '**' - Wildcard catch-all that redirects to home
 */
export const routes: Routes = [
  /**
   * Home page route - displays the main portfolio with all sections
   */
  { path: '', component: HomeComponent },

  /**
   * Contact page route - standalone contact form page
   */
  { path: 'contact', component: Contact },

  /**
   * Legal notice page route - displays legal information and imprint
   */
  { path: 'legal', component: LegalNoticeComponent },

  /**
   * Privacy policy page route - displays data protection information
   */
  { path: 'privacy', component: Privacy },

  /**
   * Wildcard route - catches all unmatched routes and redirects to home
   */
  { path: '**', redirectTo: '' }
];
