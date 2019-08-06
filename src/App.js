import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './store';
import Routes from './router';
import History from './router/history';

import { SocketProvider } from './context/socket';
import { MapProvider } from './context/gmaps';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Router history={History}>
        <SocketProvider>
          <MapProvider>
            <Routes />
            <GlobalStyle />
          </MapProvider>
        </SocketProvider>
      </Router>
    </Provider>
  );
}

export default App;
