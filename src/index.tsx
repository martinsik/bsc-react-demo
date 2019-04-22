import React from 'react';
import ReactDOM from 'react-dom';
// import { addLocaleData } from 'react-intl';

import { App } from './App';
import * as serviceWorker from './serviceWorker';

// import csLocaleData from 'react-intl/locale-data/cs';

import './index.scss';

// addLocaleData(csLocaleData);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
