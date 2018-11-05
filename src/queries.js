import promise from 'bluebird';
import config from './config';
import sql from './sql';

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = config().pgconnectionstring;
var db = pgp(connectionString);

// add query functions

export const createPrediction = (req, res, next) => {
  const { predictions } = req.body;

  if (!predictions){
    res.status(200)
        .json({
          status: 'success',
          message: `No rows`
        });
    return;
  }

  db.tx(t => {
    const queries = [];
    const string_identifier = predictions.predictionId;
    
    // creating a sequence of transaction queries:
    Object.keys(predictions).forEach(electionType => {
      switch (electionType){
        case 'electionsHouse':
          queries.push(t.oneOrNone(sql.predictions.addOrUpdateHouse, {
            string_identifier : string_identifier,
            election_type : electionType,
            state : "house",
            dem_seats : predictions[electionType]
          }));
        break;
        case 'electionsSenate':
        case 'electionsGovernor':
          Object.keys(predictions[electionType]).forEach(state => {
            const stateElection = predictions[electionType][state];
            if(stateElection.projectedWinner){
              queries.push(t.oneOrNone(sql.predictions.addOrUpdate, {
                string_identifier : string_identifier,
                election_type : electionType,
                state : state,
                candidate_name : stateElection.projectedWinner.name,
                candidate_party : stateElection.projectedWinner.party
              }));
            }
          });
        default:
        break;
      }
    });
    // returning a promise that determines a successful transaction:
    return t.batch(queries); // all of the queries are to be resolved;
  })
    .then(data => {
        // success, COMMIT was executed
        res.status(200)
        .json({
          status: 'success',
          message: `test message`
        });
    })
    .catch(error => {
      console.log(error);
    });
}

export const getPrediction = (req, res, next) => {
  const string_identifier = req.query.string_identifier;

  db.any(sql.predictions.get, {string_identifier})
  .then(data => {
    let predictions = {
      electionsHouse : 218,
      electionsSenate : {},
      electionsGovernor : {},
      predictionId : string_identifier
    };

    data.forEach((row, index, data) => {
        let election_type = row.election_type;
        
        if(!predictions[election_type]){
          predictions[election_type] = {};
        }

        switch (election_type){
          case 'electionsHouse':
            predictions[election_type] = row.dem_seats;
            break;

          case 'electionsSenate':
          case 'electionsGovernor':
            predictions[election_type][row.state] = {
              projectedWinner : {
                name : row.name,
                party : row.party
              }
            }
            break;
          default:
            break;
        }
    });

    res
      .status(200)
      .json({
        predictions
      });
  });

}