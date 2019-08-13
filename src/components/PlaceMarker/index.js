import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

import { SocketContext } from '../../context/socket';
import { Actions as MapActions } from '../../store/ducks/map';

import Styles from './style';
import PlacePopper from './PlacePopper';

import { SELECTED_ZOOM } from '../../config/map';

const useStyles = makeStyles(theme => ({
  IconButton: {
    top: -14,
    color: '#dd4b3e'
  }
}));

const PlaceMarker = ({ place }) => {
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
      Object.keys(place.queue)
        .map(key => place.queue[key])
        .reduce((total, num) => total + num)
    );
    // eslint-disable-next-line
  }, [place.queue]);

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

  const centerMap = async event => {
    // socketContext.newCheckIn({
    //   user: 'arthur',
    //   place: place._id,
    //   type: 'geral'
    // });
    storeDispatch(
      MapActions.setViewport(
        place.geometry.location.lat,
        place.geometry.location.lng
      )
    );
    storeDispatch(MapActions.setZoom(SELECTED_ZOOM));
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDetailsButton = () => {
    storeDispatch(MapActions.setSelectedPlace(place._id));
  };

  const isPopperOpen = Boolean(anchorEl);
  const id = isPopperOpen ? `place-detail-popper-${place._id}` : undefined;

  return (
    <Styles.PlaceMarker
      ref={node}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ zIndex: hover || isPopperOpen ? 1 : 0 }}
    >
      <PlacePopper
        id={id}
        anchorEl={anchorEl}
        isPopperOpen={isPopperOpen}
        clickHandler={handleDetailsButton}
        place={place}
      />
      <IconButton
        aria-describedby={id}
        className={classes.IconButton}
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
  place: PropTypes.object.isRequired
};

export default PlaceMarker;
