import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../Helpers';

const ResultsTableHouse = ({ predictions, electionType }) => (
  <div>
  <h2>{Helpers.getFriendlyElectionName(electionType)}</h2>
  <table className="table table-sm table-striped electionTable" style={{ margin: '0px auto' }}>
    <thead>
      <tr>
        <th scope="col" style={{ background: '#222', textShadow: 'black 1px 1px 3px', color: 'white' }}></th>
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
        <tr>
          <td>Margin</td>
          {
           predictions.map(prediction => {
             if(prediction[electionType]){
              return (
                <td style={{background: prediction[electionType] > 217 ? Helpers.getPartyColor('Democratic') : Helpers.getPartyColor('Republican'), textShadow: 'black 1px 1px 3px', color: 'white'}}>
                  {Helpers.getSeatDivision(prediction[electionType])}
                </td>)
             }

             return <td>{'-'}</td>
          })
        }
        </tr>
    }
    </tbody>
  </table>
  </div>
);

ResultsTableHouse.propTypes = {
  predictions: PropTypes.any.isRequired,
  handleWinnerSelect: PropTypes.func.isRequired,
};

export default ResultsTableHouse;
