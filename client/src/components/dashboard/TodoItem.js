import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const TodoItem = ({
  todo: { id, title, dueDate, status },
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
          Due: <Moment format="MMMM Do YYYY, hh:mm a">{dueDate}</Moment>
        </Typography>
        <Typography
          variant="body2"
          component="p"
        >
          Status: {status}
        </Typography>
      </CardContent>
      <CardActions>
        {!isEditMode && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onEdit(id)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => onDelete(id)}
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
