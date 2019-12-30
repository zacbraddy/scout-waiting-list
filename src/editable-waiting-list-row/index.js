import React from 'react';
import moment from 'moment';
import { Draggable } from 'react-beautiful-dnd';
import { useTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import ScoutRow from '../common/scout-row';
import Hamburger from './hamburger';

export DraggableWaitingListRow ({ row, index, isEditing }) => {
  const theme = useTheme();

  return (
    <Draggable draggableId={row.id} index={index}>
      {(draggableProvided, snapshot) => (
        <ScoutRow
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          isdragging={`${snapshot.isDragging}`}
        >
          <TableCell width="25" {...draggableProvided.dragHandleProps}>
            <Hamburger
              className="fa fa-bars"
              color={theme.palette.muted[200]}
            />
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.targetSection}</TableCell>
          <TableCell>{row.points}</TableCell>
          <TableCell align="right">
            {moment
              .unix(row.dateJoinedWaitingList.seconds)
              .format('DD/MM/YYYY')}
          </TableCell>
        </ScoutRow>
      )}
    </Draggable>
  );
};
