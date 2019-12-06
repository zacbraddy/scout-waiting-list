import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import useAdminWaitingListStyles from '../common/use-waiting-list-styles';
import AdminWaitingList from './admin-waiting-list';
// import { useHistory } from 'react-router-dom'; // if you use react-router
// import GoogleButton from 'react-google-button' // optional

function AuthenticatedAdminWaitingList() {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  const getComponent = () => {
    if (!isLoaded(auth) && !isEmpty(auth)) {
      return <span>Loading...</span>;
    }

    if (isLoaded(auth) && !isEmpty(auth)) {
      return <AdminWaitingList />;
    }

    return (
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
    );
  };

  return getComponent();
}

export default AuthenticatedAdminWaitingList;
