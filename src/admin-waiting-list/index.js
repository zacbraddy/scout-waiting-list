import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Paper from '@material-ui/core/Paper';

import useAdminWaitingListStyles from '../common/use-waiting-list-styles';
import AdminWaitingList from './admin-waiting-list';
// import { useHistory } from 'react-router-dom'; // if you use react-router
// import GoogleButton from 'react-google-button' // optional

function AuthenticatedAdminWaitingList() {
  const classes = useAdminWaitingListStyles();
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  return (
    <Paper className={classes.root}>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          signInSuccessUrl: '/admin',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              firebase.handleRedirectResult(authResult).then(() => {
                // history.push(redirectUrl); if you use react router to redirect
              });
              return false;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
      <div>
        {!isLoaded(auth) && !isEmpty(auth) ? (
          <AdminWaitingList />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </Paper>
  );
}

export default AuthenticatedAdminWaitingList;
