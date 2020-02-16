import {
  SET_EDITING_ROW,
  SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
  SET_EDITING_ROW_ACTION_NAME,
  SET_EDITING_ROW_ACTION_POINTS,
  SET_EDITING_ROW_ACTION_SCOUT_MANUAL_ID,
  SET_EDITING_ROW_ACTION_TARGET_SECTION,
} from './action-names';

export const setEditingRowScoutManualIdActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_EDITING_ROW_ACTION_SCOUT_MANUAL_ID,
    newValue,
  });
};

export const setEditingRowNameActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_EDITING_ROW_ACTION_NAME,
    newValue,
  });
};

export const setEditingRowTargetSectionActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_EDITING_ROW_ACTION_TARGET_SECTION,
    newValue,
  });
};

export const setEditingRowPointsActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_EDITING_ROW_ACTION_POINTS,
    newValue,
  });
};

export const setEditingRowDateJoinedWaitingListActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
    newValue,
  });
};

export const setEditingRow = dispatch => ({
  scoutManualId,
  name,
  points,
  targetSection,
  dateJoinedWaitingList,
  rank,
}) => {
  return dispatch({
    type: SET_EDITING_ROW,
    scoutManualId,
    name,
    points,
    targetSection,
    dateJoinedWaitingList,
    rank,
  });
};
