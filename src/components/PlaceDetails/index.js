import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Badge,
  Fab
} from '@material-ui/core';
import { FaRegHospital } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import { SocketContext } from '../../context/socket';
import { Actions as MapActions } from '../../store/ducks/map';

import Styles from './style';

import { queueTypes } from '../../config/place';

const PlaceDetails = () => {
  const classes = Styles.useStyles();

  const storeDispatch = useDispatch();
  const placeSelected = useSelector(state =>
    state.map.places.nearby.find(
      place => place._id === state.map.places.selected
    )
  );
  const socketContext = useContext(SocketContext);

  const newCheckIn = type => {
    socketContext.newCheckIn({
      user: 'arthur',
      place: placeSelected._id,
      type
    });
  };

  return (
    <>
      {placeSelected ? (
        <Styles.Container>
          <Card className={classes.card}>
            <CardHeader
              title={placeSelected.name}
              subheader={placeSelected.vicinity}
              avatar={
                <Avatar aria-label="hospital" className={classes.avatar}>
                  <FaRegHospital />
                </Avatar>
              }
              action={
                <IconButton
                  aria-label="close"
                  onClick={() =>
                    storeDispatch(MapActions.setSelectedPlace(null))
                  }
                >
                  <MdClose />
                </IconButton>
              }
            />
            <CardContent>
              <Typography
                variant="body1"
                component="h5"
                className={classes.checkInTitle}
              >
                Faça um check-in!
              </Typography>
              <Styles.CheckInContainer>
                {Object.entries(queueTypes).map((key, index) => (
                  <Badge
                    key={index}
                    badgeContent={placeSelected.queue[key[0]]}
                    color="primary"
                  >
                    <Fab
                      variant="extended"
                      size="small"
                      color="primary"
                      aria-label="add"
                      onClick={() => newCheckIn(key[0])}
                    >
                      {key[1]}
                    </Fab>
                  </Badge>
                ))}
              </Styles.CheckInContainer>
            </CardContent>
          </Card>
        </Styles.Container>
      ) : null}
    </>
  );
};

export default PlaceDetails;
