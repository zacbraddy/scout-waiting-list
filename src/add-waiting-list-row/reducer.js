import moment from 'moment';

import {
  SET_EDITING_ROW_ACTION_NAME,
  SET_EDITING_ROW_ACTION_TARGET_SECTION,
  SET_EDITING_ROW_ACTION_POINTS,
  SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
} from './action-names';

const setEditingRowNameAction = (state, { newValue }) => {
  return {
    ...state,
    name: newValue,
  };
};

const setEditingRowTargetSectionAction = (state, { newValue }) => {
  return {
    ...state,
    targetSection: newValue,
  };
};

const setEditingRowPointsAction = (state, { newValue }) => {
  return {
    ...state,
    points: newValue,
  };
};

const setEditingRowDateJoinedWaitingListAction = (state, { newValue }) => {
  return {
    ...state,
    dateJoinedWaitingList: newValue,
  };
};

export default function reducer(
  state = {
    name: '',
    targetSection: '',
    points: 0,
    dateJoinedWaitingList: moment().format('DD/MM/YYYY'),
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
    default:
      return state;
  }
}
