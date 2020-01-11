import React from 'react';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import ScoutRow from '../common/scout-row';
import EditButton from './edit-button';
import DeleteButton from './delete-button';

export default ({ row, index }) => {
  return (
    <ScoutRow>
      <TableCell width="25" style={{ padding: '8px' }}>
        <div style={{ display: 'flex' }}>
          <EditButton />
          <DeleteButton id={row.id} />
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.targetSection}</TableCell>
      <TableCell>{row.points}</TableCell>
      <TableCell align="right">
        {moment.unix(row.dateJoinedWaitingList.seconds).format('DD/MM/YYYY')}
      </TableCell>
    </ScoutRow>
  );
};
