import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import PropTypes from 'prop-types';
import Helpers from './Helpers';

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
    const { elections } = this.props;
    const electionTarget = elections[stateName];
    if (electionTarget != null) {
      let partyColor = '#555';
      if (electionTarget.projectedWinner != null) {
        partyColor = Helpers.getPartyColor(electionTarget.projectedWinner.party);
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
    const { elections, handleStateSelect, geography, numDemSeats, partisanIndex } = this.props;

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
                  onClick={elections && elections[geographyPart.properties.NAME] != null ? () => handleStateSelect(geographyPart.properties.NAME) : () => console.log(geographyPart.properties)}
                  style={elections !== null ? this.getStyleState(geographyPart.properties.NAME) : Map.getStyleHouse(geographyPart.properties.GEOID, numDemSeats, partisanIndex)}
                />
              ))}
            </Geographies>
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
