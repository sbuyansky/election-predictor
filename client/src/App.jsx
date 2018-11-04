import React, { Component } from 'react';
import { feature } from 'topojson-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Map from './Map';
import geographyObject from './data/map.json';
import ElectionHeader from './ElectionHeader';
import ElectionTable from './ElectionTable';
import NavBar from './NavBar';
import * as predictionActions from './actions/predictionActions';

import './App.css';

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
    this.setState({ selectedStateName: stateName });
  }

  handleWinnerSelect(candidate, stateName) {
    const { actions, electionType } = this.props;
    if (!candidate || !candidate.name || !candidate.party) {
      return;
    }
    actions.predictElection({ candidate, stateName, electionType });
  }

  handleSave() {
    const { actions } = this.props;
    actions.saveData();
  }

  handleLoad() {
    const { actions } = this.props;
    actions.loadData();
  }

  render() {
    const { predictions, electionType } = this.props;
    const { selectedStateName, geographyPaths } = this.state;

    const elections = predictions[electionType];

    return (elections != null
      ? (
        <div className="App container">
          <NavBar 
            handleSave={this.handleSave}
            handleLoad={this.handleLoad}
          />
          <ElectionHeader
            selectedState={elections[selectedStateName]}
            selectedStateName={selectedStateName}
            handleWinnerSelect={this.handleWinnerSelect}
            electionType={electionType}
          />
          <Map
            geography={geographyPaths}
            elections={elections}
            handleStateSelect={this.handleStateSelect}
          />
          <ElectionTable
            elections={elections}
            handleWinnerSelect={this.handleWinnerSelect}
            selectedStateName={selectedStateName}
          />
        </div>
      ) : null
    );
  }
}

const mapStateToProps = state => ({
  predictions: state.predictions,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(predictionActions, dispatch),
});

App.propTypes = {
  predictions: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired,
  electionType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
