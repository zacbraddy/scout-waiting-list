import {
  ADD_NEW_ROW,
  SWITCH_ROWS,
  SET_IS_EDITING,
  SET_EDITING_ROW_ACTION_NAME,
  SET_EDITING_ROW_ACTION_TARGET_SECTION,
  SET_EDITING_ROW_ACTION_POINTS,
  SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
} from './actions';

export const switchRowsActionCreator = dispatch => ({
  source,
  destination,
}) => {
  if (!destination || source.index === destination.index) return;

  dispatch({
    type: SWITCH_ROWS,
    sourceIndex: source.index,
    destinationIndex: destination.index,
  });
};

export const setIsEditingActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_IS_EDITING,
    newValue,
  });
};

export const setEditingRowNameActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_NAME,
    newValue,
  });
};

export const setEditingRowTargetSectionActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_TARGET_SECTION,
    newValue,
  });
};

export const setEditingRowPointsActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_POINTS,
    newValue,
  });
};

export const setEditingRowDateJoinedWaitingListActionCreator = dispatch => newValue => {
  dispatch({
    type: SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
    newValue,
  });
};

export const addNewRowActionCreator = dispatch => newRow => {
  dispatch({
    type: ADD_NEW_ROW,
    newRow,
  });
};
