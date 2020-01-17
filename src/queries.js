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

  /*if (Date.now() > Date.parse("2018-11-06 9:00:00 PST")) {
    res.status(400)
      .send(`Predictions are closed.`);
    return;
  }*/

  if (!predictions) {
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
      switch (electionType) {
        case 'electionsHouse':
          queries.push(t.oneOrNone(sql.predictions.addOrUpdateHouse, {
            string_identifier: string_identifier,
            election_type: electionType,
            state: "house",
            dem_seats: predictions[electionType]
          }));
          break;
        case 'electionsSenate':
        case 'electionsGovernor':
        case 'electionsPrimary':
          Object.keys(predictions[electionType]).forEach(state => {
            const stateElection = predictions[electionType][state];
            queries.push(t.oneOrNone(sql.predictions.addOrUpdate, {
              string_identifier: string_identifier,
              election_type: electionType,
              state: state,
              candidate_name: stateElection.name,
              candidate_party: stateElection.party
            }));
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

  db.any(sql.predictions.get, { string_identifier })
    .then(data => {
      let prediction = buildPredictionFromRows(data);
      res
        .status(200)
        .json({
          prediction
        });
    });
}

export const getPredictions = (req, res, next) => {
  const string_identifiers = req.query.string_identifiers;
  let predictions = [];
  
  console.log(req.query);

  db.any(sql.predictions.getMany, { string_identifiers })
    .then(data => {
      string_identifiers.forEach((string_identifier) => {
        predictions.push(buildPredictionFromRows(data.filter(row => row.string_identifier === string_identifier)));
      });
      res
      .status(200)
      .json({
        predictions
      });
  });

}

const buildPredictionFromRows = (rows) => {
  let prediction = {
    electionsHouse: 218,
    electionsSenate: {},
    electionsGovernor: {},
    electionsPrimary: {},
    predictionId: ''
  };

  rows.forEach((row, index, data) => {
    let election_type = row.election_type;

    if (!prediction[election_type]) {
      prediction[election_type] = {};
    }

    prediction.predictionId = row.string_identifier;

    switch (election_type) {
      case 'electionsHouse':
        prediction[election_type] = row.dem_seats;
        break;

      case 'electionsSenate':
      case 'electionsGovernor':
      case 'electionsPrimary':
        prediction[election_type][row.state] = {
            name: row.name,
            party: row.party
        }
        break;
      default:
        break;
    }
  });

  return prediction;
}