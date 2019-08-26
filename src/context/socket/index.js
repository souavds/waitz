import React, { useState, useEffect, createContext } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { Actions as PlaceActions } from '../../store/ducks/place';

const socket = io(process.env.REACT_APP_API_URL);

const SocketContext = createContext({
  socket: null
});

const SocketProvider = ({ children, store }) => {
  const storeDispatch = useDispatch();

  const newCheckIn = data => {
    storeDispatch(PlaceActions.setNewCheckIn(data.place, data.type));
    return socket.emit('newCheckIn', data);
  };

  const newComment = data => {
    storeDispatch(PlaceActions.setComments(data.place_id, [data]));
    return socket.emit('newComment', data);
  };

  const [value] = useState({
    socket,
    newCheckIn,
    newComment
  });

  useEffect(() => {
    value.socket.on('newCheckIn', data => {
      storeDispatch(PlaceActions.setNewCheckIn(data.place, data.type));
    });
    value.socket.on('newComment', data => {
      store.getState().place.nearby.forEach(place => {
        if (place._id === data.place_id && place.comments !== undefined) {
          storeDispatch(PlaceActions.setComments(data.place_id, [data]));
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.socket]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const SocketConsumer = SocketContext.Consumer;

export { SocketContext, SocketProvider, SocketConsumer, socket };
