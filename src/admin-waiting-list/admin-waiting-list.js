import React from 'react';
import { useSelector } from 'react-redux';
import {
  useFirestoreConnect,
  useFirestore,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import { assoc, find, map } from 'ramda';
import { useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import ScoutRow from '../common/scout-row';
import BottomRightFab from './bottom-right-fab';
import Hamburger from './hamburger';
import useAdminWaitingListStyles from '../common/use-waiting-list-styles';
import * as actions from './action-creators';

export default function AdminWaitingList() {
  const classes = useAdminWaitingListStyles();
  const theme = useTheme();
  useFirestoreConnect([
    { collection: 'scouts' },
    { collection: 'scouts-sensitive' },
  ]);

  const firestore = useFirestore();

  const scouts = useSelector(state => state.firestore.ordered.scouts);
  const scoutsSensitive = useSelector(
    state => state.firestore.ordered['scouts-sensitive']
  );
  const addRow = useSelector(state => state.addRow);

  const allDataLoaded =
    isLoaded(scouts) &&
    !isEmpty(scouts) &&
    isLoaded(scoutsSensitive) &&
    !isEmpty(scoutsSensitive);

  let rows = [];

  if (allDataLoaded) {
    rows = map(scout => {
      const sensitive = find(s => s['scout-id'] === scout.id, scoutsSensitive);

      return assoc('name', sensitive['scout-name'], scout);
    }, scouts);
  }

  const onDragEnd = ({ source, destination }) => {
    actions.switchRowsActionCreator({ source, destination });
  };

  return (
    <>
      {allDataLoaded && (
        <Paper className={classes.root}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Scout Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Target Section</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell align="right">Date joined waiting list</TableCell>
                </TableRow>
              </TableHead>
              <Droppable droppableId="scout-list">
                {droppableProvided => (
                  <TableBody
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                  >
                    {rows.map((row, index) => (
                      <Draggable
                        draggableId={row.id}
                        index={index}
                        key={row.id}
                      >
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
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row['target-section']}</TableCell>
                            <TableCell>{row.points}</TableCell>
                            <TableCell align="right">
                              {moment
                                .unix(row['date-joined-waiting-list'].seconds)
                                .format('DD/MM/YYYY')}
                            </TableCell>
                          </ScoutRow>
                        )}
                      </Draggable>
                    ))}
                    {addRow.isEditing && (
                      <>
                        <TableRow>
                          <TableCell width="25"></TableCell>
                          <TableCell />
                          <TableCell>
                            <TextField
                              id="newName"
                              label="name"
                              className={classes.textField}
                              value={addRow.editingRow.name}
                              onChange={ev =>
                                actions.setEditingRowNameActionCreator(
                                  ev.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="newTargetSection"
                              label="targetSection"
                              className={classes.textField}
                              value={addRow.editingRow.targetSection}
                              onChange={ev =>
                                actions.setEditingRowTargetSectionActionCreator(
                                  ev.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="newPoints"
                              label="points"
                              className={classes.textField}
                              type="number"
                              value={addRow.editingRow.points}
                              onChange={ev =>
                                actions.setEditingRowPointsActionCreator(
                                  ev.target.value
                                )
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
                                inputValue={
                                  addRow.editingRow.dateJoinedWaitingList
                                }
                                onChange={date =>
                                  actions.setEditingRowDateJoinedWaitingListActionCreator(
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
                          <TableCell />
                          <TableCell />
                          <TableCell align="right">
                            <Button
                              color="primary"
                              variant="contained"
                              aria-label="save"
                              style={{ margin: theme.spacing(0, 1) }}
                              onClick={() =>
                                actions.addNewRowActionCreator(
                                  addRow.editingRow
                                )
                              }
                            >
                              <SaveIcon />
                              Save
                            </Button>
                            <Button
                              color="primary"
                              size="small"
                              className={classes.margin}
                              onClick={() =>
                                actions.setIsEditingActionCreator(false)
                              }
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
      )}
      {allDataLoaded && !addRow.isEditing && (
        <Zoom key="secondary" in={!addRow.isEditing} unmountOnExit>
          <BottomRightFab
            color="secondary"
            aria-label="add"
            className={classes.fab}
            onClick={() => actions.setIsEditingActionCreator(true)}
          >
            <AddIcon />
          </BottomRightFab>
        </Zoom>
      )}
      {!allDataLoaded && <span>Loading...</span>}
    </>
  );
}
