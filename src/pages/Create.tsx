import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { tap } from 'rxjs/operators';

import { NoteForm } from '../components';
import { routes } from '../routes';
import { createNote, CreateEditNote } from '../services/notes';

interface Props extends InjectedIntlProps, RouteComponentProps {
}

const Component = (props: Props) => {
  const { history, intl } = props;
  const handleSubmit = (form: CreateEditNote) =>
    createNote(form)
      .pipe(
        tap(() => history.push(routes.homepage)),
      )
      .toPromise();

  return (
    <div>
      <h1><FormattedMessage id="notes.create.title" /></h1>
      <NoteForm
        submitButtonTitle={intl.formatMessage({ id: 'notes.form.create' })}
        onSubmit={form => handleSubmit(form)}
      />
    </div>
  );
};

export const Create = injectIntl(withRouter(Component));
