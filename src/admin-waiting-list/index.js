import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFirestoreConnect,
  useFirestore,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import { assoc, compose, dissoc, find, map, prop } from 'ramda';
import { useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Fab from '@material-ui/core/Fab';
import MomentUtils from '@date-io/moment';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BottomRightFabContainer from './bottom-right-fab-container';
import useAdminWaitingListStyles from '../common/use-waiting-list-styles';
import DraggableWaitingListRow from '../draggable-waiting-list-row';
import * as actions from './action-creators';

export default function AdminWaitingList() {
  const classes = useAdminWaitingListStyles();
  const theme = useTheme();
  useFirestoreConnect([
    { collection: 'scouts' },
    { collection: 'scouts-sensitive' },
  ]);

  const firestore = useFirestore();

  const dispatch = useDispatch();
  const scouts = useSelector(state => state.firestore.ordered.scouts);
  const scoutsSensitive = useSelector(
    state => state.firestore.ordered['scouts-sensitive']
  );
  const { isEditing, addingRow } = useSelector(state => state.adminWaitingList);

  const allDataLoaded =
    isLoaded(scouts) &&
    !isEmpty(scouts) &&
    isLoaded(scoutsSensitive) &&
    !isEmpty(scoutsSensitive);

  let rows = [];

  if (allDataLoaded) {
    rows = map(scout => {
      const sensitive = find(s => s.scoutId === scout.id, scoutsSensitive);

      return assoc('name', prop('name', sensitive), scout);
    }, scouts);
  }

  const onDragEnd = ({ source, destination }) => {
    actions.switchRowsActionCreator(dispatch)({ source, destination });
  };

  const setRowToFirestore = async () => {
    const ar = assoc(
      'dateJoinedWaitingList',
      firestore.Timestamp.fromDate(
        moment(addingRow.dateJoinedWaitingList, 'DD/MM/YYYY').toDate()
      ),
      addingRow
    );

    const newScout = await firestore.add(
      { collection: 'scouts' },
      dissoc('name', ar)
    );

    return firestore.add(
      { collection: 'scouts-sensitive' },
      compose(
        assoc('name', prop('name', ar)),
        assoc('scoutId', prop('id', newScout))
      )({})
    );
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
                      <DraggableWaitingListRow
                        row={row}
                        index={index}
                        isEditing={isEditing}
                        key={row.id}
                      />
                    ))}
                    {isEditing && (
                      <>
                        <TableRow>
                          <TableCell width="25"></TableCell>
                          <TableCell />
                          <TableCell>
                            <TextField
                              id="newName"
                              label="name"
                              className={classes.textField}
                              value={addingRow.name}
                              onChange={ev =>
                                actions.setEditingRowNameActionCreator(
                                  dispatch
                                )(ev.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="newTargetSection"
                              label="targetSection"
                              className={classes.textField}
                              value={addingRow.targetSection}
                              onChange={ev =>
                                actions.setEditingRowTargetSectionActionCreator(
                                  dispatch
                                )(ev.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="newPoints"
                              label="points"
                              className={classes.textField}
                              type="number"
                              value={addingRow.points}
                              onChange={ev =>
                                actions.setEditingRowPointsActionCreator(
                                  dispatch
                                )(ev.target.value)
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
                                inputValue={addingRow.dateJoinedWaitingList}
                                onChange={date =>
                                  actions.setEditingRowDateJoinedWaitingListActionCreator(
                                    dispatch
                                  )(date.format('DD/MM/YYYY'))
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
                              onClick={() => setRowToFirestore()}
                            >
                              <SaveIcon />
                              Save
                            </Button>
                            <Button
                              color="primary"
                              size="small"
                              className={classes.margin}
                              onClick={() =>
                                actions.setIsEditingActionCreator(dispatch)(
                                  false
                                )
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
      {allDataLoaded && (
        <BottomRightFabContainer>
          <Slide
            key="add"
            direction="up"
            in={isEditing}
            style={{ transitionDelay: isEditing ? '500ms' : '0ms' }}
            appear="true"
            mountOnEnter
            unmountOnExit
          >
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fab}
              style={{ margin: theme.spacing(1, 0) }}
            >
              <AddIcon />
            </Fab>
          </Slide>
          <Slide
            key="stopEdit"
            direction="up"
            in={isEditing}
            style={{ transitionDelay: isEditing ? '500ms' : '0ms' }}
            appear="true"
            mountOnEnter
            unmountOnExit
          >
            <Fab
              color="secondary"
              aria-label="cancel edit"
              className={classes.fab}
              onClick={() => actions.setIsEditingActionCreator(dispatch)(false)}
              style={{ margin: theme.spacing(1, 0) }}
            >
              <CancelIcon />
            </Fab>
          </Slide>
          <Slide
            key="startEdit"
            direction="up"
            in={!isEditing}
            style={{ transitionDelay: !isEditing ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <Fab
              color="secondary"
              aria-label="start edit"
              className={classes.fab}
              onClick={() => actions.setIsEditingActionCreator(dispatch)(true)}
              style={{ margin: theme.spacing(1, 0) }}
            >
              <EditIcon />
            </Fab>
          </Slide>
        </BottomRightFabContainer>
      )}
      {!allDataLoaded && <span>Loading...</span>}
    </>
  );
}
