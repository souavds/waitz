import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@rehooks/local-storage';

import {
  Button,
  Fab,
  Popover,
  Card,
  CardHeader,
  Avatar,
  IconButton
} from '@material-ui/core';
import { MdPerson, MdExitToApp } from 'react-icons/md';

import { Actions as AuthActions } from '../../store/ducks/auth';

import Styles from './style';

const Auth = () => {
  const classes = Styles.useStyles();
  const storeDispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user.info);
  const [token] = useLocalStorage('token');

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (token) {
      const id = setInterval(() => {
        storeDispatch(AuthActions.checkToken());
      }, 30000);
      return () => clearInterval(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  return (
    <Styles.Container>
      {!isAuthenticated ? (
        <Link to="/signin" className={classes.Signin}>
          <Button variant="contained" color="primary">
            Sign in
          </Button>
        </Link>
      ) : (
        <>
          <Fab
            aria-describedby={id}
            aria-label="user"
            size="medium"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <MdPerson size="20" />
          </Fab>
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
            style={{ marginTop: 15 }}
          >
            <Card className={classes.Card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="user-icon">
                    <MdPerson size="20" />
                  </Avatar>
                }
                action={
                  <IconButton
                    aria-label="signout"
                    onClick={() => storeDispatch(AuthActions.signOut())}
                  >
                    <MdExitToApp />
                  </IconButton>
                }
                title={user.username}
                subheader={user.email}
              />
            </Card>
          </Popover>
        </>
      )}
    </Styles.Container>
  );
};

export default Auth;
