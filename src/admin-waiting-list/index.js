import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFirestoreConnect,
  useFirestore,
  isLoaded,
} from 'react-redux-firebase';
import {
  assoc,
  compose,
  find,
  filter,
  map,
  prop,
  sortBy,
  toPairs,
} from 'ramda';
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BottomRightFabContainer from './bottom-right-fab-container';
import useAdminWaitingListStyles from '../common/use-waiting-list-styles';
import DraggableWaitingListRow from '../draggable-waiting-list-row';
import EditableWaitingListRow from '../editable-waiting-list-row';
import AddWaitingListRow from '../add-waiting-list-row';
import * as actions from './action-creators';
import shuffleListAfterDrag from './shuffle-list-after-drag';

export default function AdminWaitingList() {
  const classes = useAdminWaitingListStyles();
  const theme = useTheme();
  useFirestoreConnect([
    { collection: 'scouts', orderBy: ['rank'] },
    { collection: 'scouts-sensitive' },
  ]);
  const firestore = useFirestore();

  const dispatch = useDispatch();
  const scouts = useSelector(state =>
    compose(
      sortBy(prop('rank')),
      map(pair => assoc('id', pair[0], pair[1])),
      filter(pair => pair[1]),
      toPairs
    )(state.firestore.data.scouts)
  );
  const scoutsSensitive = useSelector(
    state => state.firestore.ordered['scouts-sensitive']
  );
  const { isEditing, isAdding } = useSelector(state => state.adminWaitingList);

  const allDataLoaded = isLoaded(scouts) && isLoaded(scoutsSensitive);

  let rows = [];

  if (allDataLoaded) {
    rows = map(scout => {
      const sensitive = find(s => s.scoutId === scout.id, scoutsSensitive);

      return assoc('name', prop('name', sensitive), scout);
    }, scouts);
  }

  const onDragEnd = async ({ source, destination, draggableId }) => {
    console.log({ source, destination, draggableId });
    if (source.index === destination.index) return;

    await shuffleListAfterDrag(
      firestore.update,
      scouts,
      source.index,
      destination.index,
      draggableId
    );
    //actions.switchRowsActionCreator(dispatch)({ source, destination });
  };

  const renderDisplayRowBasedOnState = (row, index, isEditing) => {
    return isEditing ? (
      <EditableWaitingListRow
        isEditing={isEditing}
        row={row}
        index={index}
        key={row.id}
      />
    ) : (
      <DraggableWaitingListRow row={row} index={index} key={row.id} />
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
                    {rows.map((row, index) =>
                      renderDisplayRowBasedOnState(row, index, isEditing)
                    )}
                    {isAdding && <AddWaitingListRow nextRank={scouts.length} />}
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
            in={isEditing && !isAdding}
            style={{
              transitionDelay: isEditing && !isAdding ? '500ms' : '0ms',
            }}
            appear={true}
            mountOnEnter
            unmountOnExit
          >
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fab}
              onClick={() => actions.setIsAddingActionCreator(dispatch)(true)}
              style={{ margin: theme.spacing(1, 0) }}
            >
              <i className="fa fa-plus" />
            </Fab>
          </Slide>
          <Slide
            key="stopEdit"
            direction="up"
            in={!!isEditing}
            style={{ transitionDelay: isEditing ? '500ms' : '0ms' }}
            appear={true}
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
              <i className="fa fa-close" />
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
              <i className="fa fa-pen" />
            </Fab>
          </Slide>
        </BottomRightFabContainer>
      )}
      {!allDataLoaded && <span>Loading...</span>}
    </>
  );
}
