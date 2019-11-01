import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const rows = [
  { id: '5eafc', points: 50, startDate: '23/02/2019' },
  { id: '6hsdaf', points: 237, startDate: '13/02/2020' },
  { id: '834', points: 262, startDate: '20/05/2019' },
  { id: 'safd32', points: 305, startDate: '02/10/2021' },
  { id: '43543safd', points: 356, startDate: '16/04/2019' },
];

const Hamburger = styled.i`
  color: #aaa;
`;

const ScoutRow = styled(TableRow)`
  background-color: #fff;
  display: table;
`;

export default function AdminUserTable() {
  const classes = useStyles();
  const onDragEnd = (...args) => {
    console.log({ args });
  };

  return (
    <Paper className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Scout Id</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Start Date</TableCell>
            </TableRow>
          </TableHead>
          <Droppable droppableId="scout-list">
            {droppableProvided => (
              <TableBody
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {rows.map((row, index) => (
                  <Draggable draggableId={row.id} index={index} key={row.id}>
                    {draggableProvided => (
                      <ScoutRow
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                      >
                        <TableCell
                          width="25"
                          {...draggableProvided.dragHandleProps}
                        >
                          <Hamburger className="fa fa-bars" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                        <TableCell align="right">{row.startDate}</TableCell>
                      </ScoutRow>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </Paper>
  );
}
