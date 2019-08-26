import produce from 'immer';

import { DEFAULT_ZOOM } from '../../config/map';

export const Types = {
  SET_VIEWPORT: 'map/SET_VIEWPORT',
  SET_ZOOM: 'map/SET_ZOOM'
};

const initialState = {
  viewport: {
    lat: null,
    lng: null
  },
  zoom: DEFAULT_ZOOM
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_VIEWPORT:
      return produce(state, draft => {
        draft.viewport = { ...action.payload };
      });
    case Types.SET_ZOOM:
      return produce(state, draft => {
        draft.zoom = action.payload.zoom;
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
  })
};
