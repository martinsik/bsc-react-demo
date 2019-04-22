import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { tap } from 'rxjs/operators'

import { NotesList } from './notes/NotesList';
import { getAllNotes, removeNote } from '../services/notes';

export const UserNotesList = () => {
  const [ response, setResponse ] = useState();

  useEffect(() => {
    if (response) {
      return;
    }

    const subscription = getAllNotes().subscribe(response => {
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
          tap(() => setResponse(null)),
        )
      }
    />
  );
};
