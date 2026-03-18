import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/headers/header-interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { errorInterceptorInterceptor } from './core/interceptors/errors/error-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions(),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerInterceptor, loadingInterceptor, errorInterceptorInterceptor]),
    ),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule),
    provideCharts(withDefaultRegisterables()),
  ],
};
