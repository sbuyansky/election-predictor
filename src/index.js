/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store/configureStore';
import electionsSenate from './data/elections_senatorial.json';
import electionsGovernor from './data/elections_gubernatorial.json';

import './index.css';

const store = configureStore({ predictions: { electionsSenate, electionsGovernor } });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route
          path="/senate"
          render={props => <App {...props} electionType="electionsSenate" />}
        />
        <Route
          path="/governor"
          render={props => <App {...props} electionType="electionsGovernor" />}
        />
        <Route
          path="/"
          render={props => <App {...props} electionType="electionsSenate" />}
        />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
