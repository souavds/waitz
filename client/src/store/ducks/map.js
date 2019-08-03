import produce from 'immer';

export const Types = {
  SET_GMAPS: 'map/SET_GMAPS',
  SET_NEARBY_PLACES: 'map/SET_NEARBY_PLACES'
};

const initialState = {
  gmaps: {
    map: null,
    maps: null
  },
  nearbyPlaces: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_NEARBY_PLACES:
      return produce(state, draft => {
        draft.nearbyPlaces = action.payload.places;
      });
    case Types.SET_GMAPS:
      return produce(state, draft => {
        draft.gmaps.map = action.payload.map;
        draft.gmaps.maps = action.payload.maps;
      });
    default:
      return state;
  }
}

export const Actions = {
  setGmaps: (map, maps) => ({
    type: Types.SET_GMAPS,
    payload: {
      map,
      maps
    }
  }),
  setNearbyPlaces: places => ({
    type: Types.SET_NEARBY_PLACES,
    payload: {
      places
    }
  })
};
