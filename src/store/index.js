import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import * as reducers from './ducks';

const rootReducer = combineReducers({
  user: reducers.userReducer,
  auth: reducers.authReducer,
  map: reducers.mapReducer,
  place: reducers.placeReducer
});

const composeEnhancers = composeWithDevTools({
  actionsBlacklist: ['map/SET_MAPS']
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
