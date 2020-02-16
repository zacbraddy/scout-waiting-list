import moment from 'moment';
import { dateFormat } from '../theme.js';

import {
  SET_EDITING_ROW,
  SET_EDITING_ROW_ACTION_NAME,
  SET_EDITING_ROW_ACTION_TARGET_SECTION,
  SET_EDITING_ROW_ACTION_POINTS,
  SET_EDITING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
  SET_EDITING_ROW_ACTION_SCOUT_MANUAL_ID,
} from './action-names';

const setEditingRowScoutManualIdAction = (state, { newValue }) => {
  return {
    ...state,
    scoutManualId: newValue,
  };
};

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

const setEditingRow = (
  state,
  { scoutManualId, name, points, targetSection, dateJoinedWaitingList, rank }
) => {
  return {
    scoutManualId,
    name,
    points,
    targetSection,
    dateJoinedWaitingList,
    rank,
  };
};

export default function reducer(
  state = {
    scoutManualId: '',
    name: '',
    targetSection: '',
    points: 0,
    dateJoinedWaitingList: moment().format(dateFormat),
    rank: -1,
  },
  action
) {
  switch (action.type) {
    case SET_EDITING_ROW:
      return setEditingRow(state, action);
    case SET_EDITING_ROW_ACTION_SCOUT_MANUAL_ID:
      return setEditingRowScoutManualIdAction(state, action);
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
