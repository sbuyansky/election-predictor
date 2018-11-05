import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './ElectionHeader.css';
import { Octicon, Octicons } from 'octicons-react';
import PropTypes from 'prop-types';
import Helpers from './Helpers';
import * as Constants from './constants';

const getCandidateImg = candidate => `img/candidates/${candidate.name.replace(/\s+/g, '')}.jpg`;

const getCardStyle = candidate => `card flex-row flex-wrap card-${candidate.party}`;

const getButtonStyle = party => ({
  marginBottom: '5px',
  background: Helpers.getPartyColor(party),
  border: '0px',
  textShadow: 'black 1px 1px 3px',
});

const formatName = (name) => {
  const nameSplit = name.split(' ');
  const firstName = nameSplit[0].toUpperCase();
  const lastName = nameSplit.slice(1).join(' ').toUpperCase();

  return (
    <span className="text-left" style={{ marginTop: '5px', fontSize: '20px' }}>
      {firstName}
      {' '}
      <span style={{ fontWeight: 'bold' }}>{lastName}</span>
    </span>
  );
};

const ElectionHeader = ({ selectedStateName, selectedState, selectedStatePrediction, handleWinnerSelect, electionType }) => (
  <div className="row">
    <h1 className="display-4 font-weight-normal col-12 text-center">
      {electionType === Constants.ELECTION_TYPE_SENATE ? "Senate" : "Governor"} - {selectedStateName} 
    </h1>
    <CSSTransitionGroup className="d-flex justify-content-center col-12" transitionName="example" transitionEnterTimeout={500} transitionLeave={false}>
      {selectedState && selectedState.candidates && selectedState.candidates.map(candidate => (
        <div key={candidate.name} className={getCardStyle(candidate)} style={{ minWidth: '250px', margin: '0px 25px 0px 25px', float: 'left' }}>
          <div className="Card-header border-0">
            <img src={getCandidateImg(candidate)} style={{ width: '100px', height: '125px' }} alt="Candidate" onError={(e) => { e.target.onerror = null; e.target.src = 'img/candidates/default.jpg'; }} />
          </div>
          <div className="card-block px-2 d-flex flex-column" style={{ overflow: 'hidden' }}>
            {formatName(candidate.name)}
            <h6 className="text-left" style={{ color: Helpers.getPartyColor(candidate.party) }}>{candidate.party}</h6>
            {selectedStatePrediction && selectedStatePrediction.projectedWinner && selectedStatePrediction.projectedWinner.name === candidate.name
              ? (
                <button type="button" disabled className="btn btn-success mt-auto w-100" style={getButtonStyle(candidate.party)}>
                  <Octicon icon={Octicons.check} /> Selected
                </button>
              )
              : <button type="button" onClick={() => handleWinnerSelect(candidate, selectedStateName)} className="btn btn-primary mt-auto w-100" style={getButtonStyle(candidate.party)}>Select Winner</button>
            }
          </div>
        </div>
      ))}
    </CSSTransitionGroup>
  </div>
);

ElectionHeader.propTypes = {
  selectedStateName: PropTypes.string.isRequired,
  selectedState: PropTypes.any.isRequired,
  selectedStatePrediction: PropTypes.any,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default ElectionHeader;
