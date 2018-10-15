import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import geographyObject from "./map.json"
import elections from "./elections.json"
import ElectionHeader from "./ElectionHeader.js"
import {feature} from "topojson-client"

class App extends Component {
  constructor() {
    super()
    this.state = {
      geographyPaths: [],
      elections: {},
      selectedState: {},
      selectedStateName: "Massachusetts",
      predictions : {},
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

    const predictions = {};

    Object.keys(elections).forEach(element => {
      predictions[element] = {};
    });
    this.setState({predictions : predictions});
  }

  render() {
    return (
      <div className="App container">
        <ElectionHeader 
          selectedState={this.state.selectedState}
          selectedStateName={this.state.selectedStateName}
          handleWinnerSelect={this.handleWinnerSelect}
          />
        <Map geography={this.state.geographyPaths} 
          elections={this.state.elections} 
          handleStateSelect={this.handleStateSelect}/>
      </div>
    );
  }

  handleStateSelect(stateName){
    this.setState({selectedStateName : stateName});
    this.setState({selectedState : elections[stateName]});
  }

  handleWinnerSelect(candidateName){
    console.log(candidateName);
    this.setState((prevState) => {
      console.log(prevState);
      let newElection = prevState.elections[prevState.selectedStateName];
      newElection.candidates.forEach(candidate => {
        if(candidate.name === candidateName){
          candidate.isProjectedWinner = true;
        }
        else{
          candidate.isProjectedWinner = false;
        }
      });
      prevState.elections[prevState.selectedState] = newElection;
      return prevState;
    });
  }
}

export default App;
