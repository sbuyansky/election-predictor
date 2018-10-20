import React from 'react';
import { Octicon, Octicons } from 'octicons-react';
import Helpers from './Helpers.js';

const ElectionTable = ({ elections, handleWinnerSelect }) => (
  <table className="table table-sm table-striped" style={{ margin: '0px auto' }}>
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
          {getCandidateRows(stateName, elections, handleWinnerSelect)}
        </tr>
      ))}
    </tbody>
  </table>
);

const getCandidateRows = (stateName, elections, handleWinnerSelect) => {
  const candidates = [{}, {}, {}];
  const election = elections[stateName];

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

  return candidates.map((candidate, i) => (election.projectedWinner && candidate.name === election.projectedWinner.name
    ? (
      <td key={i} style={{ background: Helpers.getPartyColor(candidate.party), textShadow: 'black 1px 1px 3px', color: 'white' }}>
        <Octicon icon={Octicons.check} />
        {' '}
        {getCandidateFormat(candidate, i)}
      </td>
    )
    : <td key={i} onClick={() => handleWinnerSelect(candidate, stateName)} style={{ cursor: 'pointer' }}>{getCandidateFormat(candidate, i)}</td>));
};

const getCandidateFormat = (candidate, i) => {
  if (!candidate || !candidate.name || !candidate.party) {
    return '-';
  }
  if (i !== 2) {
    return candidate.name;
  }

  return `${candidate.name} (${candidate.party})`;
};

export default ElectionTable;
