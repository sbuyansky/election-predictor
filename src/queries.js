import promise from 'bluebird';

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://dkikzkqu:naW_I94XQp07GqvrwUQPYx9WzDpYrRts@nutty-custard-apple.db.elephantsql.com:5432/dkikzkqu';
var db = pgp(connectionString);

// add query functions

export const createPrediction = (req, res, next) => {
  console.log(req.body);
  res.status(200)
  .json({
    status: 'success',
    message: `test message`
  });
}

/*
exports = {
  //getAllPredictions: getAllPredictions,
  //getPrediction: getPrediction,
  createPrediction: createPrediction
  //updatePrediction: updatePrediction
};*/