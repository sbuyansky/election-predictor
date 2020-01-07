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

  getStyleState(stateName) {
    const { elections, predictions } = this.props;
    const election = elections[stateName];
    const prediction = predictions[stateName];
    if (election != null) {
      let partyColor = '#000';
      if (prediction) {
        partyColor = Helpers.getPartyColor(prediction.party);
      }
      return {
        default: {
          fill: partyColor,
          stroke: '#EEE',
          strokeWidth: 2,
          outline: 'none',
        },
        hover: {
          fill: partyColor,
          opacity: 0.5,
          stroke: '#EEE',
          strokeWidth: 2,
          outline: 'none',
        },
        pressed: {
          fill: partyColor,
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
    const { elections, handleStateSelect, geography, numDemSeats, partisanIndex, electionType } = this.props;
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
          coordinates: [50, -8],
          name: 'Vermont'
        },
        { 
          coordinates: [34, 2],
          name: 'New Hampshire'
        },
        { 
          coordinates: [30, -1],
          name: 'Massachusetts'
        },
        { 
          coordinates: [28, 2],
          name: 'Rhode Island'
        },
        { 
          coordinates: [35, 10],
          name: 'Connecticut'
        },
        { 
          coordinates: [34, 1],
          name: 'New Jersey'
        },
        { 
          coordinates: [33, 0],
          name: 'Delaware'
        },
        { 
          coordinates: [47, 10],
          name: 'Maryland'
        },
        { 
          coordinates: [49, 21],
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
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography={geography} disableOptimization>
              {(geographies, projection) => geographies.map(geographyPart => (
                <Geography
                  key={geographyPart.properties.AFFGEOID}
                  geography={geographyPart}
                  cacheId={`geography-${geographyPart.properties.AFFGEOID}`}
                  projection={projection}
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
                  style={this.getStyleState(marker.name)}
                  onClick={elections && elections[marker.name] != null ? () => handleStateSelect(marker.name) : null}
                  >
                  <circle
                      cx={0}
                      cy={0}
                      r={15}
                    />
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
