import produce from 'immer';

export const Types = {
  SET_CURRENT_USER: 'user/SET_CURRENT_USER',
  SET_LOCATION: 'user/SET_LOCATION'
};

const initialState = {
  user: {},
  location: {
    lat: null,
    lng: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_CURRENT_USER:
      return produce(state, draft => {
        draft.user = action.payload;
      });
    case Types.SET_LOCATION:
      return produce(state, draft => {
        draft.location = {
          lat: action.payload.lat,
          lng: action.payload.lng
        };
      });
    default:
      return state;
  }
}

export const Actions = {
  setCurrentUser: user => ({
    type: Types.SET_CURRENT_USER,
    payload: user
  }),
  setLocation: (lat, lng) => ({
    type: Types.SET_LOCATION,
    payload: {
      lat,
      lng
    }
  })
};
