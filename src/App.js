import React from 'react';
import { Provider } from 'react-redux';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebaseConfig from './infrastructure/firebase-config';
import store from './infrastructure/store';

import AppNavBar from './app-nav-bar';
import AuthenticatedAdminWaitingList from './admin-waiting-list';
import WaitingList from './waiting-list';
import theme from './theme';

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...firebaseConfig}>
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
          </ReactReduxFirebaseProvider>
        </Provider>
      </Router>
    </>
  );
}

export default App;
