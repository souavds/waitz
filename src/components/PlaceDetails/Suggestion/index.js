import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  IconButton,
  Popover,
  List,
  Card,
  CardHeader,
  CardContent,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  ButtonBase
} from '@material-ui/core';
import { MdInfoOutline, MdClose } from 'react-icons/md';
import { FaRegHospital } from 'react-icons/fa';
import Scrollbar from 'react-scrollbars-custom';

import { Actions as MapActions } from '../../../store/ducks/map';
import { Actions as PlaceActions } from '../../../store/ducks/place';

import { SELECTED_ZOOM } from '../../../config/map';

import Styles from './style';

const Suggestion = ({ places, type, label }) => {
  const classes = Styles.useStyles();

  const storeDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'suggestion-popover' : undefined;

  const setPlace = place => {
    setAnchorEl(null);
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
    <>
      <IconButton
        aria-describedby={id}
        size="small"
        onClick={event => setAnchorEl(event.currentTarget)}
        style={{ marginLeft: 10 }}
      >
        <MdInfoOutline />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          style: { borderRadius: 15 }
        }}
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="avatar-header">
                <MdInfoOutline size="20" />
              </Avatar>
            }
            action={
              <IconButton
                aria-label="close-suggestion"
                onClick={() => setAnchorEl(null)}
              >
                <MdClose />
              </IconButton>
            }
            title={`Suggestions for ${label}`}
          />
          <CardContent style={{ padding: 0 }}>
            <List disablePadding>
              <Scrollbar
                style={{
                  height: 250,
                  width: 288
                }}
              >
                {places !== undefined
                  ? places.map((place, index) => (
                      <React.Fragment key={`suggestion-${index}`}>
                        <ButtonBase
                          style={{ width: '100%' }}
                          onClick={() => setPlace(place)}
                        >
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar
                                aria-label="hospital"
                                className={classes.avatar}
                              >
                                <FaRegHospital />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${place.name.slice(0, 20)}...`}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {label}
                                  </Typography>
                                  {` - ${place.queue[type]}`}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </ButtonBase>
                        {index !== places.length ? (
                          <Divider variant="inset" component="li" />
                        ) : null}
                      </React.Fragment>
                    ))
                  : null}
              </Scrollbar>
            </List>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default Suggestion;
