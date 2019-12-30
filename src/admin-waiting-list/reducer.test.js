import moment from 'moment';
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

  test('that it sets the name of the addingRow correctly', () => {
    const result = actions.setEditingRowNameActionCreator(
      fakeDispatch({ addingRow: { name: `I'm Joker` } })
    )(`I'm Batman`);

    expect(result.addingRow.name).toBe(`I'm Batman`);
  });

  test('that it sets the target section correctly', () => {
    const result = actions.setEditingRowTargetSectionActionCreator(
      fakeDispatch({ addingRow: { targetSection: `I'm Joker` } })
    )(`I'm Batman`);

    expect(result.addingRow.targetSection).toBe(`I'm Batman`);
  });

  test('that it sets the points correctly', () => {
    const result = actions.setEditingRowPointsActionCreator(
      fakeDispatch({ addingRow: { points: 0 } })
    )(100);

    expect(result.addingRow.points).toBe(100);
  });

  test('that it sets the date joined waiting list correctly', () => {
    const result = actions.setEditingRowDateJoinedWaitingListActionCreator(
      fakeDispatch({
        addingRow: { dateJoinedWaitingList: moment().format('DD/MM/YYYY') },
      })
    )('01/01/1970');

    expect(result.addingRow.dateJoinedWaitingList).toBe('01/01/1970');
  });
});
