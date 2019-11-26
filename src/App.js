import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppNavBar from './app-nav-bar';
import AdminWaitingList from './admin-waiting-list';
import WaitingList from './waiting-list';
import theme from './theme';

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppNavBar />
          <Container maxWidth="lg">
            <Route exact path="/" component={WaitingList} />
            <Route exact path="/admin" component={AdminWaitingList} />
          </Container>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
