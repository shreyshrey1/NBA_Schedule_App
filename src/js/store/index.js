import { createStore } from "redux"
import rootReducer from "../reducers/index"
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(rootReducer, /* preloadedState, */ devToolsEnhancer(
  // Specify custom devTools options
));

export default store