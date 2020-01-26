import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  assoc,
  compose,
  dissoc,
  defaultTo,
  find,
  head,
  path,
  toPairs,
} from 'ramda';
import { useFirestore } from 'react-redux-firebase';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { setIsEditingActionCreator } from '../admin-waiting-list/action-creators';

import RowIcon from './row-icon';

export default ({ id }) => {
  const theme = useTheme();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const editRow = useSelector(state => state.editingRow);
  const scoutsSensitiveId = useSelector(state =>
    compose(
      head,
      defaultTo([]),
      find(row => path(['1', 'scoutId'], row) === id),
      toPairs
    )(state.firestore.data['scouts-sensitive'])
  );

  const saveEdit = async () => {
    await firestore.set(
      { collection: 'scouts', doc: id },
      compose(
        dissoc('name'),
        assoc(
          'dateJoinedWaitingList',
          firestore.Timestamp.fromDate(
            moment(editRow.dateJoinedWaitingList, theme.dateFormat).toDate()
          )
        )
      )(editRow)
    );
    await firestore.set(
      { collection: 'scouts-sensitive', doc: scoutsSensitiveId },
      { name: editRow.name, scoutId: id }
    );
    setIsEditingActionCreator(dispatch)(true);
  };

  return (
    <Button onClick={saveEdit}>
      <RowIcon>
        <i className="fa fa-save" color={theme.palette.muted[200]} />
      </RowIcon>
    </Button>
  );
};
