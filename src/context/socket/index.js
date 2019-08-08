import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext({
  socket: null
});

const SocketProvider = ({ children }) => {
  const [value] = useState({
    socket: io(process.env.REACT_APP_API_URL)
  });

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const SocketConsumer = SocketContext.Consumer;

export { SocketContext, SocketProvider, SocketConsumer };
