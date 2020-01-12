import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
  Markers
} from 'react-simple-maps';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';
import * as constants from '../constants';

import '../styles/Map.css';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getStyleState(stateName, isMarker) {
    const { elections, predictions, electionType } = this.props;
    const election = elections[stateName];
    const prediction = predictions[stateName];

    if (election != null) {
      let stateFill = "rgb(33, 37, 41)";

      if (prediction) {
        if(electionType === constants.ELECTION_TYPE_PRIMARY){
          stateFill = `url('#${stateName}Pattern${isMarker ? 'Marker' : ''}')`
        }
        else{
          stateFill = Helpers.getPartyColor(prediction.party);
        }
      }
      return {
        default: {
          fill: stateFill,
          stroke: '#FFF',
          strokeWidth: 2,
          outline: 'none',
        },
        hover: {
          fill: stateFill,
          opacity: 0.5,
          stroke: '#EEE',
          strokeWidth: 2,
          outline: 'none',
        },
        pressed: {
          fill: stateFill,
          stroke: '#EEE',
          strokeWidth: 2,
          outline: 'none',
        },
      };
    }

    return {
      default: {
        fill: '#ECEFF1',
        stroke: '#ECEFF1',
        strokeWidth: 0.75,
        outline: 'none',
      },
      hover: {
        fill: '#ECEFF1',
        stroke: '#ECEFF1',
        strokeWidth: 0.75,
        outline: 'none',
      },
      pressed: {
        fill: '#ECEFF1',
        stroke: '#ECEFF1',
        strokeWidth: 0.75,
        outline: 'none',
      },
    };
  }

  static getStyleHouse(geoID, numDemSeats, partisanIndex) {
    let color = '';
    const index = partisanIndex.indexOf(geoID);

    if (index === -1) {
      color = '#000';
    }
    else if (index > numDemSeats) {
      color = Helpers.getPartyColor('Republican');
    }
    else {
      color = Helpers.getPartyColor('Democratic');
    }

    return {
      default: {
        fill: color,
        stroke: '#ECEFF1',
        strokeWidth: 0.75,
        outline: 'none',
      },
      hover: {
        fill: color,
        stroke: '#ECEFF1',
        strokeWidth: 0.75,
        outline: 'none',
      },
      pressed: {
        fill: color,
        stroke: '#ECEFF1',
        strokeWidth: 0.75,
        outline: 'none',
      },
    };
  }

  render() {
    const { elections, handleStateSelect, geography, numDemSeats, partisanIndex, electionType, predictions } = this.props;
    let markers = null;

    if(electionType === constants.ELECTION_TYPE_SENATE){
      markers = [
        {
          coordinates: [ -94.6859, 46.7296 ] ,
          name : 'Minnesota Special',
        }
      ];
    }
    else if(electionType === constants.ELECTION_TYPE_PRIMARY){
      markers = [
        { 
          coordinates: [-67.1, 43],
          name: 'Vermont'
        },
        { 
          coordinates: [-67.8, 41],
          name: 'New Hampshire'
        },
        { 
          coordinates: [-68.5, 39],
          name: 'Massachusetts'
        },
        { 
          coordinates: [-69.2, 37],
          name: 'Rhode Island'
        },
        { 
          coordinates: [-69.9, 35],
          name: 'Connecticut'
        },
        { 
          coordinates: [-70.6, 33],
          name: 'New Jersey'
        },
        { 
          coordinates: [-71.2, 31],
          name: 'Delaware'
        },
        { 
          coordinates: [-71.8, 29],
          name: 'Maryland'
        },
        { 
          coordinates: [-72.4, 27],
          name: 'Washington DC'
        }
      ];
    }

    return (
      <div style={wrapperStyles}>
       <ComposableMap
          projection="albersUsa"
          projectionConfig={{
            scale: 1000,
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
          defs={
            <>
            {
              Object.keys(constants.STATE_VIEWBOXES).map((state) =>
              (
                <pattern id={`${state}Pattern`}  width="1" height="1">
                  <image preserveAspectRatio="xMidYMid slice" xlinkHref={`${Helpers.getCandidateImg(predictions[state])}`} x="0" y="0" width={constants.STATE_VIEWBOXES[state].width} height={constants.STATE_VIEWBOXES[state].height}/>
                </pattern>
              )
              )
            }
            {
              /* Marker Patterns */
              markers.map((marker) =>
                (
                  <pattern id={`${marker.name}PatternMarker`}  width="1" height="1">
                    <image preserveAspectRatio="xMidYMid slice" xlinkHref={`${Helpers.getCandidateImg(predictions[marker.name])}`} x="0" y="0" width="30" height="30"/>
                  </pattern>
                )
              )
            }
            </>
          }
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography={geography} disableOptimization>
              {(geographies, projection) => geographies.map(geographyPart => (
                <Geography
                  key={geographyPart.properties.AFFGEOID}
                  geography={geographyPart}
                  cacheId={`geography-${geographyPart.properties.AFFGEOID}`}
                  projection={projection}
                  id={`${geographyPart.properties.NAME}`}
                  onClick={elections && elections[geographyPart.properties.NAME] != null ? () => handleStateSelect(geographyPart.properties.NAME) : null }
                  style={elections !== null ? this.getStyleState(geographyPart.properties.NAME) : Map.getStyleHouse(geographyPart.properties.GEOID, numDemSeats, partisanIndex)}
                />
              ))}
            </Geographies>
            {markers && <Markers>
              {markers.map((marker, i) => (
                <Marker
                  key={marker.name}
                  marker={marker}
                  onClick={elections && elections[marker.name] != null ? () => handleStateSelect(marker.name) : null}
                  style={this.getStyleState(marker.name, true)}
                  >
                  <circle
                      cx={0}
                      cy={0}
                      r={15}
                    />
                  <text fontSize={11} x={17} className="smallStateLabel" style={{fill:"black"}}>{marker.name}</text>
                </Marker>
                ))
              }
            </Markers>}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

Map.propTypes = {
  elections: PropTypes.any,
  numDemSeats: PropTypes.number,
  partisanIndex: PropTypes.any,
  geography: PropTypes.any.isRequired,
  handleStateSelect: PropTypes.any,
};

Map.defaultProps = {
  elections: null,
  handleStateSelect: null,
  numDemSeats: 218,
  partisanIndex: null,
};

export default Map;
