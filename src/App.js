import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { ToastContainer, Flip } from 'react-toastify';

import store from './store';
import Routes from './router';
import History from './router/history';

import { SocketProvider } from './context/socket';
import { MapProvider } from './context/gmaps';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.min.css';

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
        <SocketProvider store={store}>
          <MapProvider>
            <Routes />
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover={false}
              transition={Flip}
            />
            <GlobalStyle />
          </MapProvider>
        </SocketProvider>
      </Router>
    </Provider>
  );
}

export default App;
