import React from 'react';
import Moment from 'react-moment';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DATE_FORMAT } from '../../utils/constants';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const { wordDate } = DATE_FORMAT

const TodoItem = ({
  todo: { _id, title, dueDate },
  onEdit,
  isEditMode,
  onDelete
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          component="p"
        >
          Due: <Moment format={wordDate}>{dueDate}</Moment>
        </Typography>
      </CardContent>
      <CardActions>
        {!isEditMode && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onEdit(_id)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => onDelete(_id)}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default TodoItem;
