import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import RowIcon from './row-icon';

import { setIsEditingActionCreator } from '../admin-waiting-list/action-creators';

export default () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Button onClick={() => setIsEditingActionCreator(dispatch)(true)}>
      <RowIcon>
        <i className="fa fa-close" color={theme.palette.muted[200]} />
      </RowIcon>
    </Button>
  );
};
