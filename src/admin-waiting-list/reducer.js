import moment from 'moment';

import {
  ADD_NEW_ROW,
  SWITCH_ROWS,
  SET_IS_EDITING,
  SET_EDITING_ROW_ACTION_NAME,
  SET_EDITING_ROW_ACTION_TARGET_SECTION,
  SET_EDITING_ROW_ACTION_POINTS,
  SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
} from './actions-names';

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

const setIsEditingAction = (state, { newValue }) => {
  return {
    ...state,
    isEditing: newValue,
  };
};

const setEditingRowNameAction = (state, { newValue }) => {
  return {
    ...state,
    addingRow: {
      ...state.addingRow,
      name: newValue,
    },
  };
};

const setEditingRowTargetSectionAction = (state, { newValue }) => {
  return {
    ...state,
    addingRow: {
      ...state.addingRow,
      targetSection: newValue,
    },
  };
};

const setEditingRowPointsAction = (state, { newValue }) => {
  return {
    ...state,
    addingRow: {
      ...state.addingRow,
      points: newValue,
    },
  };
};

const setEditingRowDateJoinedWaitingListAction = (state, { newValue }) => {
  return {
    ...state,
    addingRow: {
      ...state.addingRow,
      dateJoinedWaitingList: newValue,
    },
  };
};

export default function reducer(
  state = {
    isEditing: false,
    addingRow: {
      name: '',
      targetSection: '',
      points: 0,
      dateJoinedWaitingList: moment().format('DD/MM/YYYY'),
    },
  },
  action
) {
  switch (action.type) {
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
