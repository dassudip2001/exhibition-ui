import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Constants } from './core/models/constants';
import { ApiHttpService } from './core/services/api-http.service';
import { UrlBuilderHelper } from './core/helpers/url-builder.helper';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { UrlBuilderService } from './core/services/url-builder.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    Constants,
    ApiHttpService,
    UrlBuilderService,
    provideAnimations(),
    UrlBuilderService
  ]
};
