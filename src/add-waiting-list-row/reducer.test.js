import moment from 'moment';
import reducer from './reducer';
import * as actions from './action-creators';

describe('Adding row reducer', () => {
  const fakeDispatch = state => action => reducer(state, action);

  test('that it sets the name of the addingRow correctly', () => {
    const result = actions.setEditingRowNameActionCreator(
      fakeDispatch({ name: `I'm Joker` })
    )(`I'm Batman`);

    expect(result.name).toBe(`I'm Batman`);
  });

  test('that it sets the target section correctly', () => {
    const result = actions.setEditingRowTargetSectionActionCreator(
      fakeDispatch({ targetSection: `I'm Joker` })
    )(`I'm Batman`);

    expect(result.targetSection).toBe(`I'm Batman`);
  });

  test('that it sets the points correctly', () => {
    const result = actions.setEditingRowPointsActionCreator(
      fakeDispatch({ points: 0 })
    )(100);

    expect(result.points).toBe(100);
  });

  test('that it sets the date joined waiting list correctly', () => {
    const result = actions.setEditingRowDateJoinedWaitingListActionCreator(
      fakeDispatch({
        dateJoinedWaitingList: moment().format('DD/MM/YYYY'),
      })
    )('01/01/1970');

    expect(result.dateJoinedWaitingList).toBe('01/01/1970');
  });
});
