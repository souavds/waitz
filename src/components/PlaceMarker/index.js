import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Badge,
  Popper,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

import { SocketContext } from '../../context/socket';
import { Actions as MapActions } from '../../store/ducks/map';

import Styles from './style';

import { SELECTED_ZOOM } from '../../config/map';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    maxWidth: 345
  },
  button: {
    top: -14,
    color: '#dd4b3e'
  }
}));

const PlaceMarker = ({ info }) => {
  const node = useRef();
  const classes = useStyles();
  const storeDispatch = useDispatch();
  const socketContext = useContext(SocketContext);

  const [counter, setCounter] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hover, setHover] = useState(false);

  // COUNTER
  useEffect(() => {
    setCounter(
      Object.keys(info.queue)
        .map(key => info.queue[key])
        .reduce((total, num) => total + num)
    );
    // eslint-disable-next-line
  }, [info.queue]);

  // HANDLE POPOVER CLOSE
  useEffect(() => {
    const handleClick = e => {
      if (!node.current.contains(e.target) && anchorEl) {
        setAnchorEl(null);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [anchorEl]);

  // useEffect(() => {
  //   socketContext.socket.on('newCheckIn', place => {
  //     if (place === info._id) {
  //       console.log(counter);
  //       setCounter(counter + 1);
  //     }
  //   });
  //   return () => {
  //     socketContext.socket.off('newCheckIn');
  //   };
  //   // eslint-disable-next-line
  // }, [socketContext.socket]);

  const centerMap = async event => {
    // setCounter(counter + 1);
    socketContext.socket.emit('newCheckIn', {
      user: 'arthur',
      place: info._id,
      type: 'geral'
    });
    storeDispatch(
      MapActions.setViewport(
        info.geometry.location.lat,
        info.geometry.location.lng
      )
    );
    storeDispatch(MapActions.setZoom(SELECTED_ZOOM));
    setAnchorEl(anchorEl ? null : event.currentTarget);
    // storeDispatch({
    //   type: MapTypes.SET_SELECTED_PLACE,
    //   payload: {
    //     place: info
    //   }
    // });
  };

  const isPopperOpen = Boolean(anchorEl);
  const id = isPopperOpen ? 'simple-popper' : undefined;

  return (
    <Styles.PlaceMarker
      ref={node}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ zIndex: hover || isPopperOpen ? 1 : 0 }}
    >
      <Popper
        id={id}
        open={isPopperOpen}
        anchorEl={anchorEl}
        placement="top"
        disablePortal
        modifiers={{
          flip: {
            enabled: false
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'undefined'
          }
        }}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" component="h1">
              {info.name}
            </Typography>
            <Typography color="textSecondary">{info.vicinity}</Typography>
          </CardContent>
        </Card>
      </Popper>
      <IconButton
        aria-describedby={id}
        className={classes.button}
        onClick={centerMap}
      >
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
