import React from 'react';
import { type } from 'ramda';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import myTheme from '../theme.js';
import TableCell from '@material-ui/core/TableCell';
import ScoutRow from '../common/scout-row';
import EditButton from './edit-button';
import DeleteButton from './delete-button';

export default ({ row, index, isEditing }) => {
  const theme = useTheme(myTheme);

  return (
    <ScoutRow>
      <TableCell
        width={`${theme.waitingList.controlColumnWidth}`}
        height={`${theme.waitingList.controlColumnHeight}`}
        style={{ padding: '8px' }}
      >
        {type(isEditing) === 'Boolean' && (
          <div style={{ display: 'flex' }}>
            <EditButton row={row} />
            <DeleteButton id={row.id} />
          </div>
        )}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.targetSection}</TableCell>
      <TableCell>{row.points}</TableCell>
      <TableCell align="right">
        {moment.unix(row.dateJoinedWaitingList.seconds).format(theme.dateFormat)}
      </TableCell>
    </ScoutRow>
  );
};
