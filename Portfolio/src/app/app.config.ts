import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

/**
 * Initializes translations before app bootstrap.
 * Always loads English first as default, then applies saved language preference.
 * This ensures translations are ready when components first render.
 */
export function initializeTranslations(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('selectedLanguage')?.toLowerCase();
    const langToUse = savedLang && (savedLang === 'en' || savedLang === 'de') ? savedLang : 'en';
    return translate.use(langToUse).toPromise();
  };
}

/**
 * Application configuration for the Angular portfolio.
 *
 * Configures core Angular providers including:
 * - Error handling
 * - Zoneless change detection for improved performance
 * - Router with application routes
 * - Client-side hydration with event replay for SSR
 * - HTTP client for API communication
 *
 * @remarks
 * This configuration uses Angular's modern standalone API and zoneless
 * change detection for optimal performance. Event replay is enabled for
 * better user experience during server-side rendering hydration.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Provides global error listeners for unhandled errors and promise rejections
     */
    provideBrowserGlobalErrorListeners(),

    /**
     * Enables zoneless change detection for improved performance.
     * Components use signals and explicit change detection instead of zone.js.
     */
    provideZonelessChangeDetection(),

    /**
     * Configures routing with application route definitions.
     * Uses PreloadAllModules strategy to preload lazy-loaded routes
     * after the initial load for improved navigation performance.
     */
    provideRouter(routes, withPreloading(PreloadAllModules)),

    /**
     * Enables client-side hydration with event replay.
     * Preserves user interactions during the hydration process for better UX.
     */
    provideClientHydration(withEventReplay()),

    /**
     * Provides HTTP client for making API requests (used by contact form)
     */
    provideHttpClient(),

    /**
     * Configures translation service with default language settings.
     * Loads translations from assets/i18n/ directory.
     */
    provideTranslateService({
      defaultLang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      })
    }),

    /**
     * Initializes translations before app renders.
     * Prevents translation keys from showing on first load.
     */
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslateService],
      multi: true
    },

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
