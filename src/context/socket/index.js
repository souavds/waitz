import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext({
  socket: null
});

const SocketProvider = ({ children }) => {
  const [value, setValue] = useState({
    socket: io('http://localhost:5000')
  });

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const SocketConsumer = SocketContext.Consumer;

export { SocketContext, SocketProvider, SocketConsumer };
