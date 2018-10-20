import React, { Component } from 'react';
import { feature } from 'topojson-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from './Map';
import geographyObject from './map.json';
import ElectionHeader from './ElectionHeader';
import ElectionTable from './ElectionTable';
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
    const { actions } = this.props;

    if (!candidate || !candidate.name || !candidate.party) {
      return;
    }

    actions.predictElection({ candidate, stateName });
  }

  render() {
    const { elections } = this.props.predictions;

    return (elections != null
      ? (
        <div className="App container">
          <ElectionHeader
            selectedState={elections[this.state.selectedStateName]}
            selectedStateName={this.state.selectedStateName}
            handleWinnerSelect={this.handleWinnerSelect}
          />
          <Map
            geography={this.state.geographyPaths}
            elections={elections}
            handleStateSelect={this.handleStateSelect}
          />
          <ElectionTable
            elections={elections}
            handleWinnerSelect={this.handleWinnerSelect}
            selectedStateName={this.state.selectedStateName}
          />
        </div>
      ) : null
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  predictions: state.predictions,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(predictionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
