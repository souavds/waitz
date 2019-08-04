import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const PlaceMarker = () => {
  const classes = useStyles();

  return (
    <>
      <IconButton className={classes.button}>
        <FaMapMarker />
      </IconButton>
    </>
  );
};

export default PlaceMarker;
