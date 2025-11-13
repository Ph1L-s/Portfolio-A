import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
