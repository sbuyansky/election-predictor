import React from 'react';
import PropTypes from 'prop-types';
import ElectionTable from './ElectionTable';

const SortElectionsByDate = (elections) => {
  let states = Object.keys(elections);
  let electionsByDate = {};

  states.forEach(state => {
    let dateOfElection = elections[state]["date"];

    if(!electionsByDate[dateOfElection]){
      electionsByDate[dateOfElection] = {};
    }

    electionsByDate[dateOfElection][state] = elections[state];
  });

  return electionsByDate;
};

const DatedElectionTables = (props) => {
  const { electionType, elections, handleWinnerSelect, selectedStateName, predictions } = props;

  let electionsByDate = SortElectionsByDate(elections);
  let dates = Object.keys(electionsByDate).sort((a, b) => {return new Date(a) - new Date(b)});
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: "UTC" };

  return dates.map((date) => (
    <div>
      <h5>{(new Date(date)).toLocaleDateString("en-US", options)}</h5>
      <ElectionTable 
        elections={electionsByDate[date]}
        predictions={predictions}
        handleWinnerSelect={handleWinnerSelect}
        selectedStateName={selectedStateName}
        electionType={electionType}
        />
    </div>
  ))
};

ElectionTable.propTypes = {
  elections: PropTypes.any.isRequired,
  predictions: PropTypes.any,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default DatedElectionTables;
