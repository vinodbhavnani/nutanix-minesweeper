/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';
import HomePage from 'containers/HomePage/Loadable';
import GamePage from 'containers/GamePage/connect';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Header and Footer
import Header from 'components/Header';

import GlobalStyle from '../../global-styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/game" component={GamePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
export default hot(App);
