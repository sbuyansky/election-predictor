import React, { Component } from 'react';
import Map from './Map.js';
import geographyObject from "./map.json";
import ElectionHeader from "./ElectionHeader.js";
import ElectionTable from "./ElectionTable.js";
import {feature} from "topojson-client";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as predictionActions from "./actions/predictionActions.js";

import './App.css';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      geographyPaths: [],
      selectedStateName: "Massachusetts",
    };

    this.handleStateSelect = this.handleStateSelect.bind(this);
    this.handleWinnerSelect = this.handleWinnerSelect.bind(this);
  }

  componentDidMount() {
    const geographyPaths = feature(
      geographyObject,
      geographyObject.objects[Object.keys(geographyObject.objects)[0]]
    ).features;
    this.setState({ geographyPaths: geographyPaths });
    this.handleStateSelect(this.state.selectedStateName);
  }

  render() {
    const {elections} = this.props.predictions;

    return (elections != null ? 
      <div className="App container">
        <ElectionHeader
          selectedState={elections[this.state.selectedStateName]}
          selectedStateName={this.state.selectedStateName}
          handleWinnerSelect={this.handleWinnerSelect}
          />
        <Map geography={this.state.geographyPaths} 
          elections={elections} 
          handleStateSelect={this.handleStateSelect}/>
        <ElectionTable
          elections={elections}
          handleWinnerSelect={this.handleWinnerSelect}
          selectedStateName={this.state.selectedStateName}
        />
      </div> : null
    );
  }

  handleStateSelect(stateName){
    this.setState({selectedStateName : stateName});
  }

  handleWinnerSelect(candidate, stateName){
    if(!candidate || !candidate.name || !candidate.party){
      return;
    }

    this.props.actions.predictElection({candidate, stateName});
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    predictions: state.predictions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(predictionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
