import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useXhrEffect = <T>(action: Observable<T>): [T, () => void] => {
  const [ response, setResponse ] = useState();

  useEffect(() => {
    if (response) {
      return;
    }

    const subscription = action.subscribe(response => {
      setResponse(response);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [response]);

  const reload = () => setResponse(null);

  return [response, reload];
};
