import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';
import CandidateRow from './CandidateRow';

import '../styles/ElectionTable.css';

const ElectionTable = ({ elections, handleWinnerSelect, predictions }) => {
  console.log(elections);
  return (
  <table className="table table-sm table-striped electionTable">
    <thead>
      <tr>
        <th scope="col" className="stateHeader">State</th>
        {elections["Alaska"].candidates.map(candidate => {
          console.log(candidate);
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

ElectionTable.propTypes = {
  elections: PropTypes.any.isRequired,
  predictions: PropTypes.any.isRequired,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default ElectionTable;
