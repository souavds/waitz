import produce from 'immer';

import { DEFAULT_ZOOM } from '../../config/map';

export const Types = {
  SET_NEARBY_PLACES: 'map/SET_NEARBY_PLACES',
  SET_VIEWPORT: 'map/SET_VIEWPORT',
  SET_ZOOM: 'map/SET_ZOOM'
};

const initialState = {
  current: {
    viewport: {
      lat: null,
      lng: null
    },
    zoom: DEFAULT_ZOOM
  },
  nearbyPlaces: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_NEARBY_PLACES:
      return produce(state, draft => {
        draft.nearbyPlaces.push(...action.payload.places);
      });
    case Types.SET_VIEWPORT:
      return produce(state, draft => {
        draft.current.viewport = { ...action.payload };
      });
    case Types.SET_ZOOM:
      return produce(state, draft => {
        draft.current.zoom = action.payload.zoom;
      });
    default:
      return state;
  }
}

export const Actions = {
  setNearbyPlaces: places => ({
    type: Types.SET_NEARBY_PLACES,
    payload: {
      places
    }
  }),
  setViewport: (lat, lng) => ({
    type: Types.SET_VIEWPORT,
    payload: {
      lat,
      lng
    }
  }),
  setZoom: zoom => ({
    type: Types.SET_ZOOM,
    payload: {
      zoom
    }
  })
};
