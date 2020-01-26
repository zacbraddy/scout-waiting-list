import React from 'react';
import { compose, defaultTo, find, head, path, toPairs } from 'ramda';
import { useFirestore } from 'react-redux-firebase';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

import RowIcon from './row-icon';

export default ({ id }) => {
  const theme = useTheme();
  const firestore = useFirestore();
  const scoutsSensitiveId = useSelector(state =>
    compose(
      head,
      defaultTo([]),
      find(row => path(['1', 'scoutId'], row) === id),
      toPairs
    )(state.firestore.data['scouts-sensitive'])
  );

  const deleteRow = async () => {
    await firestore.delete({
      collection: 'scouts-sensitive',
      doc: scoutsSensitiveId,
    });
    await firestore.delete({ collection: 'scouts', doc: id });
  };

  return (
    <Button onClick={deleteRow}>
      <RowIcon>
        <i className="fa fa-trash" color={theme.palette.muted[200]} />
      </RowIcon>
    </Button>
  );
};
