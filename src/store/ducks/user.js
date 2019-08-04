import produce from 'immer';

export const Types = {
  SET_LOCATION: 'user/SET_LOCATION'
};

const initialState = {
  location: {
    lat: null,
    lng: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
  setLocation: (lat, lng) => ({
    type: Types.SET_LOCATION,
    payload: {
      lat,
      lng
    }
  })
};
