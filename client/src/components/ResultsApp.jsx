import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import * as predictionActions from '../actions/predictionActions';
import NavBar from './NavBar';
import ResultsTable from './ResultsTable';
import ResultsTableHouse from './ResultsTableHouse';
import Helpers from '../Helpers';
import * as constants from '../constants';

import '../styles/ResultsApp.css';

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: Helpers.getBaseURL()
});

class ResultsApp extends Component {
  constructor() {
    super();
    this.state = {
      predictions: [],
      showCloseRacesOnly: true,
      showDifferencesOnly: false,
      closeRaces: [],
      differences: [],
    };

    this.findDifferences = this.findDifferences.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(filterState){
    switch(filterState){
      case 'showAll':
        this.setState({
          showCloseRacesOnly: false,
          showDifferencesOnly: false
        })
        return;
      case 'showCloseRacesOnly':
        this.setState({
          showCloseRacesOnly: true,
          showDifferencesOnly: false
        })
        return;
      case 'showDifferencesOnly':
        this.setState({
          showCloseRacesOnly: false,
          showDifferencesOnly: true
        })
        return;
      default:
    }
  }

  findDifferences(predictions){
    const electionTypes = [constants.ELECTION_TYPE_GOVERNOR, constants.ELECTION_TYPE_SENATE];
    let differences = {};

    electionTypes.forEach(electionType => {
      let states = [];
      predictions.forEach(prediction => {
        states = [...new Set([...states, ...Object.keys(prediction[electionType])])]
      });
      
      states = states.filter(state => {
        let candidate = null;
        let isDifference = false;

        predictions.forEach(prediction => {
          if(prediction.predictionId === constants.RESULT_PREDICTION_NAME){
            return;
          }

          if(candidate === null){
            candidate = prediction[electionType][state];
          }
          
          if(!_.isEqual(candidate, prediction[electionType][state])){
            isDifference = true;
          }
        });
        return isDifference;
      });

      differences[electionType] = states;
    });
    return differences;
  }

  componentDidMount() {
    const targetPredictions = [constants.RESULT_PREDICTION_NAME, 'Sam', 'Ben', 'Spencer'];
    const queryString = `string_identifiers=${targetPredictions.join('&string_identifiers=')}`

    this.setState({
      closeRaces : {
        [constants.ELECTION_TYPE_GOVERNOR] : [
          'Nevada',
          'Iowa',
          'Kansas',
          'Ohio',
          'Wisconsin',
          'Georgia',
          'South Dakota',
          'Alaska',
          'Florida',
        ],
        [constants.ELECTION_TYPE_SENATE] : [
          'Missouri',
          'Nevada',
          'Arizona',
          'North Dakota',
          'Florida',
          'Indiana',
          'Texas',
          'Montana',
          'West Virginia',
          'New Jersey',
          'Tennessee'
        ]
      }
    });

    client.get(`/predictions?${queryString}`)
      .then((response) => {
        this.setState({ 
          predictions: response.data.predictions,
          differences: this.findDifferences(response.data.predictions)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { electionType, data } = this.props;
    const { predictions } = this.state;

    let filteredElections = {};

    const electionTypes = [constants.ELECTION_TYPE_GOVERNOR, constants.ELECTION_TYPE_SENATE];
    electionTypes.forEach(electionType => {
      filteredElections[electionType] = Object.keys(data[electionType]);

      if(this.state.showCloseRacesOnly){
        filteredElections[electionType] = _.intersection(filteredElections[electionType], this.state.closeRaces[electionType]);
      }
      if(this.state.showDifferencesOnly){
        filteredElections[electionType] = _.intersection(filteredElections[electionType], this.state.differences[electionType]);
      }
    });

    console.log(filteredElections);

    return (
        <div className="App container">
          <NavBar
            handlePredictionIdChange={this.handlePredictionIdChange}
            electionType={electionType}
          />
          <div>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label className={"btn btn-light" + (this.state.showCloseRacesOnly ? ' active' : '')}>
                <input type="radio" name="options" id="option2" autocomplete="off" checked={this.state.showCloseRacesOnly} onClick={() => this.toggleFilter('showCloseRacesOnly')}/> Close Races
              </label>
              <label className={"btn btn-light" + (this.state.showDifferencesOnly ? ' active' : '')}>
                <input type="radio" name="options" id="option3" autocomplete="off" checked={this.state.showDifferencesOnly} onClick={() => this.toggleFilter('showDifferencesOnly')}/> Differences
              </label>
              <label className={"btn btn-light" + (!this.state.showCloseRacesOnly && !this.state.showDifferencesOnly ? ' active' : '')}>
                <input type="radio" name="options" id="option1" autocomplete="off" checked={!this.state.showCloseRacesOnly && !this.state.showDifferencesOnly} onClick={() => this.toggleFilter('showAll')}/> All
              </label>
            </div>
          </div>
          <ResultsTable
            predictions={predictions}
            elections={filteredElections}
            electionType ={constants.ELECTION_TYPE_SENATE}
          />
          <ResultsTable
            predictions={predictions}
            elections={filteredElections}
            electionType ={constants.ELECTION_TYPE_GOVERNOR}
          />
          <ResultsTableHouse
            predictions={predictions}
            electionType ={constants.ELECTION_TYPE_HOUSE}
          />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(predictionActions, dispatch),
});

ResultsApp.propTypes = {
  data: PropTypes.any.isRequired,
  electionType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsApp);
