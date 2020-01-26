import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useTheme } from '@material-ui/core/styles';
import ScoutRow from '../common/scout-row';
import SaveButton from './save-button';
import CancelButton from './cancel-button';
import * as actions from './action-creators';
import useAdminWaitingListStyles from '../common/use-waiting-list-styles';

export default ({ row }) => {
  const theme = useTheme();
  const classes = useAdminWaitingListStyles();
  const dispatch = useDispatch();
  const editingRow = useSelector(state => state.editingRow);

  return (
    <ScoutRow>
      <TableCell
        width={`${theme.waitingList.controlColumnWidth}`}
        height={`${theme.waitingList.controlColumnHeight}`}
        style={{ padding: '8px' }}
      >
        <div style={{ display: 'flex' }}>
          <SaveButton id={row.id} />
          <CancelButton />
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>
        <TextField
          id="newName"
          label="name"
          className={classes.textField}
          value={editingRow.name}
          onChange={ev =>
            actions.setEditingRowNameActionCreator(dispatch)(ev.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          id="newTargetSection"
          label="targetSection"
          className={classes.textField}
          value={editingRow.targetSection}
          onChange={ev =>
            actions.setEditingRowTargetSectionActionCreator(dispatch)(
              ev.target.value
            )
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          id="newPoints"
          label="points"
          className={classes.textField}
          type="number"
          value={editingRow.points}
          onChange={ev =>
            actions.setEditingRowPointsActionCreator(dispatch)(ev.target.value)
          }
        />
      </TableCell>
      <TableCell align="right">
        <MuiPickersUtilsProvider
          libInstance={moment}
          locale={'en-GB'}
          utils={MomentUtils}
        >
          <KeyboardDatePicker
            variant="inline"
            id="newPoints"
            label="Start Date"
            format={`${theme.dateFormat}`}
            className={classes.textField}
            inputValue={editingRow.dateJoinedWaitingList}
            onChange={date =>
              actions.setEditingRowDateJoinedWaitingListActionCreator(dispatch)(
                date.format(theme.dateFormat)
              )
            }
            autoOk
          />
        </MuiPickersUtilsProvider>
      </TableCell>
    </ScoutRow>
  );
};
