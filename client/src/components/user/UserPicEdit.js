import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { editUserImage } from '../../actions/user';
import { PATH_URL } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 300,
    padding: 20,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const UserPicEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(state => state.user);

  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const onChange = (e) => {
    const tempFile = e.target.files[0];
    setFile(tempFile);

    if(tempFile) {
      const reader = new FileReader();
      reader.readAsDataURL(tempFile);
      reader.onloadend = () => {
        setPreviewFile(reader.result);
      }
    } else {
      setPreviewFile(null);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    dispatch(editUserImage(formData, user._id));

    setFile(null);
    setPreviewFile(null);
    history.push(PATH_URL.USER);
  }

  const onCancel = () => {
    setFile(null);
    setPreviewFile(null);
    history.push(PATH_URL.USER);
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h6"
                className={classes.marginBottom}
              >
                Update Avatar
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                className={classes.large}
                src={previewFile}
              />
            </Grid>
            <Grid>
              <form onSubmit={onSubmit}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={onChange}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    className={classes.button}
                    size="small"
                    color="primary"
                    component="span"
                  >
                    Choose Image
                  </Button>
                </label>
                <Button
                  className={classes.button}
                  size="small"
                  color="primary"
                  type="submit"
                  disabled={!file}
                >
                  Submit
                </Button>
              </form>
            </Grid>
            <Grid>
              <Button
                className={classes.button}
                size="small"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserPicEdit;