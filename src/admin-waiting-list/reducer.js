import { SET_IS_ADDING, SWITCH_ROWS, SET_IS_EDITING } from './action-names';

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
    isAdding: !newValue ? false : state.isAdding,
  };
};

const setIsAddingAction = (state, { newValue }) => {
  return {
    ...state,
    isAdding: newValue,
  };
};

export default function reducer(
  state = {
    isEditing: false,
    isAdding: false,
  },
  action
) {
  switch (action.type) {
    case SET_IS_EDITING:
      return setIsEditingAction(state, action);
    case SET_IS_ADDING:
      return setIsAddingAction(state, action);
    case SWITCH_ROWS:
      return switchRowsAction(state, action);
    default:
      return state;
  }
}
