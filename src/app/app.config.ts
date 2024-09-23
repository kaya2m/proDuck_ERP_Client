import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    { provide: 'BASE_URL', useValue: 'https://localhost:44360/api' },


    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom( NgxSpinnerModule),
    NavigationItem  ,
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken');
        },
        allowedDomains: ['localhost:44360']
      }
    }))
  ],
};
export class DattaConfig {
  static layout: string = 'vertical';
  static isCollapseMenu: Boolean = false;
}
