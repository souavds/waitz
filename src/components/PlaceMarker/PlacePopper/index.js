import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Popper,
  Card,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  Card: {
    width: 345,
    maxWidth: 345
  },
  Button: {
    margin: theme.spacing(1)
  }
}));

const PlacePopper = ({ id, anchorEl, isPopperOpen, clickHandler, place }) => {
  const classes = useStyles();
  return (
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
      <Card className={classes.Card}>
        <CardContent>
          <Typography variant="h6" component="h1">
            {place.name}
          </Typography>
          <Typography color="textSecondary">{place.vicinity}</Typography>
          <CardActions>
            <Link to="/place/">
              <Button
                onClick={clickHandler}
                variant="contained"
                color="primary"
                className={classes.Cutton}
              >
                Details
              </Button>
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Popper>
  );
};

export default PlacePopper;
