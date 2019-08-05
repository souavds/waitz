import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './store';
import Routes from './router';
import History from './router/history';

import { MapProvider } from './context/gmaps';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Router history={History}>
        <MapProvider>
          <Routes />
          <GlobalStyle />
        </MapProvider>
      </Router>
    </Provider>
  );
}

export default App;
