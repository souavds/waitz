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
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     const vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  //   });
  //   return () => {
  //     window.removeEventListener('resize');
  //   };
  // });

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
