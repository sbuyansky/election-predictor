import React, { Component } from 'react';
import { feature } from 'topojson-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import HouseSlider from './HouseSlider';
import Map from './Map';
import NavBar from './NavBar';
import geographyObject from '../data/map.json';
import * as predictionActions from '../actions/predictionActions';

import '../styles/App.css';

class HouseApp extends Component {
  constructor() {
    super();
    this.state = {
      geographyPaths: [],
    };

    this.handleNumSeatsChange = this.handleNumSeatsChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePredictionIdChange = this.handlePredictionIdChange.bind(this);
  }

  componentDidMount() {
    const geographyPaths = feature(
      geographyObject,
      geographyObject.objects[Object.keys(geographyObject.objects)[1]],
    ).features;
    this.setState({ geographyPaths });
  }

  handleNumSeatsChange(numDemSeats) {
    const { actions, electionType } = this.props;
    actions.predictHouse({ numDemSeats, electionType });
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
    const { geographyPaths } = this.state;
    const { predictionsAll, electionType, data } = this.props;

    const partisanIndex = data[electionType];
    const numDemSeats = predictionsAll[electionType];

    return (
      <div className="App container">
        <NavBar 
          handleSave={this.handleSave}
          handleLoad={this.handleLoad}
          handlePredictionIdChange={this.handlePredictionIdChange}
          predictionId={predictionsAll.predictionId}
          electionType={electionType}
        />
        <Map
          numDemSeats={numDemSeats}
          geography={geographyPaths}
          partisanIndex={partisanIndex}
        />
        <HouseSlider
          numDemSeats={numDemSeats}
          handleNumSeatsChange={this.handleNumSeatsChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  predictionsAll: state.predictions,
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(predictionActions, dispatch),
});

HouseApp.propTypes = {
  actions: PropTypes.any.isRequired,
  electionType: PropTypes.string.isRequired,
  predictions: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseApp);
