import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import AppNavBar from './app-nav-bar';
import AdminUserTable from './admin-user-table';
import theme from './theme';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppNavBar />
        <Container maxWidth="lg">
          <AdminUserTable />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
