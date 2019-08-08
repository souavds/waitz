import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

import { SocketContext } from '../../context/socket';
import { Types as MapTypes } from '../../store/ducks/map';

import Styles from './style';

import { DEFAULT_ZOOM } from '../../config/map';

const useStyles = makeStyles(theme => ({
  button: {
    top: -14,
    color: '#dd4b3e'
  }
}));

const PlaceMarker = ({ info }) => {
  const classes = useStyles();
  const storeDispatch = useDispatch();
  const socketContext = useContext(SocketContext);

  const [queue, setQueue] = useState(0);

  const centerMap = () => {
    setQueue(queue + 1);
    socketContext.socket.emit('queue', {
      user: 'arthur',
      place: {
        name: info.name,
        location: {
          lat: info.geometry.location.lat,
          lng: info.geometry.location.lng
        }
      },
      queue: queue + 1
    });
    storeDispatch({
      type: MapTypes.SET_VIEWPORT,
      payload: {
        ...info.geometry.location
      }
    });
    storeDispatch({
      type: MapTypes.SET_ZOOM,
      payload: {
        zoom: 17
      }
    });
  };

  useEffect(() => {
    socketContext.socket.on('queue', data => {
      if (
        data.place.location.lat === info.geometry.location.lat &&
        data.place.location.lng === info.geometry.location.lng
      ) {
        setQueue(data.queue);
      }
    });
    return () => {
      socketContext.socket.off('queue');
    };
    // eslint-disable-next-line
  }, [socketContext.socket]);

  return (
    <Styles.PlaceMarker>
      <IconButton className={classes.button} onClick={centerMap}>
        <Badge badgeContent={queue} color="primary">
          <FaMapMarker />
        </Badge>
      </IconButton>
    </Styles.PlaceMarker>
  );
};

PlaceMarker.propTypes = {
  info: PropTypes.object.isRequired
};

export default PlaceMarker;
