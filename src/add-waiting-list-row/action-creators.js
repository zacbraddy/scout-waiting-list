import {
  SET_ADDING_ROW_ACTION_NAME,
  SET_ADDING_ROW_ACTION_TARGET_SECTION,
  SET_ADDING_ROW_ACTION_POINTS,
  SET_ADDING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
} from './action-names';

export const setAddingRowNameActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_ADDING_ROW_ACTION_NAME,
    newValue,
  });
};

export const setAddingRowTargetSectionActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_ADDING_ROW_ACTION_TARGET_SECTION,
    newValue,
  });
};

export const setAddingRowPointsActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_ADDING_ROW_ACTION_POINTS,
    newValue,
  });
};

export const setAddingRowDateJoinedWaitingListActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_ADDING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
    newValue,
  });
};
