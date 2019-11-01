import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import AppNavBar from './app-nav-bar';
import AdminUserTable from './admin-user-table';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <AppNavBar />
      <Container maxWidth="lg">
        <AdminUserTable />
      </Container>
    </>
  );
}

export default App;
