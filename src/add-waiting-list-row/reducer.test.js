import moment from 'moment';
import reducer from './reducer';
import * as actions from './action-creators';
import { dateFormat } from '../theme';

describe('Adding row reducer', () => {
  const fakeDispatch = state => action => reducer(state, action);

  test('that it sets the name of the addingRow correctly', () => {
    const result = actions.setAddingRowNameActionCreator(
      fakeDispatch({ name: `I'm Joker` })
    )(`I'm Batman`);

    expect(result.name).toBe(`I'm Batman`);
  });

  test('that it sets the target section correctly', () => {
    const result = actions.setAddingRowTargetSectionActionCreator(
      fakeDispatch({ targetSection: `I'm Joker` })
    )(`I'm Batman`);

    expect(result.targetSection).toBe(`I'm Batman`);
  });

  test('that it sets the points correctly', () => {
    const result = actions.setAddingRowPointsActionCreator(
      fakeDispatch({ points: 0 })
    )(100);

    expect(result.points).toBe(100);
  });

  test('that it sets the date joined waiting list correctly', () => {
    const result = actions.setAddingRowDateJoinedWaitingListActionCreator(
      fakeDispatch({
        dateJoinedWaitingList: moment().format(dateFormat),
      })
    )('01/01/1970');

    expect(result.dateJoinedWaitingList).toBe('01/01/1970');
  });

  test('that it clears the adding row correctly', () => {
    const result = actions.clearAddingRow(
      fakeDispatch({
        name: `I'm Joker`,
        targetSection: `I'm Joker`,
        points: -999,
        dateJoinedWaitingList: '01/01/1970',
      })
    )();

    expect(result).toHaveProperty('name', '');
    expect(result).toHaveProperty('targetSection', '');
    expect(result).toHaveProperty('points', 0);
    expect(result).toHaveProperty(
      'dateJoinedWaitingList',
      moment().format(dateFormat)
    );
  });
});
