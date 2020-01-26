import logic from './shuffle-list-after-drag';

describe('Shuffle after drag', () => {
  test('that when there are two rows they get switched when a row is moved up', async () => {
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

  test('that when there are two rows they get switched when a row is moved down', async () => {
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

    await logic(firestoreSet, testData, 0, 1, 1);

    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 1 },
      { name: `I'm Batman`, rank: 1 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 0 }
    );
  });

  test('that when there are three rows top row can move to middle row correctly', async () => {
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
      {
        id: 3,
        name: `I'm Batgirl`,
        rank: 2,
      },
    ];

    await logic(firestoreSet, testData, 0, 1, 1);

    expect(firestoreSet).toHaveBeenCalledTimes(2);
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 1 },
      { name: `I'm Batman`, rank: 1 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 0 }
    );
  });

  test('that when there are three rows middle row can move to bottom row correctly', async () => {
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
      {
        id: 3,
        name: `I'm Batgirl`,
        rank: 2,
      },
    ];

    await logic(firestoreSet, testData, 1, 2, 2);

    expect(firestoreSet).toHaveBeenCalledTimes(2);
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 2 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 3 },
      { name: `I'm Batgirl`, rank: 1 }
    );
  });

  test('that when there are three rows bottom row can move to middle row correctly', async () => {
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
      {
        id: 3,
        name: `I'm Batgirl`,
        rank: 2,
      },
    ];

    await logic(firestoreSet, testData, 2, 1, 3);

    expect(firestoreSet).toHaveBeenCalledTimes(2);
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 2 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 3 },
      { name: `I'm Batgirl`, rank: 1 }
    );
  });

  test('that when there are three rows middle row can move to top row correctly', async () => {
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
      {
        id: 3,
        name: `I'm Batgirl`,
        rank: 2,
      },
    ];

    await logic(firestoreSet, testData, 1, 0, 2);

    expect(firestoreSet).toHaveBeenCalledTimes(2);
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 0 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 1 },
      { name: `I'm Batman`, rank: 1 }
    );
  });

  test('that when there are three rows second bottom row can move to top row correctly', async () => {
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
      {
        id: 3,
        name: `I'm Batgirl`,
        rank: 2,
      },
      {
        id: 4,
        name: `I'm Superman`,
        rank: 3,
      },
    ];

    await logic(firestoreSet, testData, 2, 0, 3);

    expect(firestoreSet).toHaveBeenCalledTimes(3);
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 1 },
      { name: `I'm Batman`, rank: 1 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 2 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 3 },
      { name: `I'm Batgirl`, rank: 0 }
    );
  });

  test('that when there are three rows second top row can move to bottom row correctly', async () => {
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
      {
        id: 3,
        name: `I'm Batgirl`,
        rank: 2,
      },
      {
        id: 4,
        name: `I'm Superman`,
        rank: 3,
      },
    ];

    await logic(firestoreSet, testData, 1, 3, 2);

    expect(firestoreSet).toHaveBeenCalledTimes(3);
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 2 },
      { name: `I'm Robin`, rank: 3 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 3 },
      { name: `I'm Batgirl`, rank: 1 }
    );
    expect(firestoreSet).toHaveBeenCalledWith(
      { collection: 'scouts', doc: 4 },
      { name: `I'm Superman`, rank: 2 }
    );
  });
});
