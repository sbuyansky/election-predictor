import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';
import CandidateRow from './CandidateRow';

import './ElectionTable.css';

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

const ResultsTable = ({ elections, handleWinnerSelect, predictions }) => (
  <table className="table table-sm table-striped electionTable" style={{ margin: '0px auto' }}>
    <thead>
      <tr>
        <th scope="col" style={{ background: '#222', textShadow: 'black 1px 1px 3px', color: 'white' }}>State</th>
        <th scope="col" style={{ background: Helpers.getPartyColor('Democratic'), textShadow: 'black 1px 1px 3px', color: 'white' }}>Democratic</th>
        <th scope="col" style={{ background: Helpers.getPartyColor('Republican'), textShadow: 'black 1px 1px 3px', color: 'white' }}>Republican</th>
        <th scope="col" style={{ background: Helpers.getPartyColor('Independent'), textShadow: 'black 1px 1px 3px', color: 'white' }}>Other (Party)</th>
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

ElectionTable.propTypes = {
  elections: PropTypes.any.isRequired,
  predictions: PropTypes.any.isRequired,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default ResultsTable;
