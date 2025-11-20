import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Configuration interface for logo animation system.
 */
export interface LogoAnimationConfig {
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
  easing: {
    expand: string;
    collapse: string;
    lineBreak: string;
  };
  visual: {
    strokeWidth: number;
    outlineFontWeight: number;
    fillFontWeight: number;
    fillScale: number;
    expandTextFontWeight: number;
    horizontalGap: number;
    verticalGap: number;
  };
  colors: {
    outlineDefault: string;
    outlineExpanded: string;
    fillDefault: string;
    fillExpanded: string;
    expandTextColor: string;
  };
}

/**
 * Footer component with configurable logo animation.
 *
 * Contains copyright information, social links, and legal links
 * with an animated logo matching the header design.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  host: {
    '[style.--logo-expand-duration]': 'config.timing.expandDuration + "ms"',
    '[style.--logo-collapse-duration]': 'config.timing.collapseDuration + "ms"',
    '[style.--logo-linebreak-duration]': 'config.timing.lineBreakDuration + "ms"',
    '[style.--logo-linebreak-delay]': 'config.timing.lineBreakDelay + "ms"',
    '[style.--logo-linereturn-duration]': 'config.timing.lineReturnDuration + "ms"',
    '[style.--logo-linereturn-delay]': 'config.timing.lineReturnDelay + "ms"',
    '[style.--logo-color-duration]': 'config.timing.colorTransitionDuration + "ms"',
    '[style.--logo-color-delay]': 'config.timing.colorTransitionDelay + "ms"',
    '[style.--logo-easing-expand]': 'config.easing.expand',
    '[style.--logo-easing-collapse]': 'config.easing.collapse',
    '[style.--logo-easing-linebreak]': 'config.easing.lineBreak',
    '[style.--logo-stroke-width]': 'config.visual.strokeWidth + "px"',
    '[style.--logo-outline-weight]': 'config.visual.outlineFontWeight',
    '[style.--logo-fill-weight]': 'config.visual.fillFontWeight',
    '[style.--logo-fill-scale]': 'config.visual.fillScale + "em"',
    '[style.--logo-expand-weight]': 'config.visual.expandTextFontWeight',
    '[style.--logo-horizontal-gap]': 'config.visual.horizontalGap + "rem"',
    '[style.--logo-vertical-gap]': 'config.visual.verticalGap + "rem"',
    '[style.--logo-outline-default]': 'config.colors.outlineDefault',
    '[style.--logo-outline-expanded]': 'config.colors.outlineExpanded',
    '[style.--logo-fill-default]': 'config.colors.fillDefault',
    '[style.--logo-fill-expanded]': 'config.colors.fillExpanded',
    '[style.--logo-expand-text-color]': 'config.colors.expandTextColor'
  }
})
export class Footer {
  isExpanded = false;

  config: LogoAnimationConfig = {
    timing: {
      expandDuration: 800,
      lineBreakDuration: 600,
      lineBreakDelay: 250,              // After ~2 letters visible (was 400ms)
      collapseDuration: 1000,
      lineReturnDuration: 700,
      lineReturnDelay: 750,             // When ~2 letters remain (was 1000ms)
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
      verticalGap: 0.03                 // Ultra tight spacing (40% smaller)
    },
    colors: {
      outlineDefault: '#3DCFB6',        // $color-primary (same as copyright)
      outlineExpanded: '#f5f5f5',
      fillDefault: '#3DCFB6',           // $color-primary
      fillExpanded: '#f5f5f5',
      expandTextColor: '#3DCFB6'        // $color-primary
    }
  };

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Only enable animation on desktop (>768px)
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      this.isExpanded = true;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isExpanded = false;
  }
}
