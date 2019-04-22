import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

import { XhrResponse } from '../services/xhr';
import { Note } from '../model/Note';

export const useXhrEffect = (action: Observable<any>): XhrResponse<Note> => {
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

  return response;
};
