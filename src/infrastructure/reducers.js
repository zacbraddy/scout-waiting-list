import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import adminWaitingList from '../admin-waiting-list/reducer';
import addingRow from '../add-waiting-list-row/reducer';
import editingRow from '../editable-waiting-list-row/reducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  adminWaitingList,
  addingRow,
  editingRow,
});

export default rootReducer;
