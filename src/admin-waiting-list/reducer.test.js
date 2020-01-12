import reducer from './reducer';
import * as actions from './action-creators';

describe('Admin waiting list reducer', () => {
  const fakeDispatch = state => action => reducer(state, action);

  test('that it sets isEditing correctly', () => {
    const result = actions.setIsEditingActionCreator(
      fakeDispatch({ isEditing: false })
    )(true);

    expect(result.isEditing).toBe(true);
  });

  test('that it sets isAdding correctly', () => {
    const result = actions.setIsAddingActionCreator(
      fakeDispatch({ isAdding: false })
    )(true);

    expect(result.isAdding).toBe(true);
  });
});
