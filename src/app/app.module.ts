import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MyMissingTranslationHandler, TranslationHttpLoader } from './translation-http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslationHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
      },
      defaultLanguage: environment.language,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
