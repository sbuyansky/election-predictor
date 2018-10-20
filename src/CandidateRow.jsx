import React from 'react';
import PropTypes from 'prop-types';
import { Octicon, Octicons } from 'octicons-react';
import Helpers from './Helpers';

const getCandidateFormat = (candidate, i) => {
  if (!candidate || !candidate.name || !candidate.party) {
    return '-';
  }
  if (i !== 2) {
    return candidate.name;
  }

  return `${candidate.name} (${candidate.party})`;
};

const CandidateRow = ({ candidates, handleWinnerSelect, projectedWinner, stateName }) => {
  candidates.map((candidate, i) => {
    const isWinner = projectedWinner && projectedWinner.name === candidate.name;
    return (
      isWinner ? (
        <td key={candidate.name} style={{ background: Helpers.getPartyColor(candidate.party), textShadow: 'black 1px 1px 3px', color: 'white' }}>
          <Octicon icon={Octicons.check} />{getCandidateFormat(candidate, i)}
        </td>
      )
        : <td style={{ cursor: 'pointer' }}><button type="button" onClick={() => handleWinnerSelect(candidate, stateName)}>{getCandidateFormat(candidate, i)}</button></td>
    );
  });
};

CandidateRow.propTypes = {
  candidates: PropTypes.any.isRequired,
  handleWinnerSelect: PropTypes.func.isRequired,
  projectedWinner: PropTypes.any.isRequired,
  stateName: PropTypes.string.isRequired,
};

export default CandidateRow;
