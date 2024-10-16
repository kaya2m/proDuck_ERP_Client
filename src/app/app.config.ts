import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    { provide: 'BASE_URL', useValue: 'http://localhost:8080/api' },
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(NgxSpinnerModule),
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken');
        },
        allowedDomains: ['localhost:8080']
      }
    }))
  ],
};
export class DattaConfig {
  static layout: string = 'vertical';
  static isCollapseMenu: Boolean = false;
}
