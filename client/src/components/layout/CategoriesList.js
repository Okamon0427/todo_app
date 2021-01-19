import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

const CategoriesList = ({ categories }) => {
  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard"
      >
        <ListItemText primary="All" />
      </ListItem>
      {categories && categories.map((category, index) => (
        <ListItem
          button
          key={category._id}
          component={Link}
          to={`/dashboard/${category._id}`}
        >
          <ListItemText primary={category.title} />
          <ListItemSecondaryAction>
            <IconButton
              type="submit"
              edge="end"
              aria-label="submit"
              >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="cancel"
            >
              <ClearIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default CategoriesList;