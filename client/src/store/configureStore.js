import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';

const getBaseURL = () => {
  var environment = process.env.NODE_ENV || 'development';
  switch(environment){
      case 'development':
          return 'http://localhost:5000/api';
      case 'production':
          return 'http://minecraft.buyansky.com:5000/api'
      default:
          return {};
  }
}

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: getBaseURL()
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(axiosMiddleware(client)))
  );
}
