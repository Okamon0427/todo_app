import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import UserPic from './UserPic';
import UserInfo from './UserInfo';
import { initialUserData } from '../../utils/data';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [editInfo, setEditInfo] = useState(null);

  useEffect(() => {
    setUserData(initialUserData);
  }, [])

  const onEdit = (key) => {
    setEditInfo(key);
  }

  const onCancel = () => {
    setEditInfo(null);
  }

  const onSubmit = (data) => {
    console.log(data);
    const prevUserData = { ...userData }
    prevUserData[editInfo] = data[editInfo];
    const newUserData = prevUserData;
    setUserData(newUserData);
    setEditInfo(null);
  }

  return (
    <Paper>
      <UserPic userData={userData} />
      <UserInfo
        userData={userData}
        editInfo={editInfo}
        onEdit={onEdit}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Paper>
  )
}

export default User;