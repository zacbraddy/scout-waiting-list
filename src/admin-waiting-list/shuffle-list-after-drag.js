import { assoc, compose, dissoc, map } from 'ramda';

export default async (firestoreSet, data, source, destination, draggableId) => {
  return Promise.all(
    map(scout => {
      let shuffleDirection = destination < source ? 1 : -1;

      const shiftScoutRank = newRank =>
        compose(
          assoc('rank', newRank),
          dissoc('id')
        );
      if (
        scout.id !== draggableId &&
        shuffleDirection < 0 &&
        scout.rank >= destination
      )
        return firestoreSet(
          { collection: 'scouts', doc: scout.id },
          shiftScoutRank(scout.rank + shuffleDirection)(scout)
        );

      if (
        scout.id !== draggableId &&
        shuffleDirection > 0 &&
        scout.rank <= destination
      )
        return firestoreSet(
          { collection: 'scouts', doc: scout.id },
          shiftScoutRank(scout.rank + shuffleDirection)(scout)
        );

      if (scout.id === draggableId)
        return firestoreSet(
          { collection: 'scouts', doc: draggableId },
          shiftScoutRank(destination)(scout)
        );
    }, data)
  );
};
