import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

type Translations = {
  ID: string;
  Key: string;
  Value: string;
  Locale: string;
};

export class TranslationHttpLoader implements TranslateLoader {
  constructor(private httpClient: HttpClient) {}

  public getTranslation(lang: string): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:3000/translation/${lang}`)
      .pipe(
        map((res: Translations[]) => {
          let transformed: { [key: string]: string } = {};

          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            transformed[item.Key] = item.Value;
          }

          return transformed;
        })
      );
  }
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return '';
  }
}
