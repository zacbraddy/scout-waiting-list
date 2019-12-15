import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ScoutRow from '../common/scout-row';
import useWaitingListStyles from '../common/use-waiting-list-styles';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

export default function WaitingList() {
  const classes = useWaitingListStyles();
  useFirestoreConnect([{ collection: 'scouts' }]);

  const scouts = useSelector(state => state.firestore.ordered.scouts);

  console.log({ isLoaded: isLoaded(scouts), isEmpty: isEmpty(scouts) });
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
              <TableCell>Points</TableCell>
              <TableCell align="right">Start Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scouts.map((row, index) => (
              <ScoutRow>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell align="right">
                  {moment
                    .unix(row['date-joined-waiting-list'].seconds)
                    .format('DD/MM/YYYY')}
                </TableCell>
              </ScoutRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
