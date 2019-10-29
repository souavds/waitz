import React, { useState, useEffect, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

import { Actions as AuthActions } from '../../store/ducks/auth';
import { Actions as PlaceActions } from '../../store/ducks/place';
import { Actions as UserActions } from '../../store/ducks/user';

const socket = io(process.env.REACT_APP_API_URL);

const SocketContext = createContext({
  socket: null
});

const SocketProvider = ({ children, store }) => {
  const storeDispatch = useDispatch();

  const newCheckIn = data => {
    storeDispatch(UserActions.setCheckInActive(true));
    storeDispatch(PlaceActions.setNewCheckIn(data.place, data.type));
    return socket.emit('newCheckIn', {
      ...data,
      token: localStorage.getItem('token')
    });
  };

  const newCheckOut = user => {
    storeDispatch(UserActions.setCheckInActive(false));
    return socket.emit('newCheckOut', {
      user,
      token: localStorage.getItem('token')
    });
  };

  const newComment = data => {
    return socket.emit('newComment', {
      ...data,
      token: localStorage.getItem('token')
    });
  };

  const [value] = useState({
    socket,
    newCheckIn,
    newCheckOut,
    newComment
  });

  useEffect(() => {
    value.socket.on('newCheckIn', data => {
      storeDispatch(PlaceActions.setNewCheckIn(data.place, data.type));
    });
    value.socket.on('checkout', data => {
      storeDispatch(PlaceActions.setNewCheckOut(data.place, data.type));
      if (
        data.user === store.getState().user.info.username &&
        store.getState().user.hasCheckinActive
      ) {
        storeDispatch(UserActions.setCheckInActive(false));
      }
    });
    value.socket.on('chekInNotActive', () => {
      storeDispatch(UserActions.setCheckInActive(false));
    });
    value.socket.on('newComment', data => {
      store.getState().place.nearby.forEach(place => {
        if (place._id === data.place_id && place.comments !== undefined) {
          storeDispatch(PlaceActions.setComments(data.place_id, [data]));
        }
      });
    });
    value.socket.on('removeComment', data => {
      store.getState().place.nearby.forEach(place => {
        if (place._id === data.place && place.comments !== undefined) {
          storeDispatch(PlaceActions.removeComment(data.place, data.comment));
        }
      });
    });
    value.socket.on('userAlreadyHasCheckIn', data => {
      storeDispatch(PlaceActions.setNewCheckOut(data.place, data.type));
      storeDispatch(UserActions.setCheckInActive(true));
      toast.error('Ops! It seems that you already have an active checkin!');
    });
    value.socket.on('invalidToken', () => {
      storeDispatch(AuthActions.signOut());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.socket]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const SocketConsumer = SocketContext.Consumer;

export { SocketContext, SocketProvider, SocketConsumer, socket };
