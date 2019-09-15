import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { useLocalStorage } from '@rehooks/local-storage';
import { ToastContainer, Flip } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import store from './store';
import Routes from './router';
import History from './router/history';

import { SocketProvider } from './context/socket';
import { MapProvider } from './context/gmaps';

import { Actions as AuthActions } from './store/ducks/auth';
import { Actions as UserActions } from './store/ducks/user';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const [token] = useLocalStorage('token');
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     const vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  //   });
  //   return () => {
  //     window.removeEventListener('resize');
  //   };
  // });

  /**
   * Effect para observar o token quando a aplicação é aberta
   */
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        store.dispatch(AuthActions.signOut());
      } else {
        store.dispatch(UserActions.setCurrentUser(decoded));
        store.dispatch(AuthActions.setAuth(true));
      }
    } else {
      store.dispatch(UserActions.setCurrentUser(null));
      store.dispatch(AuthActions.setAuth(false));
    }
  }, [token]);

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
