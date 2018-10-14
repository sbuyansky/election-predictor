import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map.js';
import geographyObject from "./map.json"
import {feature} from "topojson-client"

class App extends Component {
  constructor() {
    super()
    this.state = {
      geographyPaths: [],
    };
  }

  componentDidMount() {
    const geographyPaths = feature(
      geographyObject,
      geographyObject.objects[Object.keys(geographyObject.objects)[0]]
    ).features;
    console.log(geographyPaths);
    this.setState({ geographyPaths })
  }

  render() {
    return (
      <div className="App">
        <Map geography={this.state.geographyPaths}/>
      </div>
    );
  }
}

export default App;
