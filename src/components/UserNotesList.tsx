import React from 'react';
import { tap } from 'rxjs/operators'

import { Loading } from './Loading';
import { NotesList } from './notes/NotesList';
import { getAllNotes, removeNote } from '../services/notes';
import { useXhrEffect } from '../hooks/useXhrEffect';

export const UserNotesList = () => {
  const [ response, reload ] = useXhrEffect(getAllNotes());

  if (!response) {
    return (
      <Loading />
    );
  }

  if (response.error) {
    return (
      <p>Unable to fetch notes list</p>
    );
  }

  if (response.data.length === 0) {
    return (
      <p>The list is empty</p>
    );
  }

  return (
    <NotesList
      notes={response.data}
      onRemoveNote={note => removeNote(note.id)
        .pipe(
          tap(() => reload()),
        )
      }
    />
  );
};
