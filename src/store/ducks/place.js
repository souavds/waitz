import produce from 'immer';

export const Types = {
  SET_NEARBY_PLACES: 'place/SET_NEARBY_PLACES',
  SET_SELECTED_PLACE: 'place/SET_SELECTED_PLACE',
  SET_NEW_CHECKIN: 'place/SET_NEW_CHECKIN',
  SET_NEW_CHECKOUT: 'place/SET_NEW_CHECKOUT',
  SET_COMMENTS: 'place/SET_COMMENTS',
  REMOVE_COMMENT: 'place/REMOVE_COMMENT'
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
    case Types.SET_NEW_CHECKOUT:
      return produce(state, draft => {
        draft.nearby.forEach(place => {
          if (
            place._id === action.payload.place &&
            place.queue[action.payload.type] > 0
          ) {
            place.queue[action.payload.type] -= 1;
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
    case Types.REMOVE_COMMENT:
      return produce(state, draft => {
        draft.nearby.forEach(place => {
          if (place._id === action.payload.place) {
            if (place.comments !== undefined) {
              const index = place.comments.findIndex(
                comment => comment._id === action.payload.comment
              );
              place.comments.splice(index, 1);
            }
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
  setNewCheckOut: (place, type) => ({
    type: Types.SET_NEW_CHECKOUT,
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
  }),
  removeComment: (place, comment) => ({
    type: Types.REMOVE_COMMENT,
    payload: {
      place,
      comment
    }
  })
};
