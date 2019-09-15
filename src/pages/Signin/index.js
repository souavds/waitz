import React from 'react';

import { Paper, Typography } from '@material-ui/core';

import Signin from '../../components/Signin';

import Styles from './style';

const SigninPage = () => {
  const classes = Styles.useStyles();

  return (
    <Styles.Container>
      <Paper className={classes.Paper} elevation={2}>
        <Styles.Header>
          <Typography variant="h5" component="h5">
            Sign In
          </Typography>
          <Typography variant="subtitle1" style={{ paddingTop: 8 }}>
            to continue to <strong>Waitz</strong>
          </Typography>
        </Styles.Header>
        <Signin />
      </Paper>
    </Styles.Container>
  );
};

export default SigninPage;
