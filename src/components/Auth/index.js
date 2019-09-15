import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@rehooks/local-storage';
import jwtDecode from 'jwt-decode';

import { Button, Fab, Popover, Card, CardHeader } from '@material-ui/core';
import { MdPerson } from 'react-icons/md';

import { Actions as AuthActions } from '../../store/ducks/auth';

import Styles from './style';

const Auth = () => {
  const classes = Styles.useStyles();
  const storeDispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [token] = useLocalStorage('token');

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (token) {
      const id = setInterval(() => {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          storeDispatch(AuthActions.signOut());
        }
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
            elevation={2}
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <MdPerson />
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
          >
            <span>teste</span>
          </Popover>
        </>
      )}
    </Styles.Container>
  );
};

export default Auth;
