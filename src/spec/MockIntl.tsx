import React from 'react';
import { IntlProvider } from 'react-intl';

interface Props {
  children: any;
}

const messages = require('../locale/en.json');

export const MockIntl = ({ children }: Props) => (
  <IntlProvider locale="en" messages={messages}>
    {children}
  </IntlProvider>
);
