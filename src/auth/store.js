import { createStore } from 'redux';
import rootReducer from './reducers';

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

export default store;
