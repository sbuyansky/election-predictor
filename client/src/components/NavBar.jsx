import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as constants from '../constants';

const NavBar = ({ handleSave, handleLoad, handlePredictionIdChange, predictionId, electionType }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">Election Predictor</a>

    <div className=" navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className={electionType === constants.ELECTION_TYPE_PRIMARY ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/primary">Primary</Link>
        </li>
        <li className={electionType === constants.ELECTION_TYPE_SENATE ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/senate">Senate</Link>
        </li>
        <li className={electionType === constants.ELECTION_TYPE_HOUSE ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/house">House</Link>
        </li>
        <li className={electionType === constants.ELECTION_TYPE_GOVERNOR ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/governor">Governor</Link>
        </li>
        <li className={electionType === constants.ELECTION_TYPE_RESULTS ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/results">Results</Link>
        </li>
      </ul>
      { electionType !== constants.ELECTION_TYPE_RESULTS && 
        (<React.Fragment>
          <button className="btn btn-light" onClick={() => handleLoad()} type="button" disabled={predictionId === ''} style={{marginRight: '10px'}}>Load</button>
          <input maxlength="20" className="form-control mr-sm-2" type="text" placeholder="Enter a Prediction ID" aria-label="PredictionID" value={predictionId} onChange={(e) => handlePredictionIdChange(e)} style={{width: '200px'}}/>
          <button className="btn btn-light" onClick={() => handleSave()} type="button" disabled={predictionId === ''}>Save</button>
        </React.Fragment>)
      }
    </div>
    <ToastContainer />
  </nav>
);

export default NavBar;
