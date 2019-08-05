import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

import { Types as MapTypes } from '../../store/ducks/map';

import { ZOOM } from '../../config/map';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const PlaceMarker = ({ info }) => {
  const classes = useStyles();
  const storeDispatch = useDispatch();

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
        zoom: ZOOM
      }
    });
  };

  return (
    <>
      <IconButton
        className={classes.button}
        style={{ position: 'absolute' }}
        onClick={centerMap}
      >
        <FaMapMarker />
      </IconButton>
    </>
  );
};

export default PlaceMarker;
