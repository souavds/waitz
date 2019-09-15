import React from 'react';

import { Paper, Typography } from '@material-ui/core';

import Signup from '../../components/Signup';

import Styles from './style';

const SignupPage = () => {
  const classes = Styles.useStyles();

  return (
    <Styles.Container>
      <Paper className={classes.Paper} elevation={2}>
        <Styles.Header>
          <Typography variant="h5" component="h5">
            Create your account
          </Typography>
          <Typography variant="subtitle1" style={{ paddingTop: 8 }}>
            to continue to <strong>Waitz</strong>
          </Typography>
        </Styles.Header>
        <Signup />
      </Paper>
    </Styles.Container>
  );
};

export default SignupPage;
