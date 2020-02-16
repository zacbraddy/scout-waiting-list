import React from 'react';
import { path } from 'ramda';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import RowIcon from './row-icon';

import { setIsEditingActionCreator } from '../admin-waiting-list/action-creators';
import { setEditingRow } from './action-creators';

export default ({
  row: {
    id,
    scoutManualId,
    name,
    points,
    targetSection,
    dateJoinedWaitingList,
    rank,
  },
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const startEditing = () => {
    setIsEditingActionCreator(dispatch)(id);
    setEditingRow(dispatch)({
      scoutManualId,
      name,
      points,
      targetSection,
      dateJoinedWaitingList: moment
        .unix(path(['seconds'], dateJoinedWaitingList))
        .format(theme.dateFormat),
      rank,
    });
  };

  return (
    <Button onClick={startEditing}>
      <RowIcon>
        <i className="fa fa-pen" color={theme.palette.muted[200]} />
      </RowIcon>
    </Button>
  );
};
