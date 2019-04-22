import { forkJoin, of, from, BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { tap, withLatestFrom, mergeMap, map, catchError } from 'rxjs/operators';
import { addLocaleData } from 'react-intl';

import { makeXhrRequest } from './xhr';

const PUBLIC_LOCALES_PATH = `${process.env.PUBLIC_URL}locale`;

export interface LocaleMessages {
  [key: string]: string;
}

interface LocaleCache {
  [key: string]: LocaleMessages
}

const cache$ = new BehaviorSubject<LocaleCache>({});

const loadLocaleDataModule = (locale: string) => {
  return from(import(`../../node_modules/react-intl/locale-data/${locale}`)).pipe(
    map(module => module.default),
  );
};

const loadMessages = (locale: string) => makeXhrRequest<LocaleMessages>({
  url: `/${PUBLIC_LOCALES_PATH}/${locale}.json`,
});

export const loadLocale = (locale: string): Observable<LocaleMessages> =>
  of(locale).pipe(
    withLatestFrom(cache$),
    mergeMap(([locale, cache]) => {
      const cachedLocale = cache[locale];

      if (cachedLocale) {
        return of(cachedLocale);
      }

      return forkJoin(
        loadLocaleDataModule(locale),
        loadMessages(locale),
      ).pipe(
        map(([localeData, messagesResponse]) => {
          if (!localeData || messagesResponse.error) {
            throw new Error(locale);
          }

          return [localeData, messagesResponse.data];
        }),
        tap(([localeData, _]) => addLocaleData(localeData)),
        map(([_, messages]) => messages),
        tap({
          next: messages => cache$.next({
            ...cache,
            [locale]: messages
          }),
          error: e => console.log(`Error while loading locale "${locale}"`, e),
        }),
        catchError(() => EMPTY),
      )
    })
  );
