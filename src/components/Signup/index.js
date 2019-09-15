import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

import { TextField, Button, Link } from '@material-ui/core';

import validator from 'validator';

import { Actions as AuthActions } from '../../store/ducks/auth';

import Styles from './style';

const Signup = () => {
  const { history } = useReactRouter();

  const classes = Styles.useStyles();
  const storeDispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const serverErrors = useSelector(state => state.auth.errors);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setDisabled(
      !(
        email.length > 0 &&
        username.length > 0 &&
        password.length > 0 &&
        password2.length > 0
      )
    );
  }, [email, password, password2, username]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const submit = () => {
    storeDispatch(
      AuthActions.signUp({
        email,
        username,
        password
      })
    );
  };

  const hasLocalErrors = () => {
    setErrors({});
    const localErrors = {};
    if (email.length > 0 && !validator.isEmail(email)) {
      localErrors.email = 'Email address format: name@example.com';
    }
    if (username.length < 4) {
      localErrors.username = 'This field must be at least 4 characters.';
    }
    if (password.length < 6) {
      localErrors.password = 'This field must be at least 6 characters.';
    }
    if (password !== password2) {
      localErrors.password2 = "Password don't match";
    }
    setErrors(localErrors);
    return Object.entries(localErrors).length !== 0;
  };

  useEffect(() => {
    if (submitted) {
      if (Object.entries(serverErrors).length !== 0) {
        setErrors(serverErrors);
      } else {
        hasLocalErrors();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, serverErrors, email, username, password, password2]);

  const validate = e => {
    e.preventDefault();
    setSubmitted(true);
    if (!hasLocalErrors()) {
      submit();
    }
  };

  const onKeydown = e => {
    if (Object.entries(serverErrors).length !== 0) {
      storeDispatch(AuthActions.setErrors({}));
    }
    if (e.key === 'Enter' && !disabled) {
      validate(e);
    }
  };

  return (
    <Styles.Container>
      <form onSubmit={validate}>
        <TextField
          id="signup-email"
          label="Email"
          className={classes.Form}
          margin="normal"
          variant="outlined"
          error={errors.email !== undefined}
          helperText={errors.email}
          value={email}
          fullWidth
          onInput={event => setEmail(event.target.value)}
          onKeyDown={onKeydown}
        />
        <TextField
          id="signup-username"
          label="Username"
          className={classes.Form}
          margin="normal"
          variant="outlined"
          error={errors.username !== undefined}
          helperText={errors.username}
          value={username}
          fullWidth
          onInput={event => setUsername(event.target.value)}
          onKeyDown={onKeydown}
        />
        <TextField
          id="signup-password"
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
        <TextField
          id="signup-password2"
          label="Confirm Password"
          type="password"
          className={classes.Form}
          margin="normal"
          variant="outlined"
          error={errors.password2 !== undefined}
          helperText={errors.password2}
          value={password2}
          fullWidth
          onInput={event => setPassword2(event.target.value)}
          onKeyDown={onKeydown}
        />
        <Styles.Actions>
          <Link
            component={RouterLink}
            to="/signin"
            underline="none"
            variant="body2"
          >
            Sign in instead
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={validate}
            disabled={disabled}
          >
            Sign up
          </Button>
        </Styles.Actions>
      </form>
    </Styles.Container>
  );
};

export default Signup;
