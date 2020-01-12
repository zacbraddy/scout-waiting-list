import { SWITCH_ROWS, SET_IS_EDITING, SET_IS_ADDING } from './action-names';

export const switchRowsActionCreator = dispatch => ({
  source,
  destination,
}) => {
  if (!destination || source.index === destination.index) return;

  return dispatch({
    type: SWITCH_ROWS,
    sourceIndex: source.index,
    destinationIndex: destination.index,
  });
};

export const setIsEditingActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_IS_EDITING,
    newValue,
  });
};

export const setIsAddingActionCreator = dispatch => newValue => {
  return dispatch({
    type: SET_IS_ADDING,
    newValue,
  });
};
