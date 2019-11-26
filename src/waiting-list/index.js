import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ScoutRow from '../common/scout-row';
import useWaitingListStyles from '../common/use-waiting-list-styles';

const state = [
  { id: '5eafc', points: 50, startDate: '23/02/2019' },
  { id: '6hsdaf', points: 237, startDate: '13/02/2020' },
  { id: '834', points: 262, startDate: '20/05/2019' },
  { id: 'safd32', points: 305, startDate: '02/10/2021' },
  { id: '43543safd', points: 356, startDate: '16/04/2019' },
];

export default function WaitingList() {
  const classes = useWaitingListStyles();

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
            {state.map((row, index) => (
              <ScoutRow>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
              </ScoutRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
