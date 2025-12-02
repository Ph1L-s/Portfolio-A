import { Component, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogoAnimationConfig, DEFAULT_LOGO_CONFIG } from '@app/interfaces/logo-animation.interface';

/**
 * Footer component with configurable logo animation.
 *
 * Features a smooth, TypeScript-controlled animation system for the
 * portfolio logo that expands from "P S" to "Phillip Schulze" on hover.
 * The animation is desktop-only (>768px viewport width) and uses CSS
 * custom properties bound from the TypeScript configuration.
 *
 * **Animation Flow:**
 * 1. Mouse hover triggers `isExpanded = true` (desktop only)
 * 2. CSS transitions activate via `.expanded` class binding
 * 3. Text expansion and S vertical movement occur in parallel with staggered timing
 * 4. Colors transition with slight delay for coordinated visual effect
 * 5. Mouse leave triggers collapse with different timing curves for natural feel
 *
 * **Differences from Header:**
 * - **Colors:** Uses light gray (#f5f5f5) instead of white for expanded state
 * - **Spacing:** Slightly larger vertical gap (0.03rem vs 0.005rem) for footer context
 * - **Context:** Appears in footer with social links and legal information
 *
 * **CSS Custom Properties:**
 * All configuration values are bound to CSS custom properties via Angular host bindings,
 * allowing full animation customization without CSS changes. Variables include timing
 * durations, easing functions, colors, font weights, and spacing values.
 *
 * @component
 * @standalone
 */
@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  host: {
    // Bind timing values to CSS custom properties
    '[style.--logo-expand-duration]': 'config.timing.expandDuration + "ms"',
    '[style.--logo-collapse-duration]': 'config.timing.collapseDuration + "ms"',
    '[style.--logo-linebreak-duration]': 'config.timing.lineBreakDuration + "ms"',
    '[style.--logo-linebreak-delay]': 'config.timing.lineBreakDelay + "ms"',
    '[style.--logo-linereturn-duration]': 'config.timing.lineReturnDuration + "ms"',
    '[style.--logo-linereturn-delay]': 'config.timing.lineReturnDelay + "ms"',
    '[style.--logo-color-duration]': 'config.timing.colorTransitionDuration + "ms"',
    '[style.--logo-color-delay]': 'config.timing.colorTransitionDelay + "ms"',

    // Bind easing functions
    '[style.--logo-easing-expand]': 'config.easing.expand',
    '[style.--logo-easing-collapse]': 'config.easing.collapse',
    '[style.--logo-easing-linebreak]': 'config.easing.lineBreak',

    // Bind visual properties
    '[style.--logo-stroke-width]': 'config.visual.strokeWidth + "px"',
    '[style.--logo-outline-weight]': 'config.visual.outlineFontWeight',
    '[style.--logo-fill-weight]': 'config.visual.fillFontWeight',
    '[style.--logo-fill-scale]': 'config.visual.fillScale + "em"',
    '[style.--logo-expand-weight]': 'config.visual.expandTextFontWeight',
    '[style.--logo-horizontal-gap]': 'config.visual.horizontalGap + "rem"',
    '[style.--logo-vertical-gap]': 'config.visual.verticalGap + "rem"',

    // Bind colors
    '[style.--logo-outline-default]': 'config.colors.outlineDefault',
    '[style.--logo-outline-expanded]': 'config.colors.outlineExpanded',
    '[style.--logo-fill-default]': 'config.colors.fillDefault',
    '[style.--logo-fill-expanded]': 'config.colors.fillExpanded',
    '[style.--logo-expand-text-color]': 'config.colors.expandTextColor'
  }
})
export class Footer {
  /**
   * Tracks whether the logo is in expanded state.
   *
   * Bound to the template for toggling the `.expanded` class on the logo element.
   * When `true`, CSS transitions activate to show the full "Phillip Schulze" text.
   */
  isExpanded = false;

  /** Logo animation configuration with footer-specific overrides. */
  config: LogoAnimationConfig = {
    ...DEFAULT_LOGO_CONFIG,
    visual: { ...DEFAULT_LOGO_CONFIG.visual, horizontalGap: 0.5, verticalGap: 0.03 },
    colors: { ...DEFAULT_LOGO_CONFIG.colors, outlineExpanded: '#f5f5f5', fillExpanded: '#f5f5f5' }
  };

  /**
   * Handles mouse enter event on the footer component.
   *
   * Triggers logo expansion only on desktop viewports (width > 768px).
   * Mobile devices are excluded to avoid unwanted animations on touch interactions
   * and to maintain a cleaner, simpler logo presentation on small screens.
   *
   * Sets `isExpanded` to `true`, which triggers the CSS animation via class binding.
   *
   * @listens mouseenter
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      this.isExpanded = true;
    }
  }

  /**
   * Handles mouse leave event on the footer component.
   *
   * Resets logo to collapsed state on all viewport sizes.
   * The collapse animation runs with different timing than expansion
   * (longer duration, different delays) for a more natural feel.
   *
   * Sets `isExpanded` to `false`, triggering the reverse CSS animation.
   *
   * @listens mouseleave
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isExpanded = false;
  }

  /**
   * Scrolls smoothly to the top of the page (hero section).
   *
   * Triggered when clicking on the footer logo (PS / Phillip Schulze).
   * Uses native browser smooth scrolling for a pleasant user experience.
   *
   * @returns void
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
