import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ handleSave, handleLoad, handlePredictionIdChange, predictionId }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">Election Predictor</a>

    <div className=" navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/senate">Senate</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/house">House</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/governor">Governor</Link>
        </li>
      </ul>
      <input maxlength="20" className="form-control mr-sm-2" type="text" placeholder="Prediction ID" aria-label="PredictionID" value={predictionId} onChange={(e) => handlePredictionIdChange(e)}/>
      <button className="btn my-2 my-sm-0" onClick={() => handleSave()} type="button">Save</button>
      <button className="btn my-2 my-sm-0" onClick={() => handleLoad()} type="button">Load</button>
    </div>
  </nav>
);

export default NavBar;
