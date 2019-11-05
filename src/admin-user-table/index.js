import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
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
  color: ${props => props.color};
`;

const BottomRightFab = styled(Fab)`
  margin: 0px;
  top: auto;
  right: 20px;
  bottom: 20px;
  left: auto;
  position: fixed !important;
`;

const ScoutRow = styled(TableRow)`
  background-color: ${props => (props.isdragging === 'true' ? '#fff' : 'auto')};
  ${props =>
    props.isdragging === 'true'
      ? 'display: table !important; table-layout: fixed'
      : ''}
`;

export default function AdminUserTable() {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState(rows);
  const [isEditing, setIsEditing] = useState(false);

  const onDragEnd = result => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const sourceVal = data[source.index];
    const destinationVal = data[destination.index];

    const newState = [...data];

    newState.splice(source.index, 1, destinationVal);
    newState.splice(destination.index, 1, sourceVal);

    setData(newState);
  };

  return (
    <>
      <Paper className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Scout Id</TableCell>
                <TableCell>Points</TableCell>
                <TableCell align="right">Start Date</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="scout-list">
              {droppableProvided => (
                <TableBody
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {data.map((row, index) => (
                    <Draggable draggableId={row.id} index={index} key={row.id}>
                      {(draggableProvided, snapshot) => (
                        <ScoutRow
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          isdragging={`${snapshot.isDragging}`}
                        >
                          <TableCell
                            width="25"
                            {...draggableProvided.dragHandleProps}
                          >
                            <Hamburger
                              className="fa fa-bars"
                              color={theme.palette.muted[200]}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell>{row.points}</TableCell>
                          <TableCell align="right">{row.startDate}</TableCell>
                        </ScoutRow>
                      )}
                    </Draggable>
                  ))}
                  {isEditing && (
                    <>
                      <TableRow>
                        <TableCell width="25"></TableCell>
                        <TableCell>
                          <TextField
                            id="newId"
                            label="Id"
                            className={classes.textField}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="newPoints"
                            label="points"
                            className={classes.textField}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              variant="inline"
                              id="newPoints"
                              label="Start Date"
                              format="DD/MM/YYYY"
                              className={classes.textField}
                            />
                          </MuiPickersUtilsProvider>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="25" />
                        <TableCell />
                        <TableCell />
                        <TableCell align="right">
                          <Button
                            color="primary"
                            variant="contained"
                            aria-label="save"
                            style={{ margin: theme.spacing(0, 1) }}
                            onClick={() => setIsEditing(false)}
                          >
                            <SaveIcon />
                            Save
                          </Button>
                          <Button
                            color="primary"
                            size="small"
                            className={classes.margin}
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {droppableProvided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </Paper>
      {!isEditing && (
        <Zoom key="secondary" in={!isEditing} unmountOnExit>
          <BottomRightFab
            color="secondary"
            aria-label="add"
            className={classes.fab}
            onClick={() => setIsEditing(true)}
          >
            <AddIcon />
          </BottomRightFab>
        </Zoom>
      )}
    </>
  );
}
