import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MockIntl } from './MockIntl';

interface Props {
  children: any;
}

export const MockApp = ({ children }: Props) => (
  <MockIntl>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </MockIntl>
);
