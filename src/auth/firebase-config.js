import firebase from 'firebase/app';
import 'firebase/auth';
import store from './store';
import 'firebase/database';
// import 'firebase/functions' // <- needed if using httpsCallable
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const rrfConfig = {
  userProfile: 'users',
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

export default {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};
