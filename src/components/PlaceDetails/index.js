import React, { useContext, useEffect } from 'react';
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

import Services from '../../services';

import { SocketContext } from '../../context/socket';
import { Actions as PlaceActions } from '../../store/ducks/place';

import { queueTypes } from '../../config/place';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

import Styles from './style';

const PlaceDetails = () => {
  const classes = Styles.useStyles();

  const storeDispatch = useDispatch();
  const placeSelected = useSelector(state =>
    state.place.nearby.find(place => place._id === state.place.selected)
  );
  const socketContext = useContext(SocketContext);

  const newCheckIn = type => {
    socketContext.newCheckIn({
      user: 'arthur',
      place: placeSelected._id,
      type
    });
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await Services.CommentService.getCommentsById(
        placeSelected._id
      );
      storeDispatch(PlaceActions.setComments(placeSelected._id, res.data));
    };
    if (placeSelected && !placeSelected.hasOwnProperty('comments')) {
      getComments();
    }
  }, [placeSelected, storeDispatch]);

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
                    storeDispatch(PlaceActions.setSelectedPlace(null))
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
              <CommentForm />
              {placeSelected.comments !== undefined ? (
                <CommentList comments={placeSelected.comments} />
              ) : null}
            </CardContent>
          </Card>
        </Styles.Container>
      ) : null}
    </>
  );
};

export default PlaceDetails;
