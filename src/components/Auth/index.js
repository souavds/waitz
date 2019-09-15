import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Avatar, Popover, Card, CardHeader } from '@material-ui/core';
import { MdPerson } from 'react-icons/md';

import Signup from '../Signup';

import Styles from './style';

const Auth = () => {
  const classes = Styles.useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'login-popover' : undefined;

  return (
    <Styles.Container>
      <Link to="/signin" className={classes.Signin}>
        <Button variant="contained" color="primary">
          Sign in
        </Button>
      </Link>
      {/* <Avatar
        aria-describedby={id}
        className={classes.Avatar}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <MdPerson />
      </Avatar>
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
      </Popover> */}
    </Styles.Container>
  );
};

export default Auth;
