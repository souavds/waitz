import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { MdGpsFixed, MdCheck } from 'react-icons/md';

import { SocketContext } from '../../../context/socket';

import Styles from './style';

const Controls = ({ onLocation }) => {
  const socketContext = useContext(SocketContext);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);

  return (
    <Styles.Container>
      {isAuthenticated && user.hasCheckinActive ? (
        <Fab
          aria-label="location"
          size="medium"
          style={{ marginBottom: 10 }}
          onClick={() => socketContext.newCheckOut(user.info.username)}
        >
          <MdCheck size="20" />
        </Fab>
      ) : null}
      <Fab aria-label="location" size="medium" onClick={onLocation}>
        <MdGpsFixed size="20" />
      </Fab>
    </Styles.Container>
  );
};

Controls.propTypes = {
  onLocation: PropTypes.func.isRequired
};

export default Controls;
