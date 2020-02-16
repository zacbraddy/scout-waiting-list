import moment from 'moment';
import reducer from './reducer';
import * as actions from './action-creators';

describe('Editing row reducer', () => {
  const fakeDispatch = state => action => reducer(state, action);

  test('that it sets the scout manual id of the editingRow correctly', () => {
    const result = actions.setEditingRowScoutManualIdActionCreator(
      fakeDispatch({ scoutManualId: `I'm Joker` })
    )(`I'm Batman`);

    expect(result.scoutManualId).toBe(`I'm Batman`);
  });

  test('that it sets the name of the editingRow correctly', () => {
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

  test('that it sets the editing row correctly', () => {
    const result = actions.setEditingRow(fakeDispatch({}))({
      name: `I'm Batman`,
      points: 100,
      targetSection: `I'm Batman`,
      dateJoinedWaitingList: '01/01/1970',
    });

    expect(result).toHaveProperty('name', `I'm Batman`);
    expect(result).toHaveProperty('points', 100);
    expect(result).toHaveProperty('targetSection', `I'm Batman`);
    expect(result).toHaveProperty('dateJoinedWaitingList', '01/01/1970');
  });
});
