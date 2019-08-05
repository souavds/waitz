import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

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

  const [counter, setCounter] = useState(0);

  const centerMap = () => {
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
