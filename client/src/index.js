/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StateApp from './components/StateApp';
import HouseApp from './components/HouseApp';
import ResultsApp from './components/ResultsApp';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store/configureStore';
import * as constants from './constants';

import electionsSenate from './data/2018/elections_senatorial.json';
import electionsGovernor from './data/2018/elections_gubernatorial.json';
import housePartisanIndex from './data/2018/house_partisan_index.json';

import electionsPrimary from './data/2020/primary_elections.json';

import './styles/index.css';

const store = configureStore(
  {
    predictions:
    {
      [constants.ELECTION_TYPE_SENATE]: {},
      [constants.ELECTION_TYPE_GOVERNOR]: {},
      [constants.ELECTION_TYPE_HOUSE]: 218,
      predictionId: ''
    },
    data:
    {
      [constants.ELECTION_TYPE_HOUSE]: housePartisanIndex.partisan_index,
      [constants.ELECTION_TYPE_SENATE]: electionsSenate,
      [constants.ELECTION_TYPE_GOVERNOR]: electionsGovernor,
      [constants.ELECTION_TYPE_PRIMARY]: electionsPrimary,
    },
  }
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route
          path="/senate"
          render={props => <StateApp {...props} electionType={constants.ELECTION_TYPE_SENATE} />}
        />
        <Route
          path="/house"
          render={props => <HouseApp {...props} electionType={constants.ELECTION_TYPE_HOUSE} />}
        />
        <Route
          path="/governor"
          render={props => <StateApp {...props} electionType={constants.ELECTION_TYPE_GOVERNOR} />}
        />
        <Route
          path="/primary"
          render={props => <StateApp {...props} electionType={constants.ELECTION_TYPE_PRIMARY} />}
        />
        <Route
          path="/results"
          exact
          render={props => <ResultsApp {...props} electionType={constants.ELECTION_TYPE_RESULTS} />}
        />
        <Route
          path="/"
          exact
          render={props => <StateApp {...props} electionType={constants.ELECTION_TYPE_SENATE} />}
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
