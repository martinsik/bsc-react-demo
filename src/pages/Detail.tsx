import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { BackButton, NoteDetail } from '../components';
import { Spinner } from 'react-bootstrap';
import { getNote } from '../services/notes';

interface Props extends RouteComponentProps<{ id: string }> {
}

const Component = ({ match }: Props) => {
  const [ response, setResponse ] = useState();
  const noteId = match.params.id;

  useEffect(() => {
    if (response) {
      return;
    }

    const subscription = getNote(Number(noteId)).subscribe(response => {
      setResponse(response);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [response]);


  if (!response) {
    return (
      <Spinner animation="border" role="status" />
    );
  }

  if (response.error) {
    return (
      <p>Unable to fetch note {noteId}</p>
    );
  }

  return (
    <div>
      <NoteDetail note={response.data} />
      <BackButton />
    </div>
  );
};

export const Detail = withRouter(Component);
