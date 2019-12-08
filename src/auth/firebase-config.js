import firebase from 'firebase/app';
import 'firebase/auth';
import store from './store';
import 'firebase/database';
// import 'firebase/functions' // <- needed if using httpsCallable
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_PROD_API_KEY ||
    process.env.REACT_APP_FIREBASE_DEV_API_KEY,
  authDomain:
    process.env.REACT_APP_FIREBASE_PROD_AUTH_DOMAIN ||
    process.env.REACT_APP_FIREBASE_DEV_AUTH_DOMAIN,
  databaseURL:
    process.env.REACT_APP_FIREBASE_PROD_DATABASE_URL ||
    process.env.REACT_APP_FIREBASE_DEV_DATABASE_URL,
  projectId:
    process.env.REACT_APP_FIREBASE_PROD_PROJECT_ID ||
    process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
  storageBucket:
    process.env.REACT_APP_FIREBASE_PROD_STORAGE_BUCKET ||
    process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_PROD_MESSAGING_SENDER_ID ||
    process.env.REACT_APP_FIREBASE_DEV_MESSAGING_SENDER_ID,
  appId:
    process.env.REACT_APP_FIREBASE_PROD_APP_ID ||
    process.env.REACT_APP_FIREBASE_DEV_APP_ID,
  measurementId:
    process.env.REACT_APP_FIREBASE_PROD_MEASUREMENT_ID ||
    process.env.REACT_APP_FIREBASE_DEV_MEASUREMENT_ID,
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
