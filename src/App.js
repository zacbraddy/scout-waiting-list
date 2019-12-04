import React from 'react';
import { Provider } from 'react-redux';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebaseConfig from './auth/firebase-config';
import store from './auth/store';

import AppNavBar from './app-nav-bar';
import AuthenticatedAdminWaitingList from './admin-waiting-list';
import WaitingList from './waiting-list';
import theme from './theme';

function App() {
  return (
    <>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...firebaseConfig}>
          <Router>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <AppNavBar />
              <Container maxWidth="lg">
                <Route exact path="/" component={WaitingList} />
                <Route
                  exact
                  path="/admin"
                  component={AuthenticatedAdminWaitingList}
                />
              </Container>
            </ThemeProvider>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </>
  );
}

export default App;
