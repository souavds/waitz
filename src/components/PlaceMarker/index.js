import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

import Services from '../../services';

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

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let localCounter = 0;
    Object.keys(info.queue).map(key => {
      localCounter += info.queue[key];
    });
    setCounter(localCounter);
    console.log(counter);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socketContext.socket.on('newCheckIn', place => {
      if (place === info._id) {
        console.log(counter);
        setCounter(counter + 1);
      }
    });
    return () => {
      socketContext.socket.off('newCheckIn');
    };
    // eslint-disable-next-line
  }, [socketContext.socket]);

  const centerMap = async () => {
    setCounter(counter + 1);
    socketContext.socket.emit('newCheckIn', {
      user: 'arthur',
      place: info._id,
      type: 'geral'
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

  return (
    <Styles.PlaceMarker>
      <IconButton className={classes.button} onClick={centerMap}>
        <Badge badgeContent={counter} color="primary">
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
