import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen } from 'rxjs/operators';

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

export interface XhrResponse<T> {
  status: number;
  error: boolean;
  data: T;
}

export const makeXhrRequest = <T>(request: AjaxRequest): Observable<XhrResponse<T>> =>
  ajax(request).pipe(
    retryWhen(errors => errors.pipe( // Make `MAX_RETRIES` and then emit error response
      mergeMap((error, index) => index === MAX_RETRIES ? throwError(error) : of(error)),
      delay(RETRY_DELAY),
    )),
    map((response: AjaxResponse) => {
      if (!response.response) {
        throw Error();
      }

      return {
        status: response.status,
        error: false,
        data: response.response,
      }
    }),
    catchError(error => of({
      status: error.status,
      error: true,
      data: error.response,
    })),
  );

export const makeXhrApiRequest = <T>(request: AjaxRequest) => makeXhrRequest<T>({
  ...request,
  url: `${process.env.REACT_APP_API_URL}/${request.url}`,
});

