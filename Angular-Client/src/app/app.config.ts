import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers:
  [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    provideHttpClient(), provideHttpClient(withInterceptors([errorInterceptor])),
    provideHttpClient(withInterceptors([loadingInterceptor])), importProvidersFrom(BrowserAnimationsModule),
    provideToastr({timeOut:5000, positionClass:'toast-bottom-right',preventDuplicates: true}),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
};
