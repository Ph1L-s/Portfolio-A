import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Configuration interface for logo animation system.
 *
 * Provides complete control over timing, easing, visual styling,
 * and colors for the expandable logo animation. The animation
 * expands "P S" to "Phillip Schulze" with customizable phases.
 *
 * @example
 * ```typescript
 * const config: LogoAnimationConfig = {
 *   timing: { expandDuration: 800, lineBreakDelay: 250, ... },
 *   easing: { expand: 'cubic-bezier(0.4, 0, 0.2, 1)', ... },
 *   visual: { outlineFontWeight: 600, verticalGap: 0.03, ... },
 *   colors: { outlineDefault: '#3DCFB6', outlineExpanded: '#f5f5f5', ... }
 * };
 * ```
 */
export interface LogoAnimationConfig {
  /**
   * Timing configuration for animation phases.
   *
   * Controls durations and delays for expansion, collapse, and color transitions.
   * All values are in milliseconds.
   */
  timing: {
    /** Duration of text expansion animation (expand phase). */
    expandDuration: number;

    /** Duration of letter S vertical movement animation. */
    lineBreakDuration: number;

    /** Delay before S begins moving down during expansion. Typically occurs after ~2 letters are visible. */
    lineBreakDelay: number;

    /** Duration of text collapse animation (collapse phase). */
    collapseDuration: number;

    /** Duration of letter S vertical return animation. */
    lineReturnDuration: number;

    /** Delay before S returns up during collapse. Typically occurs when ~2 letters remain. */
    lineReturnDelay: number;

    /** Duration of color transition animations. */
    colorTransitionDuration: number;

    /** Delay before expand text color changes during expansion. */
    colorTransitionDelay: number;
  };

  /**
   * Easing functions for different animation phases.
   *
   * Uses CSS cubic-bezier notation for smooth acceleration and deceleration.
   * Standard smooth easing: `cubic-bezier(0.4, 0, 0.2, 1)`
   */
  easing: {
    /** Easing function for text expansion animation. */
    expand: string;

    /** Easing function for text collapse animation. */
    collapse: string;

    /** Easing function for vertical line break movement (S moving up/down). */
    lineBreak: string;
  };

  /**
   * Visual styling properties for the logo elements.
   *
   * Controls typography weights, scaling, and spacing between elements.
   */
  visual: {
    /**
     * Outline stroke width in pixels.
     * @deprecated Kept for backwards compatibility but not actively used.
     */
    strokeWidth: number;

    /** Font weight for outline letters (P and S). Typically 600 (semibold). */
    outlineFontWeight: number;

    /**
     * Font weight for fill text inside letters.
     * @deprecated Kept for backwards compatibility but not actively used.
     */
    fillFontWeight: number;

    /**
     * Scale factor for fill text relative to outline.
     * @deprecated Kept for backwards compatibility but not actively used.
     */
    fillScale: number;

    /** Font weight for expanded text (illip and chulze). Typically 600 (semibold). */
    expandTextFontWeight: number;

    /** Horizontal spacing between P and S in collapsed state (in rem units). */
    horizontalGap: number;

    /**
     * Vertical spacing between P and S in expanded state (in rem units).
     * Ultra-tight spacing (e.g., 0.03rem) creates visually aligned stacked text.
     */
    verticalGap: number;
  };

  /**
   * Color configuration for logo states and transitions.
   *
   * Controls colors for outline letters and expanded text in both
   * collapsed and expanded states.
   */
  colors: {
    /** Color of outline letters (P/S) in collapsed state. */
    outlineDefault: string;

    /** Color of outline letters (P/S) in expanded state. */
    outlineExpanded: string;

    /**
     * Fill color in collapsed state.
     * @deprecated Kept for backwards compatibility but not actively used.
     */
    fillDefault: string;

    /**
     * Fill color in expanded state.
     * @deprecated Kept for backwards compatibility but not actively used.
     */
    fillExpanded: string;

    /** Color for expanded text (illip and chulze). */
    expandTextColor: string;
  };
}

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
  imports: [RouterLink, TranslateModule],
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

  /**
   * Logo animation configuration object.
   *
   * Defines all timing, easing, visual, and color properties for the logo animation.
   * All values are bound to CSS custom properties via host binding, allowing
   * full animation customization without modifying styles.
   *
   * **Default Configuration:**
   * - **Expansion:** 800ms text animation with S moving down after 250ms (~2 letters visible)
   * - **Collapse:** 1000ms text animation with S returning after 750ms (~2 letters remain)
   * - **Colors:** Primary green (#3DCFB6) transitions to light gray (#f5f5f5) in expanded state
   * - **Spacing:** Ultra-tight 0.03rem vertical gap for footer context
   */
  config: LogoAnimationConfig = {
    timing: {
      expandDuration: 800,
      lineBreakDuration: 600,
      lineBreakDelay: 250,
      collapseDuration: 1000,
      lineReturnDuration: 700,
      lineReturnDelay: 750,
      colorTransitionDuration: 500,
      colorTransitionDelay: 300
    },

    easing: {
      expand: 'cubic-bezier(0.4, 0, 0.2, 1)',
      collapse: 'cubic-bezier(0.4, 0, 0.2, 1)',
      lineBreak: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },

    visual: {
      strokeWidth: 1.5,
      outlineFontWeight: 600,
      fillFontWeight: 600,
      fillScale: 0.85,
      expandTextFontWeight: 600,
      horizontalGap: 0.5,
      verticalGap: 0.03
    },

    colors: {
      outlineDefault: '#3DCFB6',
      outlineExpanded: '#f5f5f5',
      fillDefault: '#3DCFB6',
      fillExpanded: '#f5f5f5',
      expandTextColor: '#3DCFB6'
    }
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
