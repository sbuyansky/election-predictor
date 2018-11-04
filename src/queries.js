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
    console.log("Empty predictions");
    res.status(200)
        .json({
          status: 'success',
          message: `No rows`
        });
    return;
  }

  db.tx(t => {
    const queries = [];
    const string_identifier = 'test_prediction';
    
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
      console.log("success");
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
  const string_identifier = req.body.string_identifier;
  db.any('SELECT * FROM product WHERE price BETWEEN $<string_identifier>', {string_identifier});
}