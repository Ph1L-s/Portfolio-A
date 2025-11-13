import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * Navigation component with language selection and mobile menu functionality.
 *
 * Provides:
 * - Language switcher (currently EN/DE)
 * - Mobile hamburger menu toggle
 * - Navigation links with routing
 * - Body scroll control when menu is open
 *
 * @remarks
 * The component manages body overflow to prevent background scrolling
 * when the mobile menu is open, improving mobile UX.
 */
@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  /**
   * Translation service for language switching functionality.
   */
  private translate = inject(TranslateService);

  /**
   * Currently selected language code.
   * Defaults to 'EN' (English).
   */
  selectedLanguage: 'EN' | 'DE' = 'EN';

  /**
   * Flag indicating whether the mobile menu is open.
   * Controls menu visibility and body scroll behavior.
   */
  isMenuOpen = false;

  /**
   * Sets the selected language for the application and switches translations.
   *
   * @param lang - Language code to select ('EN' or 'DE')
   * @returns void
   *
   * @remarks
   * Updates the active language and uses TranslateService to load
   * the corresponding translation file (en.json or de.json).
   */
  selectLanguage(lang: 'EN' | 'DE') {
    this.selectedLanguage = lang;
    this.translate.use(lang.toLowerCase());
  }

  /**
   * Toggles the mobile navigation menu open/closed.
   *
   * Controls both the menu visibility and body scroll behavior.
   * When menu opens, body scrolling is disabled. When it closes, scrolling is restored.
   *
   * @returns void
   *
   * @remarks
   * Disabling body overflow prevents the page from scrolling behind the mobile menu overlay,
   * which is essential for a good mobile user experience.
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Closes the mobile navigation menu and restores body scrolling.
   *
   * @returns void
   *
   * @remarks
   * Typically called when a navigation link is clicked to close the menu
   * and allow the user to see the target page content.
   */
  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
}
