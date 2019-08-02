import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import { FaLocationArrow, FaPlus, FaMinus } from 'react-icons/fa';

import Styles from './style';

const MAXZOOM = 22;
const MINZOOM = 4;

const useStyles = makeStyles(theme => ({
  button: {
    minWidth: 40
  }
}));

const Controls = ({ onLocation, zoom, onZoom }) => {
  const classes = useStyles();

  const zoomIn = () => {
    const localZoom = zoom < MAXZOOM ? zoom + 1 : zoom;
    onZoom(localZoom);
  };

  const zoomOut = () => {
    const localZoom = zoom > MINZOOM ? zoom - 1 : zoom;
    onZoom(localZoom);
  };

  return (
    <Styles.Container>
      <Styles.GeoControl>
        <Button
          variant="contained"
          className={classes.button}
          onClick={onLocation}
        >
          <FaLocationArrow />
        </Button>
      </Styles.GeoControl>
      <ButtonGroup
        variant="contained"
        aria-label="small contained button group"
      >
        <Button onClick={zoomIn} className={classes.button}>
          <FaPlus />
        </Button>
        <Button onClick={zoomOut} className={classes.button}>
          <FaMinus />
        </Button>
      </ButtonGroup>
    </Styles.Container>
  );
};

Controls.propTypes = {
  onLocation: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  onZoom: PropTypes.func.isRequired
};

export default Controls;
