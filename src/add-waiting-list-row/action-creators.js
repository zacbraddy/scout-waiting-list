import {
  SET_EDITING_ROW_ACTION_NAME,
  SET_EDITING_ROW_ACTION_TARGET_SECTION,
  SET_EDITING_ROW_ACTION_POINTS,
  SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
} from './action-names';

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
