import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Octicon, Octicons } from 'octicons-react';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';
import * as constants from '../constants';

import '../styles/ElectionHeader.css';

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

const GeneralElectionHeader = ({ selectedStateName, selectedState, selectedStatePrediction, handleWinnerSelect, electionType, year }) => (
  <div className="row">
    <h1 className="display-4 font-weight-normal col-12 text-center">
      {electionType === constants.ELECTION_TYPE_SENATE ? "Senate" : "Governor"} - {selectedStateName} 
    </h1>
    <CSSTransitionGroup className="d-flex justify-content-center col-12" transitionName="example" transitionEnterTimeout={500} transitionLeave={false}>
      {selectedState && selectedState.candidates && selectedState.candidates.map(candidate => (
        <div key={candidate.name} className={getCardStyle(candidate)} style={{ minWidth: '250px', margin: '0px 25px 0px 25px', float: 'left' }}>
          <div className="Card-header border-0">
            <img src={Helpers.getCandidateImg(candidate, year)} style={{ width: '100px', height: '125px' }} alt="Candidate" onError={(e) => { e.target.onerror = null; e.target.src = '/img/candidates/default.jpg'; }} />
          </div>
          <div className="card-block px-2 d-flex flex-column" style={{ overflow: 'hidden' }}>
            {formatName(candidate.name)}
            <h6 className="text-left" style={{ color: Helpers.getPartyColor(candidate.party) }}>{candidate.party}</h6>
            {selectedStatePrediction && selectedStatePrediction.name === candidate.name
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

const PrimaryElectionHeader = ({selectedState, handleWinnerSelect, selectedCandidate}) => {
  return (
  <div className="row">
    <h1 className="display-4 font-weight-normal col-12 text-center">
      2020 Democratic Primary
    </h1>
    <h4> Select a candidate to predict for: </h4>
    <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
      {selectedState.candidates.map((candidate) =>(
        <div onClick={() => handleWinnerSelect(candidate, null)}  className={(selectedCandidate != null && selectedCandidate.name === candidate.name) ? "candidate-button-selected" : "candidate-button"}>
          <h5>{candidate.name.split(" ")[1]}</h5>
          <div 
          className="candidateImageContainer"
          style={{backgroundPosition : Helpers.getCandidateOffsets(candidate.name), }}
          >
          </div>
        </div>
      )
      )}
    </div>
  </div>
)};

const ElectionHeader = (props) => {
  const { electionType } = props; 

  if (electionType === constants.ELECTION_TYPE_PRIMARY){
    return PrimaryElectionHeader(props);
  }
  else{
    return GeneralElectionHeader(props);
  }
}

ElectionHeader.propTypes = {
  selectedStateName: PropTypes.string.isRequired,
  selectedState: PropTypes.any.isRequired,
  selectedStatePrediction: PropTypes.any,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default ElectionHeader;
