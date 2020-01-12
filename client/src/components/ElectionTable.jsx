import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';
import CandidateRow from './CandidateRow';

import * as constants from '../constants';

import '../styles/ElectionTable.css';

const getCandidateRows = (stateName, elections, predictions, handleWinnerSelect) => {
  const candidates = [{}, {}, {}];
  const election = elections[stateName];
  const prediction = predictions[stateName];

  election.candidates.forEach((candidate) => {
    if (candidate.party === 'Democratic') {
      // California is running 2 democrats, put the other in the other column
      if (candidate.name === 'Kevin de León') {
        candidates[2] = candidate;
      } else {
        candidates[0] = candidate;
      }
    } else if (candidate.party === 'Republican') {
      candidates[1] = candidate;
    } else {
      candidates[2] = candidate;
    }
  });

  return (
    <CandidateRow
      key={stateName}
      prediction={prediction}
      candidates={candidates}
      handleWinnerSelect={handleWinnerSelect}
      stateName={stateName}
    />
  );
};

const GeneralElectionTable = ({ elections, handleWinnerSelect, predictions }) => (
  <table className="table table-sm table-striped electionTable" style={{ margin: '0px auto' }}>
    <thead>
      <tr>
        <th scope="col" className="stateHeader">State</th>
        <th scope="col" className="stateHeader" style={{ background: Helpers.getPartyColor('Democratic')}}>Democratic</th>
        <th scope="col" className="stateHeader" style={{ background: Helpers.getPartyColor('Republican')}}>Republican</th>
        <th scope="col" className="stateHeader" style={{ background: Helpers.getPartyColor('Independent')}}>Other (Party)</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(elections).filter(key => key !== 'elections').sort().map(stateName => (
        <tr key={stateName}>
          <td>{stateName}</td>
          {getCandidateRows(stateName, elections, predictions, handleWinnerSelect)}
        </tr>
      ))}
    </tbody>
  </table>
);

const PrimaryTable = ({ elections, handleWinnerSelect, predictions }) => {
  if(!elections){
    return null;
  }

  return (
  <table className="table table-sm table-striped electionTable">
    <thead>
      <tr>
        <th scope="col" className="stateHeader">State</th>
        {elections[Object.keys(elections)[0]].candidates.map(candidate => {
          return (
          <th key={candidate.name} scope="col" className="stateHeader" style={{ background: Helpers.getPartyColor('Independent')}}>{candidate.name.split(" ")[1]}</th>
        )})}
      </tr>
    </thead>
    <tbody>
      {Object.keys(elections).filter(key => key !== 'elections').sort().map(stateName => (
        <tr key={stateName}>
          <td>{stateName}</td>
          <CandidateRow
            key={stateName}
            prediction={predictions[stateName]}
            candidates={elections[stateName].candidates}
            handleWinnerSelect={handleWinnerSelect}
            stateName={stateName}
            useImages={true}
          />
        </tr>
      ))}
    </tbody>
  </table>
)};

const ElectionTable = (props) => {
  const { electionType } = props;

  if (electionType === constants.ELECTION_TYPE_PRIMARY){
    return PrimaryTable(props);
  }
  else{
    return GeneralElectionTable(props);
  }

};


ElectionTable.propTypes = {
  elections: PropTypes.any.isRequired,
  predictions: PropTypes.any,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default ElectionTable;
