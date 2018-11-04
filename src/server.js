import express from 'express';
import bodyParser from 'body-parser';
import * as db from'./queries';

const app = express();
const port = process.env.PORT || 5000;

var router = express.Router();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', router);


//router.get('/api/predictions', db.getAllPredictions);
//router.get('/api/predictions/:id', db.getPrediction);
router.post('/api/predictions', db.createPrediction);
//router.put('/api/predictions/:id', db.updatePrediction);

// TODO Implement Delete
//router.delete('/api/predictions/:id', db.removepredictions);

app.listen(port, () => console.log(`Listening on port ${port}`));