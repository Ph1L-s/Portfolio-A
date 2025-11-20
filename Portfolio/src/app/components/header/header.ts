import { Component, HostListener } from '@angular/core';
import { Nav } from '@components/nav/nav';

/**
 * Configuration interface for logo animation system.
 *
 * Provides complete control over timing, easing, visual styling,
 * and colors for the expandable logo animation.
 */
export interface LogoAnimationConfig {
  timing: {
    // Expansion phase timings
    expandDuration: number;           // Duration for text expansion (ms)
    lineBreakDuration: number;        // Duration for S moving down (ms)
    lineBreakDelay: number;           // Delay before S starts moving (ms)

    // Collapse phase timings
    collapseDuration: number;         // Duration for text collapse (ms)
    lineReturnDuration: number;       // Duration for S moving back up (ms)
    lineReturnDelay: number;          // Delay before S moves back (ms)

    // Color transition timings
    colorTransitionDuration: number;  // Duration for color changes (ms)
    colorTransitionDelay: number;     // Delay for expand text color change (ms)
  };

  easing: {
    expand: string;                   // Easing function for expansion
    collapse: string;                 // Easing function for collapse
    lineBreak: string;                // Easing function for line break movement
  };

  visual: {
    // Stroke and outline styles
    strokeWidth: number;              // Outline stroke width (px)
    outlineFontWeight: number;        // Font weight for outline letters (P/S)

    // Fill text styles
    fillFontWeight: number;           // Font weight for small fill letters
    fillScale: number;                // Scale factor for fill text (0-1)

    // Expanded text styles
    expandTextFontWeight: number;     // Font weight for "illip" and "chulze"

    // Layout
    horizontalGap: number;            // Gap between P and S when horizontal (rem)
    verticalGap: number;              // Gap between lines when vertical (rem)
  };

  colors: {
    outlineDefault: string;           // Outline color when collapsed
    outlineExpanded: string;          // Outline color when expanded
    fillDefault: string;              // Fill color when collapsed
    fillExpanded: string;             // Fill color when expanded
    expandTextColor: string;          // Color for expanded text
  };
}

/**
 * Header component with configurable logo animation.
 *
 * Features a smooth, TypeScript-controlled animation system for the
 * portfolio logo. The logo expands from "P S" to "Phillip Schulze"
 * on hover with customizable timing, easing, and visual properties.
 */
@Component({
  selector: 'app-header',
  imports: [Nav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
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
export class Header {
  /**
   * Tracks whether the logo is in expanded state.
   * Bound to the template for class toggling.
   */
  isExpanded = false;

  /**
   * Logo animation configuration.
   *
   * Default values provide smooth, professional animation:
   * - Expansion: 800ms for text, S moves down after 400ms delay
   * - Collapse: 1000ms for text, S returns after 1000ms delay
   */
  config: LogoAnimationConfig = {
    timing: {
      // EXPAND PHASE
      expandDuration: 800,              // Text expands: 0ms → 800ms
      lineBreakDuration: 600,           // S moves down: 250ms → 850ms
      lineBreakDelay: 250,              // After ~2 letters visible (was 400ms)

      // COLLAPSE PHASE
      collapseDuration: 1000,           // Text collapses: 0ms → 1000ms
      lineReturnDuration: 700,          // S moves up: 750ms → 1450ms
      lineReturnDelay: 750,             // When ~2 letters remain (was 1000ms)

      // COLOR TRANSITIONS
      colorTransitionDuration: 500,     // Smooth color change
      colorTransitionDelay: 300         // Slight delay for expand text color
    },

    easing: {
      expand: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Smooth acceleration
      collapse: 'cubic-bezier(0.4, 0, 0.2, 1)',    // Smooth deceleration
      lineBreak: 'cubic-bezier(0.4, 0, 0.2, 1)'    // Smooth vertical movement
    },

    visual: {
      strokeWidth: 1.5,                 // Not used (kept for compatibility)
      outlineFontWeight: 600,           // Font weight for P/S
      fillFontWeight: 600,              // Not used (kept for compatibility)
      fillScale: 0.85,                  // Not used (kept for compatibility)
      expandTextFontWeight: 600,        // Font weight for illip/chulze
      horizontalGap: 0.3,               // Space between P and S horizontally
      verticalGap: 0.005                 // Ultra tight spacing 
    },

    colors: {
      outlineDefault: '#3DCFB6',        // $color-primary (same as copyright)
      outlineExpanded: 'white',
      fillDefault: '#3DCFB6',           // $color-primary
      fillExpanded: 'white',
      expandTextColor: '#3DCFB6'        // $color-primary
    }
  };

  /**
   * Handle mouse enter - expand logo (desktop only).
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Only enable animation on desktop (>768px)
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      this.isExpanded = true;
    }
  }

  /**
   * Handle mouse leave - collapse logo.
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isExpanded = false;
  }
}
