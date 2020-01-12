import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import '../styles/ElectionHeader.css';
import { Octicon, Octicons } from 'octicons-react';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';
import * as constants from '../constants';

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

const PrimaryElectionHeader = ({candidates, }) => (
  <div className="row">
    <h1 className="display-4 font-weight-normal col-12 text-center">
      2020 Democratic Primary
    </h1>
    <table>
      <thead>
        {candidates.map((candidate) =>(
          <td>candidate.name.split(" ")[1]</td>
        )
        )}
      </thead>
    </table>
  </div>
);

PrimaryElectionHeader.propTypes = {
  selectedStateName: PropTypes.string.isRequired,
  selectedState: PropTypes.any.isRequired,
  selectedStatePrediction: PropTypes.any,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default PrimaryElectionHeader;
