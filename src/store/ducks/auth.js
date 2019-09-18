import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import produce from 'immer';

import axios from '../../config/axios';
import setAuthToken from '../../utils/setAuthToken';
import { Actions as UserActions } from './user';

export const Types = {
  SET_AUTH: 'auth/SET_AUTH',
  SET_LOADING: 'auth/SET_LOADING',
  SET_ERRORS: 'auth/SET_ERRORS'
};

const initialState = {
  isAuthenticated: false,
  loading: false,
  errors: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_AUTH:
      return produce(state, draft => {
        draft.isAuthenticated = action.payload;
      });
    case Types.SET_LOADING:
      return produce(state, draft => {
        draft.loading = action.payload;
      });
    case Types.SET_ERRORS:
      return produce(state, draft => {
        draft.errors = action.payload;
      });
    default:
      return state;
  }
}

export const Actions = {
  setAuth: isAuth => ({
    type: Types.SET_AUTH,
    payload: isAuth
  }),
  setLoading: isLoading => ({
    type: Types.SET_LOADING,
    payload: isLoading
  }),
  setErrors: errors => ({
    type: Types.SET_ERRORS,
    payload: errors
  }),
  signUp: user => dispatch => {
    dispatch(Actions.setLoading(true));
    axios
      .post('/auth/signup', user)
      .then(res => {
        const { data } = res;
        if (res.status === 200 && data.token) {
          localStorage.setItem('token', data.token);
          setAuthToken(data.token);
          dispatch(UserActions.setCurrentUser(jwtDecode(data.token)));
          dispatch(Actions.setAuth(true));
          dispatch(Actions.setLoading(false));
          toast.success(data.message);
        }
      })
      .catch(err => {
        dispatch(Actions.setErrors(err.response.data.errors));
        if (err.response.status === 500) {
          toast.error(err.response.data.error);
        }
      });
  },
  signIn: user => dispatch => {
    dispatch(Actions.setLoading(true));
    axios
      .post('/auth/signin', user)
      .then(res => {
        const { data } = res;
        if (res.status === 200 && data.token) {
          localStorage.setItem('token', data.token);
          setAuthToken(data.token);
          dispatch(UserActions.setCurrentUser(jwtDecode(data.token)));
          dispatch(Actions.setAuth(true));
          dispatch(Actions.setLoading(false));
          toast.success(data.message);
        }
      })
      .catch(err => {
        dispatch(Actions.setErrors(err.response.data.errors));
        if (err.response.status === 500) {
          toast.error(err.response.data.error);
        }
      });
  },
  signOut: () => dispatch => {
    localStorage.removeItem('token');
    dispatch(Actions.setAuth(false));
    dispatch(UserActions.setCurrentUser(null));
  },
  checkToken: () => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        dispatch(Actions.signOut());
        return false;
      }
      return true;
    }
    return false;
  }
};
