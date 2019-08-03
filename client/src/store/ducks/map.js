import produce from 'immer';

export const Types = {
  SET_GMAPS: 'map/SET_GMAPS',
  SET_NEARBY_PLACES: 'map/SET_NEARBY_PLACES'
};

const initialState = {
  gmaps: {
    map: null,
    api: null
  },
  nearbyPlaces: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_NEARBY_PLACES:
      return produce(state, draft => {
        draft.nearbyPlaces.push(...action.payload.places);
      });
    case Types.SET_GMAPS:
      return produce(state, draft => {
        draft.gmaps.map = action.payload.map;
        draft.gmaps.api = action.payload.api;
      });
    default:
      return state;
  }
}

export const Actions = {
  setGmaps: (map, api) => ({
    type: Types.SET_GMAPS,
    payload: {
      map,
      api
    }
  }),
  setNearbyPlaces: places => ({
    type: Types.SET_NEARBY_PLACES,
    payload: {
      places
    }
  })
};
