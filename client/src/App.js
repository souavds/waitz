import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './router';
import History from './router/history';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={History}>
      <Routes />
      <GlobalStyle />
    </Router>
  );
}

export default App;
