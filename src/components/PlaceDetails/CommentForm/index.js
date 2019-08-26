import React, { useState } from 'react';
import { TextField, Fab } from '@material-ui/core';
import { MdSend } from 'react-icons/md';

const CommentForm = () => {
  const [input, setInput] = useState('');
  return (
    <>
      <TextField
        id="comment-input"
        variant="filled"
        margin="dense"
        placeholder="Comentário"
        defaultValue={input}
        fullWidth
        hiddenLabel
        onChange={event => setInput(event.target.value)}
      />
      <Fab variant="extended" size="small" color="primary" aria-label="send">
        <MdSend />
      </Fab>
    </>
  );
};

export default CommentForm;
