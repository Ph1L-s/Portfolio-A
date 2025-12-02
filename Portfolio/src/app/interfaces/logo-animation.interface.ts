/**
 * Configuration interface for logo animation system.
 *
 * Provides complete control over timing, easing, visual styling,
 * and colors for the expandable logo animation.
 */
export interface LogoAnimationConfig {
  /** Timing configuration for animation phases (milliseconds). */
  timing: {
    expandDuration: number;
    lineBreakDuration: number;
    lineBreakDelay: number;
    collapseDuration: number;
    lineReturnDuration: number;
    lineReturnDelay: number;
    colorTransitionDuration: number;
    colorTransitionDelay: number;
  };

  /** Easing functions for different animation phases. */
  easing: {
    expand: string;
    collapse: string;
    lineBreak: string;
  };

  /** Visual styling properties for the logo elements. */
  visual: {
    strokeWidth: number;
    outlineFontWeight: number;
    fillFontWeight: number;
    fillScale: number;
    expandTextFontWeight: number;
    horizontalGap: number;
    verticalGap: number;
  };

  /** Color configuration for logo states and transitions. */
  colors: {
    outlineDefault: string;
    outlineExpanded: string;
    fillDefault: string;
    fillExpanded: string;
    expandTextColor: string;
  };
}

/** Default logo animation configuration values. */
export const DEFAULT_LOGO_CONFIG: LogoAnimationConfig = {
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
    horizontalGap: 0.3,
    verticalGap: 0.005
  },
  colors: {
    outlineDefault: '#3DCFB6',
    outlineExpanded: 'white',
    fillDefault: '#3DCFB6',
    fillExpanded: 'white',
    expandTextColor: '#3DCFB6'
  }
};
