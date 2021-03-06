import React  from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { tap } from 'rxjs/operators';

import { NoteForm, Loading } from '../components';
import { routes } from '../routes';
import { useXhrEffect } from '../hooks/useXhrEffect';
import { CreateEditNote, getNote, updateNote } from '../services/notes';

const Component = (props: RouteComponentProps<{ id: string }>) => {
  const { history, match } = props;
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

  const handleSubmit = (id: number, form: CreateEditNote) =>
    updateNote(id, form)
      .pipe(
        tap(() => history.push(routes.homepage)),
      )
      .toPromise();

  const note = response.data;

  return (
    <div>
      <NoteForm
        onSubmit={form => handleSubmit(note.id, form)}
        submitButtonTitle="Save"
        defaultValues={{
          title: note.title,
        }}
      />
    </div>
  );
};

export const Edit = withRouter(Component);
