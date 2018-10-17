import React, { Component } from 'react';
import Map from './Map.js';
import geographyObject from "./map.json"
import elections from "./elections_senatorial.json"
import ElectionHeader from "./ElectionHeader.js"
import ElectionTable from "./ElectionTable.js"
import {feature} from "topojson-client"

import './App.css';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      geographyPaths: [],
      elections: {},
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
    this.setState({ elections: elections });
    this.handleStateSelect(this.state.selectedStateName);
    console.log(Object.keys(elections).length);
  }

  render() {
    return (
      <div className="App container">
        <ElectionHeader 
          selectedState={this.state.elections[this.state.selectedStateName]}
          selectedStateName={this.state.selectedStateName}
          handleWinnerSelect={this.handleWinnerSelect}
          />
        <Map geography={this.state.geographyPaths} 
          elections={this.state.elections} 
          handleStateSelect={this.handleStateSelect}/>
        <ElectionTable
          elections={this.state.elections}
          handleWinnerSelect={this.handleWinnerSelect}
          selectedStateName={this.state.selectedStateName}
        />
      </div>
    );
  }

  handleStateSelect(stateName){
    this.setState({selectedStateName : stateName});
  }

  handleWinnerSelect(candidate, stateName){
    if(!candidate || !candidate.name || !candidate.party){
      return;
    }
    this.setState((prevState) => ({
      elections: {
        ...prevState.elections,
        [stateName]: {
          ...prevState.elections[stateName],
          projectedWinner: candidate,
        }
      }
    }))
  }
}

export default App;
