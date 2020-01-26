import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// Create store with reducers and initial state
const initialState = {};

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(composeWithDevTools());
}

const store = createStore(rootReducer, initialState, ...middlewares);

export default store;
