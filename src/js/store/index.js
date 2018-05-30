import { createStore, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk';
import rootReducer from "../reducers/index"
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
      applyMiddleware(thunk)
    ));