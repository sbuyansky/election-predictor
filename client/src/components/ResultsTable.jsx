import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';

const ResultsTable = ({ elections, predictions, electionType }) => {
  return (
    <div>
    <h2>{Helpers.getFriendlyElectionName(electionType)}</h2>
    <table className="table table-sm table-striped electionTable" style={{ margin: '0px auto' }}>
      <thead>
        <tr>
          <th scope="col" style={{ background: '#222', textShadow: 'black 1px 1px 3px', color: 'white' }}>State</th>
          {predictions.map(prediction => {
            return (
              <th scope="col" style={{ background: '#222', textShadow: 'black 1px 1px 3px', color: 'white' }}>{prediction.predictionId}</th>
            )
          })
          }
        </tr>
      </thead>
      <tbody>
      {
        elections[electionType].map(state => {
          return (
          <tr>
            <td>{state}</td>
            {
            predictions.map(prediction => {
              if(prediction[electionType][state]){
                return (
                  <td style={{background: Helpers.getPartyColor(prediction[electionType][state].party), textShadow: 'black 1px 1px 3px', color: 'white'}}>
                    {prediction[electionType][state].name}
                  </td>)
              }

              return <td style={{textShadow: 'black 1px 1px 3px', color: 'white'}}>{'-'}</td>
            })
          }
          </tr>) 
        })
      }
      </tbody>
    </table>
    </div>
)};

ResultsTable.propTypes = {
  elections: PropTypes.any.isRequired,
  predictions: PropTypes.any.isRequired,
};

export default ResultsTable;
