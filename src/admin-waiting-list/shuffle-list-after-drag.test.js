import logic from './shuffle-list-after-drag';

describe('Shuffle after drag', () => {
  test('that when there are two rows they get switched', async () => {
    const firestoreSet = jest.fn();

    const testData = [
      {
        id: 1,
        name: `I'm Batman`,
        rank: 0,
      },
      {
        id: 2,
        name: `I'm Robin`,
        rank: 1,
      },
    ];

    await logic(firestoreSet, testData, 1, 0, 2);

    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 1 },
      { name: `I'm Batman`, rank: 1 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 0 }
    );
  });
});
