import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Footer component displayed at the bottom of all pages.
 *
 * Contains:
 * - Copyright information
 * - Social media links
 * - Legal links (Legal Notice, Privacy Policy)
 * - Additional navigation links
 *
 * @remarks
 * Uses RouterLink for internal navigation to legal pages while maintaining
 * single-page application behavior.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
