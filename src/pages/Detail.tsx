import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { BackButton, NoteDetail, Loading } from '../components';
import { getNote } from '../services/notes';
import { useXhrEffect } from '../hooks/useXhrEffect';

interface Props extends RouteComponentProps<{ id: string }> {
}

const Component = ({ match }: Props) => {
  const noteId = match.params.id;

  const [ response ] = useXhrEffect(getNote(Number(noteId)));

  if (!response) {
    return (
      <Loading />
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
