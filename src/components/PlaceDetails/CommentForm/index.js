import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Fab } from '@material-ui/core';
import { MdSend } from 'react-icons/md';

import { SocketContext } from '../../../context/socket';

const CommentForm = () => {
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
    <>
      <TextField
        id="comment-input"
        variant="filled"
        margin="dense"
        placeholder="Comentário"
        value={input}
        fullWidth
        hiddenLabel
        onInput={event => setInput(event.target.value)}
      />
      <Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="send"
        disabled={input === ''}
        onClick={submit}
      >
        <MdSend />
      </Fab>
    </>
  );
};

export default CommentForm;
