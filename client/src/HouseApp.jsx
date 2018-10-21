import React, { Component } from 'react';
import { feature } from 'topojson-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import HouseSlider from './HouseSlider';
import Map from './Map';
import geographyObject from './data/map.json';
import NavBar from './NavBar';
import * as predictionActions from './actions/predictionActions';

import './App.css';

class HouseApp extends Component {
  constructor() {
    super();
    this.state = {
      geographyPaths: [],
    };

    this.handleNumSeatsChange = this.handleNumSeatsChange.bind(this);
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

  render() {
    const { geographyPaths } = this.state;
    const { predictions, electionType, data } = this.props;

    const partisanIndex = data[electionType];
    const numDemSeats = predictions[electionType];

    return (
      <div className="App container">
        <NavBar />
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
  predictions: state.predictions,
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
