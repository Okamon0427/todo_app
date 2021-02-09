import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Avatar, IconButton, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, TextField, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import { ERROR_MESSAGE, REGEX } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  textForm: {
    paddingRight: theme.spacing(0),
    paddingLeft: theme.spacing(0),
  },
}));

const {
  USER_NAME_REQUIRED,
  EMAIL_REQUIRED,
  EMAIL_VALID
} = ERROR_MESSAGE;
const { EMAIL_REGEX } = REGEX;

const UserInfo = ({ userData, editInfo, onEdit, onCancel, onSubmit }) => {
  const classes = useStyles();
  const { register, errors, handleSubmit, reset } = useForm();

  const initialValues = {
    name: userData ? userData.name : null,
    email: userData ? userData.email : null
  };

  useEffect(() => {
    reset(initialValues);
    //eslint-disable-next-line
  }, [editInfo]);

  const info = [
    {
      key: 'name',
      label: 'User Name',
      value: userData ? userData.name : null,
      icon: <PersonIcon />,
      validationKey: { required: true },
      validationMsg: { 0: USER_NAME_REQUIRED, 1: null }
    },
    {
      key: 'email',
      label: 'Email',
      value: userData ? userData.email : null,
      icon: <EmailIcon />,
      validationKey: { required: true, pattern: EMAIL_REGEX },
      validationMsg: { 0: EMAIL_REQUIRED, 1: EMAIL_VALID }
    }
  ]

  return (
    <List className={classes.root}>
      {info.map((item) => (
        editInfo === item.key ? (
          <ListItem
            key={item.key}
            className={classes.textForm}
          >
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                name={item.key}
                label={item.label}
                inputRef={register(item.validationKey)}
                error={errors[item.key]}
                helperText={(
                  errors[item.key] && errors[item.key].type === "required" &&
                  item.validationMsg[0]
                ) || (
                  errors[item.key] && errors[item.key].type === "pattern" &&
                  item.validationMsg[1]
                )}
              />
              <Tooltip title="Update">
                <IconButton
                  type="submit"
                  edge="end"
                  aria-label="submit"
                >
                  <PublishIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton
                  edge="end"
                  aria-label="cancel"
                  onClick={onCancel}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </form>
          </ListItem>
        ) : (
          <ListItem
            key={item.key}
            className={classes.textForm}
          >
            <ListItemAvatar>
              <Avatar>{item.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.label}
              secondary={item.value}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Edit">
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEdit(item.key)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        )
      ))}
    </List>
  )
}

export default UserInfo;