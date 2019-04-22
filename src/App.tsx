import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Spinner } from 'react-bootstrap';

import { List, Create, Detail, Edit } from './pages'
import { LanguageSwitch } from './components'
import { routes } from './routes'
import { loadLocale } from './services/locale';

import './App.scss';

interface State {
  locale: string;
  messages: null | { [key: string]: string };
}

export class App extends Component<{}, State> {
  state: State = {
    locale: process.env.REACT_APP_DEFAULT_LOCALE,
    messages: null,
  };

  componentDidMount() {
    this.fetchLocale(this.state.locale);
  }

  render() {
    const { locale, messages } = this.state;

    if (!messages) {
      return (
        <Spinner animation="border" role="status"/>
      );
    }
    
    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className="container">
          <div className="col-12 mt-4">
            <LanguageSwitch onLocaleChange={locale => this.fetchLocale(locale)}/>
            <BrowserRouter>
              <Switch>
                <Route path={routes.homepage} exact component={List}/>
                <Route path={routes.createNote} exact component={Create}/>
                <Route path={routes.detail} exact component={Detail}/>
                <Route path={routes.edit} exact component={Edit}/>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </IntlProvider>
    );
  }

  private fetchLocale(locale: string) {
    loadLocale(locale)
      .subscribe(messages => this.setState({
        locale,
        messages,
      }));
  }
}
