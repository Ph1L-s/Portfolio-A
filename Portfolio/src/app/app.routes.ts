import { Routes } from '@angular/router';

/**
 * Application routing configuration.
 *
 * Defines all routes for the Angular portfolio application with their
 * corresponding components. Uses lazy loading for optimal performance
 * and code splitting. All routes are loaded on-demand when accessed.
 *
 * @remarks
 * Route structure:
 * - '' (root) - Main portfolio home page (lazy loaded)
 * - 'contact' - Contact page with form (lazy loaded)
 * - 'legal' - Legal notice and privacy policy (lazy loaded)
 * - 'privacy' - Privacy policy page (lazy loaded)
 * - '**' - Wildcard catch-all that redirects to home
 *
 * Note: Section components within pages (Hero, About, Skills, etc.) are
 * NOT lazy loaded to ensure immediate display during scrolling.
 */
export const routes: Routes = [
  /**
   * Home page route - displays the main portfolio with all sections
   * Lazy loaded for optimal initial bundle size
   */
  {
    path: '',
    loadComponent: () => import('@pages/home/home').then(m => m.HomeComponent)
  },

  /**
   * Contact page route - standalone contact form page
   * Lazy loaded as it's only accessed on-demand
   */
  {
    path: 'contact',
    loadComponent: () => import('@app/contact/contact').then(m => m.Contact)
  },

  /**
   * Legal notice page route - displays legal information and imprint
   * Lazy loaded as it's only accessed on-demand
   */
  {
    path: 'legal',
    loadComponent: () => import('@pages/legal-notice/legal-notice').then(m => m.LegalNoticeComponent)
  },

  /**
   * Privacy policy page route - displays data protection information
   * Lazy loaded as it's only accessed on-demand
   */
  {
    path: 'privacy',
    loadComponent: () => import('@pages/privacy/privacy').then(m => m.Privacy)
  },

  /**
   * Wildcard route - catches all unmatched routes and redirects to home
   */
  { path: '**', redirectTo: '' }
];
