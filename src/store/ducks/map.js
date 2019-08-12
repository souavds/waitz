import produce from 'immer';

import { DEFAULT_ZOOM } from '../../config/map';

export const Types = {
  SET_VIEWPORT: 'map/SET_VIEWPORT',
  SET_ZOOM: 'map/SET_ZOOM',
  SET_NEARBY_PLACES: 'map/SET_NEARBY_PLACES',
  SET_SELECTED_PLACE: 'map/SET_SELECTED_PLACE',
  SET_NEW_CHECKIN: 'map/SET_NEW_CHECKIN'
};

const initialState = {
  config: {
    viewport: {
      lat: null,
      lng: null
    },
    zoom: DEFAULT_ZOOM
  },
  places: {
    selected: null,
    nearby: []
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_VIEWPORT:
      return produce(state, draft => {
        draft.config.viewport = { ...action.payload };
      });
    case Types.SET_ZOOM:
      return produce(state, draft => {
        draft.config.zoom = action.payload.zoom;
      });
    case Types.SET_NEARBY_PLACES:
      return produce(state, draft => {
        draft.places.nearby.push(...action.payload.places);
      });
    case Types.SET_SELECTED_PLACE:
      return produce(state, draft => {
        draft.places.selected = action.payload.place;
      });
    case Types.SET_NEW_CHECKIN:
      return produce(state, draft => {
        draft.places.nearby.forEach(p => {
          if (p._id === action.payload.place) {
            p.queue[action.payload.type] += 1;
          }
        });
      });
    default:
      return state;
  }
}

export const Actions = {
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
  }),
  setNearbyPlaces: places => ({
    type: Types.SET_NEARBY_PLACES,
    payload: {
      places
    }
  }),
  setSelectedPlace: place => ({
    type: Types.SET_SELECTED_PLACE,
    payload: {
      place
    }
  }),
  setNewCheckIn: (place, type) => ({
    type: Types.SET_NEW_CHECKIN,
    payload: {
      place,
      type
    }
  })
};
