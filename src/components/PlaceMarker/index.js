import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

import { SocketContext } from '../../context/socket';
import { Actions as MapActions } from '../../store/ducks/map';
import { Actions as PlaceActions } from '../../store/ducks/place';

import Styles from './style';

import { SELECTED_ZOOM } from '../../config/map';

const useStyles = makeStyles(theme => ({
  IconButton: {
    top: -14,
    color: '#dd4b3e'
  }
}));

const PlaceMarker = ({ place }) => {
  const classes = useStyles();
  const storeDispatch = useDispatch();
  const placeSelected = useSelector(state => state.place.selected);
  const socketContext = useContext(SocketContext);

  const [counter, setCounter] = useState(0);
  const [hover, setHover] = useState(false);

  // COUNTER
  useEffect(() => {
    setCounter(
      Object.keys(place.queue)
        .map(key => place.queue[key])
        .reduce((total, num) => total + num)
    );
    // eslint-disable-next-line
  }, [place.queue]);

  const centerMap = async () => {
    storeDispatch(
      MapActions.setViewport(
        place.geometry.location.lat,
        place.geometry.location.lng
      )
    );
    storeDispatch(MapActions.setZoom(SELECTED_ZOOM));
    storeDispatch(PlaceActions.setSelectedPlace(place._id));
  };

  return (
    <Styles.PlaceMarker
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ zIndex: hover ? 1 : 0 }}
    >
      <IconButton className={classes.IconButton} onClick={centerMap}>
        <Badge badgeContent={counter} color="primary">
          <FaMapMarker />
        </Badge>
      </IconButton>
    </Styles.PlaceMarker>
  );
};

PlaceMarker.propTypes = {
  place: PropTypes.object.isRequired
};

export default PlaceMarker;
