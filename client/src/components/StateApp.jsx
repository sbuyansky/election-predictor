import React, { Component } from 'react';
import { feature } from 'topojson-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import geographyObject from '../data/map.json';
import Map from './Map';
import ElectionHeader from './ElectionHeader';
import ElectionTable from './ElectionTable';
import NavBar from './NavBar';
import * as predictionActions from '../actions/predictionActions';

import '../styles/App.css';
import * as constants from '../constants';

class App extends Component {
  constructor() {
    super();
    this.state = {
      geographyPaths: [],
      selectedStateName: 'Massachusetts',
    };

    this.handleStateSelect = this.handleStateSelect.bind(this);
    this.handleWinnerSelect = this.handleWinnerSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePredictionIdChange = this.handlePredictionIdChange.bind(this);
  }

  componentDidMount() {
    const { selectedStateName } = this.state;

    const geographyPaths = feature(
      geographyObject,
      geographyObject.objects[Object.keys(geographyObject.objects)[0]],
    ).features;
    this.setState({ geographyPaths });
    this.handleStateSelect(selectedStateName);
  }

  handleStateSelect(stateName) {
    const { electionType } = this.props;
    let { selectedCandidate } = this.state;

    if(electionType === constants.ELECTION_TYPE_PRIMARY && selectedCandidate){
      this.handleWinnerSelect(selectedCandidate, stateName)
    }
    else{
      this.setState({ selectedStateName: stateName });
    }
  }

  handleWinnerSelect(candidate, stateName) {
    const { actions, electionType } = this.props;
    if (!candidate || !candidate.name || !candidate.party) {
      return;
    }
    if(stateName){
      actions.predictElection({ candidate, stateName, electionType });
    }
    else{
      this.setState({ selectedCandidate: candidate });
    }
  }

  handleSave() {
    const { actions, predictionsAll } = this.props;
    actions.saveData(predictionsAll);
  }

  handleLoad() {
    const { actions, predictionsAll } = this.props;
    actions.loadData(predictionsAll.predictionId);
  }

  handlePredictionIdChange(event) {
    const { actions } = this.props;
    actions.updatePredictionId(event.target.value);
  }

  render() {
    const { data, predictionsAll, electionType } = this.props;
    const { selectedStateName, geographyPaths, selectedCandidate } = this.state;

    const elections = data[electionType];
    const predictions = predictionsAll[electionType];

    return (elections != null
      ? (
        <div className="App container">
          <NavBar 
            handleSave={this.handleSave}
            handleLoad={this.handleLoad}
            handlePredictionIdChange={this.handlePredictionIdChange}
            predictionId={predictionsAll.predictionId}
            electionType={electionType}
          />
          <ElectionHeader
            selectedState={elections[selectedStateName]}
            selectedStatePrediction={predictions[selectedStateName]}
            selectedStateName={selectedStateName}
            handleWinnerSelect={this.handleWinnerSelect}
            selectedCandidate={selectedCandidate}
            electionType={electionType}
          />
          <Map
            geography={geographyPaths}
            elections={elections}
            predictions={predictions}
            handleStateSelect={this.handleStateSelect}
            electionType={electionType}
          />
          <ElectionTable
            elections={elections}
            predictions={predictions}
            handleWinnerSelect={this.handleWinnerSelect}
            selectedStateName={selectedStateName}
            electionType={electionType}
          />
        </div>
      ) : null
    );
  }
}

const mapStateToProps = state => ({
  predictionsAll: state.predictions,
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(predictionActions, dispatch),
});

App.propTypes = {
  predictionsAll: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired,
  electionType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
