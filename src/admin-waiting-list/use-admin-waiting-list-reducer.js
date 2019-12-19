import { useReducer } from 'react';

const SWITCH_ROWS = 'SWITCH_ROWS';
const SET_IS_EDITING = 'SET_IS_EDITING';
const SET_EDITING_ROW_ACTION_NAME = 'SET_EDITING_ROW_ACTION_NAME';
const SET_EDITING_ROW_ACTION_TARGET_SECTION =
  'SET_EDITING_ROW_ACTION_TARGET_SECTION';
const SET_EDITING_ROW_ACTION_POINTS = 'SET_EDITING_ROW_ACTION_POINTS';
const SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST =
  'SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST';
const ADD_NEW_ROW = 'ADD_NEW_ROW';

const switchRowsActionCreator = dispatch => ({ source, destination }) => {
  if (!destination || source.index === destination.index) return;

  dispatch({
    type: SWITCH_ROWS,
    sourceIndex: source.index,
    destinationIndex: destination.index,
  });
};

const switchRowsAction = (state, { sourceIndex, destinationIndex }) => {
  const { rows } = state;
  const sourceVal = rows[sourceIndex];
  const destinationVal = rows[destinationIndex];

  const newRows = [...rows];

  newRows.splice(sourceIndex, 1, destinationVal);
  newRows.splice(destinationIndex, 1, sourceVal);

  return {
    ...state,
    rows: newRows,
  };
};

const setIsEditingActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_IS_EDITING,
    newValue,
  });
};

const setIsEditingAction = (state, { newValue }) => {
  return {
    ...state,
    isEditing: newValue,
  };
};

const setEditingRowNameActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_NAME,
    newValue,
  });
};

const setEditingRowNameAction = (state, { newValue }) => {
  return {
    ...state,
    editingRow: {
      ...state.editingRow,
      name: newValue,
    },
  };
};

const setEditingRowTargetSectionActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_TARGET_SECTION,
    newValue,
  });
};

const setEditingRowTargetSectionAction = (state, { newValue }) => {
  return {
    ...state,
    editingRow: {
      ...state.editingRow,
      targetSection: newValue,
    },
  };
};

const setEditingRowPointsActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_POINTS,
    newValue,
  });
};

const setEditingRowPointsAction = (state, { newValue }) => {
  return {
    ...state,
    editingRow: {
      ...state.editingRow,
      points: newValue,
    },
  };
};

const setEditingRowsDateJoinedWaitingListActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
    newValue,
  });
};

const setEditingRowDateJoinedWaitingListAction = (state, { newValue }) => {
  return {
    ...state,
    editingRow: {
      ...state.editingRow,
      dateJoinedWaitingList: newValue,
    },
  };
};

const addNewRowActionCreator = dispatch => newRow => {
  dispatch({
    type: ADD_NEW_ROW,
    newRow,
  });
};

const addNewRowAction = (state, { newRow }) => {
  return {
    ...state,
    rows: [...state.rows, newRow],
  };
};

function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_ROW:
      return addNewRowAction(state, action);
    case SET_EDITING_ROW_ACTION_NAME:
      return setEditingRowNameAction(state, action);
    case SET_EDITING_ROW_ACTION_TARGET_SECTION:
      return setEditingRowTargetSectionAction(state, action);
    case SET_EDITING_ROW_ACTION_POINTS:
      return setEditingRowPointsAction(state, action);
    case SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST:
      return setEditingRowDateJoinedWaitingListAction(state, action);
    case SET_IS_EDITING:
      return setIsEditingAction(state, action);
    case SWITCH_ROWS:
      return switchRowsAction(state, action);
    default:
      return state;
  }
}

export default function useAdminWaitingListReducer(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [
    state,
    {
      addNewRow: addNewRowActionCreator(dispatch),
      switchRows: switchRowsActionCreator(dispatch),
      setIsEditing: setIsEditingActionCreator(dispatch),
      setEditingRowName: setEditingRowNameActionCreator(dispatch),
      setEditingRowTargetSection: setEditingRowTargetSectionActionCreator(
        dispatch
      ),
      setEditingRowPoints: setEditingRowPointsActionCreator(dispatch),
      setEditingRowDateJoinedWaitingList: setEditingRowsDateJoinedWaitingListActionCreator(
        dispatch
      ),
    },
  ];
}
