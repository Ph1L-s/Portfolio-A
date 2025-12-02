import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
 * - LocalStorage persistence for language selection
 *
 * @remarks
 * The component manages body overflow to prevent background scrolling
 * when the mobile menu is open, improving mobile UX.
 * Language preference is persisted in browser's LocalStorage.
 */
@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav implements OnInit {
  /**
   * Translation service for language switching functionality.
   */
  private translate = inject(TranslateService);

  /**
   * Router service for navigation between pages.
   */
  private router = inject(Router);

  /**
   * LocalStorage key for storing the selected language.
   */
  private readonly LANGUAGE_STORAGE_KEY = 'selectedLanguage';

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
   * Initializes the component and loads the saved language preference.
   *
   * @remarks
   * Checks LocalStorage for a previously saved language preference.
   * If found, sets the language to the saved value.
   * Otherwise, defaults to 'EN' (English).
   */
  ngOnInit() {
    const savedLanguage = localStorage.getItem(this.LANGUAGE_STORAGE_KEY) as 'EN' | 'DE' | null;
    if (savedLanguage && (savedLanguage === 'EN' || savedLanguage === 'DE')) {
      this.selectedLanguage = savedLanguage;
      this.translate.use(savedLanguage.toLowerCase());
    } else {
      this.translate.use('en');
    }
  }

  /**
   * Sets the selected language for the application and switches translations.
   *
   * @param lang - Language code to select ('EN' or 'DE')
   * @returns void
   *
   * @remarks
   * Updates the active language, uses TranslateService to load
   * the corresponding translation file (en.json or de.json),
   * and persists the selection to LocalStorage.
   */
  selectLanguage(lang: 'EN' | 'DE') {
    this.selectedLanguage = lang;
    this.translate.use(lang.toLowerCase());
    localStorage.setItem(this.LANGUAGE_STORAGE_KEY, lang);
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

  /** Scrolls to element by ID with smooth behavior. */
  private scrollToElement(sectionId: string) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Scrolls to section, navigating to home first if needed. */
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.closeMenu();

    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToElement(sectionId), 100);
      });
    } else {
      this.scrollToElement(sectionId);
    }
  }
}
