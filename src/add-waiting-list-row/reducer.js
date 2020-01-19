import moment from 'moment';
import { dateFormat } from '../theme';

import {
  SET_ADDING_ROW_ACTION_NAME,
  SET_ADDING_ROW_ACTION_TARGET_SECTION,
  SET_ADDING_ROW_ACTION_POINTS,
  SET_ADDING_ROW_ACTION_DATE_JOINED_WAITING_LIST,
} from './action-names';

const setAddingRowNameAction = (state, { newValue }) => {
  return {
    ...state,
    name: newValue,
  };
};

const setAddingRowTargetSectionAction = (state, { newValue }) => {
  return {
    ...state,
    targetSection: newValue,
  };
};

const setAddingRowPointsAction = (state, { newValue }) => {
  return {
    ...state,
    points: newValue,
  };
};

const setAddingRowDateJoinedWaitingListAction = (state, { newValue }) => {
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
    dateJoinedWaitingList: moment().format(dateFormat),
  },
  action
) {
  switch (action.type) {
    case SET_ADDING_ROW_ACTION_NAME:
      return setAddingRowNameAction(state, action);
    case SET_ADDING_ROW_ACTION_TARGET_SECTION:
      return setAddingRowTargetSectionAction(state, action);
    case SET_ADDING_ROW_ACTION_POINTS:
      return setAddingRowPointsAction(state, action);
    case SET_ADDING_ROW_ACTION_DATE_JOINED_WAITING_LIST:
      return setAddingRowDateJoinedWaitingListAction(state, action);
    default:
      return state;
  }
}
