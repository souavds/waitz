import produce from 'immer';

export const Types = {
  SET_NEARBY_PLACES: 'place/SET_NEARBY_PLACES',
  SET_SELECTED_PLACE: 'place/SET_SELECTED_PLACE',
  SET_NEW_CHECKIN: 'place/SET_NEW_CHECKIN',
  SET_COMMENTS: 'place/SET_COMMENTS'
};

const initialState = {
  selected: null,
  nearby: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_NEARBY_PLACES:
      return produce(state, draft => {
        draft.nearby.push(...action.payload.places);
      });
    case Types.SET_SELECTED_PLACE:
      return produce(state, draft => {
        draft.selected = action.payload.place;
      });
    case Types.SET_NEW_CHECKIN:
      return produce(state, draft => {
        draft.nearby.forEach(place => {
          if (place._id === action.payload.place) {
            place.queue[action.payload.type] += 1;
          }
        });
      });
    case Types.SET_COMMENTS:
      return produce(state, draft => {
        draft.nearby.forEach(place => {
          if (place._id === action.payload.place) {
            if (place.comments === undefined) {
              place.comments = [];
            }
            place.comments.unshift(...action.payload.comments);
          }
        });
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
  }),
  setComments: (place, comments) => ({
    type: Types.SET_COMMENTS,
    payload: {
      place,
      comments
    }
  })
};
