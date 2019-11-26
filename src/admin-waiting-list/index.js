import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import ScoutRow from '../common/scout-row';
import BottomRightFab from './bottom-right-fab';
import Hamburger from './hamburger';
import useAdminWaitingListStyles from '../common/use-waiting-list-styles';
import useAdminWaitingListReducer from './use-admin-waiting-list-reducer';

const rows = [
  { id: '5eafc', points: 50, startDate: '23/02/2019' },
  { id: '6hsdaf', points: 237, startDate: '13/02/2020' },
  { id: '834', points: 262, startDate: '20/05/2019' },
  { id: 'safd32', points: 305, startDate: '02/10/2021' },
  { id: '43543safd', points: 356, startDate: '16/04/2019' },
];

export default function AdminWaitingList() {
  const classes = useAdminWaitingListStyles();
  const theme = useTheme();
  const [state, actions] = useAdminWaitingListReducer({
    rows,
    isEditing: false,
    editingRow: { id: '', points: 0, startDate: moment().format('DD/MM/YYYY') },
  });

  const onDragEnd = ({ source, destination }) => {
    actions.switchRows({ source, destination });
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
                  {state.rows.map((row, index) => (
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
                  {state.isEditing && (
                    <>
                      <TableRow>
                        <TableCell width="25"></TableCell>
                        <TableCell>
                          <TextField
                            id="newId"
                            label="Id"
                            className={classes.textField}
                            value={state.editingRow.id}
                            onChange={ev =>
                              actions.setEditingRowId(ev.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="newPoints"
                            label="points"
                            className={classes.textField}
                            type="number"
                            value={state.editingRow.points}
                            onChange={ev =>
                              actions.setEditingRowPoints(ev.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <MuiPickersUtilsProvider
                            libInstance={moment}
                            locale={'en-GB'}
                            utils={MomentUtils}
                          >
                            <KeyboardDatePicker
                              variant="inline"
                              id="newPoints"
                              label="Start Date"
                              format="DD/MM/YYYY"
                              className={classes.textField}
                              inputValue={state.editingRow.startDate}
                              onChange={date =>
                                actions.setEditingRowStartDate(
                                  date.format('DD/MM/YYYY')
                                )
                              }
                              autoOk
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
                            onClick={() => actions.addNewRow(state.editingRow)}
                          >
                            <SaveIcon />
                            Save
                          </Button>
                          <Button
                            color="primary"
                            size="small"
                            className={classes.margin}
                            onClick={() => actions.setIsEditing(false)}
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
      {!state.isEditing && (
        <Zoom key="secondary" in={!state.isEditing} unmountOnExit>
          <BottomRightFab
            color="secondary"
            aria-label="add"
            className={classes.fab}
            onClick={() => actions.setIsEditing(true)}
          >
            <AddIcon />
          </BottomRightFab>
        </Zoom>
      )}
    </>
  );
}
