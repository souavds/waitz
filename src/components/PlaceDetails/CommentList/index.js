import React from 'react';
import { ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Scrollbar } from 'react-scrollbars-custom';
import AutoSizer from 'react-virtualized-auto-sizer';

const useStyles = makeStyles(theme => ({
  List: {
    listStyle: 'none'
  }
}));

const CommentList = ({ comments }) => {
  const classes = useStyles();

  return (
    <>
      {comments.length > 0 ? (
        <AutoSizer
          style={{ height: comments.length < 3 ? comments.length * 72 : 216 }}
        >
          {({ height, width }) => (
            <Scrollbar
              style={{
                height: comments.length < 3 ? comments.length * 72 : 216,
                width
              }}
              className={classes.List}
            >
              {comments.map((comment, index) => (
                <React.Fragment key={index}>
                  {index % 2 !== 0 ? (
                    <Divider variant="middle" component="li" />
                  ) : null}
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={comment.text}
                      secondary={
                        <React.Fragment>{comment.user}</React.Fragment>
                      }
                    />
                  </ListItem>
                  {index % 2 !== 0 ? (
                    <Divider variant="middle" component="li" />
                  ) : null}
                </React.Fragment>
              ))}
            </Scrollbar>
          )}
        </AutoSizer>
      ) : null}
    </>
  );
};

export default CommentList;
