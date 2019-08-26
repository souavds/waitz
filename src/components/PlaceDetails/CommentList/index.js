import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from '@material-ui/core';

const CommentList = ({ comments }) => {
  return (
    <List>
      {comments.map((comment, index) => (
        <React.Fragment key={index}>
          {index % 2 !== 0 ? <Divider variant="middle" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={comment.text}
              secondary={<React.Fragment>{comment.user_id}</React.Fragment>}
            />
          </ListItem>
          {index % 2 !== 0 ? <Divider variant="middle" component="li" /> : null}
        </React.Fragment>
      ))}
    </List>
  );
};

export default CommentList;
