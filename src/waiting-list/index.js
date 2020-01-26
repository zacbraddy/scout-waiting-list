import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { assoc, compose, filter, map, prop, sortBy, toPairs } from 'ramda';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ScoutRow from '../common/scout-row';
import useWaitingListStyles from '../common/use-waiting-list-styles';

export default function WaitingList() {
  const classes = useWaitingListStyles();
  const theme = useTheme();
  useFirestoreConnect([{ collection: 'scouts', orderBy: ['rank'] }]);

  const scouts = useSelector(state =>
    compose(
      sortBy(prop('rank')),
      map(pair => assoc('id', pair[0], pair[1])),
      filter(pair => pair[1]),
      toPairs
    )(state.firestore.data.scouts)
  );

  if (!isLoaded(scouts) || isEmpty(scouts)) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Scout Id</TableCell>
              <TableCell>Target section</TableCell>
              <TableCell>Points</TableCell>
              <TableCell align="right">Date Joined Waiting List</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scouts.map((row, index) => (
              <ScoutRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.targetSection}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell align="right">
                  {moment
                    .unix(row.dateJoinedWaitingList.seconds)
                    .format(theme.dateFormat)}
                </TableCell>
              </ScoutRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
