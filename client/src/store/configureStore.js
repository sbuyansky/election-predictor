import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import Helpers from '../Helpers';

const client = axios.create({
  baseURL: Helpers.getBaseURL()
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(axiosMiddleware(client)))
  );
}
