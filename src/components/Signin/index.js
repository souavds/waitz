import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

import { TextField, Button, Link } from '@material-ui/core';

import validator from 'validator';

import { Actions as AuthActions } from '../../store/ducks/auth';

import Styles from './style';

const Signin = () => {
  const { history } = useReactRouter();

  const classes = Styles.useStyles();
  const storeDispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const serverErrors = useSelector(state => state.auth.errors);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setDisabled(!(password.length >= 6 && identifier.length >= 4));
  }, [identifier, password]);

  useEffect(() => {
    if (submitted) {
      if (Object.entries(serverErrors).length !== 0) {
        setErrors(serverErrors);
      } else {
        setErrors({});
        const isEmail = identifier.includes('@');
        if (isEmail && !validator.isEmail(identifier)) {
          setErrors({
            identifier: 'Email address format: name@example.com'
          });
        }
      }
    }
  }, [submitted, serverErrors, identifier]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const onSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    storeDispatch(
      AuthActions.signIn({
        identifier,
        password
      })
    );
  };

  const onKeydown = e => {
    if (Object.entries(serverErrors).length !== 0) {
      storeDispatch(AuthActions.setErrors({}));
    }
    if (e.key === 'Enter' && !disabled) {
      onSubmit(e);
    }
  };

  return (
    <Styles.Container>
      <form onSubmit={onSubmit}>
        <TextField
          id="signin-identifier"
          label="Email or Username"
          className={classes.Form}
          margin="normal"
          variant="outlined"
          error={errors.identifier !== undefined}
          helperText={errors.identifier}
          value={identifier}
          fullWidth
          onInput={event => setIdentifier(event.target.value)}
          onKeyDown={onKeydown}
        />
        <TextField
          id="signin-password"
          label="Password"
          type="password"
          className={classes.Form}
          margin="normal"
          variant="outlined"
          error={errors.password !== undefined}
          helperText={errors.password}
          value={password}
          fullWidth
          onInput={event => setPassword(event.target.value)}
          onKeyDown={onKeydown}
        />
        <Styles.Actions>
          <Link
            component={RouterLink}
            to="/signup"
            underline="none"
            variant="body2"
          >
            Create account
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={disabled}
          >
            Sign in
          </Button>
        </Styles.Actions>
      </form>
    </Styles.Container>
  );
};

export default Signin;
