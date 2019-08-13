import React, { useState, useEffect, createContext } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { Actions as MapActions } from '../../store/ducks/map';

const socket = io(process.env.REACT_APP_API_URL);

const SocketContext = createContext({
  socket: null
});

const SocketProvider = ({ children }) => {
  const storeDispatch = useDispatch();

  const newCheckIn = data => {
    storeDispatch(MapActions.setNewCheckIn(data.place, data.type));
    socket.emit('newCheckIn', data);
  };

  const [value] = useState({
    socket,
    newCheckIn
  });

  useEffect(() => {
    value.socket.on('newCheckIn', data => {
      storeDispatch(MapActions.setNewCheckIn(data.place, data.type));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.socket]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const SocketConsumer = SocketContext.Consumer;

export { SocketContext, SocketProvider, SocketConsumer, socket };
