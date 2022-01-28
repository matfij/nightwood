import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { DEFAULT_LANG, STORAGE_PREFIX } from './core/configuration';
import { AuthInterceptor } from './client/interceptors/auth.interceptor';
import { environment } from 'src/environments/environment';
import { API_BASE_URL } from './client/api';
import { ErrorInterceptor } from './client/interceptors/error.interceptor';
import { SocketIoModule } from 'ngx-socket-io';
import { ACCESS_TOKEN } from './common/services/store.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function getAccessToken() {
  return localStorage.getItem(STORAGE_PREFIX + ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SocketIoModule.forRoot({
      url: environment.apiUrl,
      options: { transportOptions: { polling: { extraHeaders: { Authorization: getAccessToken() } } } },
    })
  ],
  providers: [
    { provide: API_BASE_URL, useFactory: () => environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(
    translateService: TranslateService,
  ) {
    translateService.setDefaultLang(DEFAULT_LANG);
    translateService.use(DEFAULT_LANG);
  }
}
