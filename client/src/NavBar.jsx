import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ handleSave, handleLoad, handlePredictionIdChange, predictionId, electionType }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">Election Predictor</a>

    <div className=" navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className={electionType === 'electionsSenate' ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/senate">Senate</Link>
        </li>
        <li className={electionType === 'electionsHouse' ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/house">House</Link>
        </li>
        <li className={electionType === 'electionsGovernor' ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/governor">Governor</Link>
        </li>
      </ul>
      <button className="btn btn-light" onClick={() => handleLoad()} type="button" disabled={predictionId === ''} style={{marginRight: '10px'}}>Load</button>
      <input maxlength="20" className="form-control mr-sm-2" type="text" placeholder="Enter a Prediction ID" aria-label="PredictionID" value={predictionId} onChange={(e) => handlePredictionIdChange(e)} style={{width: '200px'}}/>
      <button className="btn btn-light" onClick={() => handleSave()} type="button" disabled={predictionId === ''}>Save</button>
    </div>
  </nav>
);

export default NavBar;
