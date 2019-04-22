import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { UserNotesList, PrimaryButton } from '../components';
import { routes } from '../routes';

const Component = () => (
  <div>
    <h1><FormattedMessage id="notes.list.title" /></h1>
    <div>
      <UserNotesList />
    </div>
    <PrimaryButton link={routes.createNote}><FormattedMessage id="notes.create.title" /></PrimaryButton>
  </div>
);

export const List = withRouter(Component);
