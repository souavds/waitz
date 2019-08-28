import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { FilledInput, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MdSend } from 'react-icons/md';

import { SocketContext } from '../../../context/socket';

import Styles from './style';

const useStyles = makeStyles(theme => ({
  Form: {
    margin: 0,
    borderRadius: 15,
    '& input': {
      padding: '10px 12px'
    }
  },
  Button: {
    marginLeft: 10
  }
}));

const CommentForm = () => {
  const classes = useStyles();

  const [input, setInput] = useState('');
  const socketContext = useContext(SocketContext);
  const placeSelected = useSelector(state => state.place.selected);

  const submit = () => {
    socketContext.newComment({
      user_id: 'arthur',
      place_id: placeSelected,
      text: input
    });
    setInput('');
  };

  return (
    <Styles.Container>
      <FilledInput
        id="comment-input"
        className={classes.Form}
        margin="none"
        placeholder="Comentário"
        value={input}
        fullWidth
        disableUnderline
        onInput={event => setInput(event.target.value)}
      />
      <Fab
        className={classes.Button}
        size="small"
        color="primary"
        aria-label="send"
        disabled={input === ''}
        onClick={submit}
      >
        <MdSend />
      </Fab>
    </Styles.Container>
  );
};

export default CommentForm;
