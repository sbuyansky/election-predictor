import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map.js';
import geographyObject from "./map.json"
import elections from "./elections.json"
import {feature} from "topojson-client"

class App extends Component {
  constructor() {
    super()
    this.state = {
      geographyPaths: [],
      elections: {},
    };
  }

  componentDidMount() {
    const geographyPaths = feature(
      geographyObject,
      geographyObject.objects[Object.keys(geographyObject.objects)[0]]
    ).features;
    this.setState({ geographyPaths: geographyPaths })
    this.setState({ elections: elections })
  }

  render() {
    return (
      <div className="App">
        <Map geography={this.state.geographyPaths} elections={this.state.elections}/>
      </div>
    );
  }
}

export default App;
