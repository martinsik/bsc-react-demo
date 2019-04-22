import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { History } from 'history';
import { FormattedMessage } from 'react-intl';

import { routes } from '../../routes';

interface Props {
  history: History
}

const Component = ({ history }: Props) => (
  <Button variant="secondary" onClick={() => history.push(routes.homepage)}>
    <FormattedMessage id="common.button.back" />
  </Button>
);

export const BackButton = withRouter(Component);
