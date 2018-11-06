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

const CandidateRow = ({ candidates, handleWinnerSelect, prediction, stateName }) => (
  candidates.map((candidate, i) => {
    const isWinner = prediction && prediction.name === candidate.name;
    return (
      isWinner ? (
        <td key={candidate.name} style={{ background: Helpers.getPartyColor(candidate.party), textShadow: 'black 1px 1px 3px', color: 'white', userSelect: 'none' }}>
          <div className="nameContainer">
            <Octicon icon={Octicons.check} />
            {getCandidateFormat(candidate, i)}
          </div>
        </td>
      )
        : (
          <td style={{ cursor: 'pointer', userSelect: 'none' }}>
            <div
              className="nameContainer"
              role="button"
              tabIndex="0"
              onMouseDown={() => handleWinnerSelect(candidate, stateName)}
              onKeyPress={() => handleWinnerSelect(candidate, stateName)}
              key={candidate.name}
            >
              {getCandidateFormat(candidate, i)}
            </div>
          </td>
        )
    );
  })
);

CandidateRow.propTypes = {
  candidates: PropTypes.any.isRequired,
  prediction: PropTypes.any,
  handleWinnerSelect: PropTypes.func.isRequired,
  stateName: PropTypes.string.isRequired,
};

export default CandidateRow;
