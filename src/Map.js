import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import Helpers from './Helpers.js';

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

  render() {
    const props = this.props;

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
            <Geographies geography={props.geography} disableOptimization>
              {(geographies, projection) => geographies.map((geography, i) => (
                <Geography
                  key={i}
                  geography={geography}
                  cacheId={`geography-${i}`}
                  projection={projection}
                  onClick={props.elections[geography.properties.NAME] != null ? () => props.handleStateSelect(geography.properties.NAME) : null}
                  style={this.getStyle(geography.properties.NAME)}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }

  getStyle(stateName) {
    const electionTarget = this.props.elections[stateName];
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
}

export default Map;
