import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import RowIcon from './row-icon';

export default ({ id }) => {
  const theme = useTheme();
  const firestore = useFirestore();

  const deleteRow = async () => {
    await firestore.delete({ collection: 'scouts', doc: id });
    const scoutsSensitive = await firestore.get({
      collection: 'scouts-sensitive',
      where: ['scoutId', '==', id],
    });
    return firestore.delete({
      collection: 'scouts-sensitive',
      doc: scoutsSensitive.docs[0].id,
    });
  };

  return (
    <Button onClick={deleteRow}>
      <RowIcon>
        <i class="fa fa-trash" color={theme.palette.muted[200]} />
      </RowIcon>
    </Button>
  );
};
