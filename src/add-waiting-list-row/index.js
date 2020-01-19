import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { assoc, compose, dissoc, prop } from 'ramda';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import * as actions from './action-creators';
import * as adminWaitingListActions from '../admin-waiting-list/action-creators';
import useAdminWaitingListStyles from '../common/use-waiting-list-styles';

export default () => {
  const classes = useAdminWaitingListStyles();
  const theme = useTheme();
  const addingRow = useSelector(state => state.addingRow);
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const setRowToFirestore = async () => {
    const ar = assoc(
      'dateJoinedWaitingList',
      firestore.Timestamp.fromDate(
        moment(addingRow.dateJoinedWaitingList, theme.dateFormat).toDate()
      ),
      addingRow
    );

    const newScout = await firestore.add(
      { collection: 'scouts' },
      dissoc('name', ar)
    );

    return firestore.add(
      { collection: 'scouts-sensitive' },
      compose(
        assoc('name', prop('name', ar)),
        assoc('scoutId', prop('id', newScout))
      )({})
    );
  };

  return (
    <>
      <TableRow>
        <TableCell
          width={`${theme.waitingList.controlColumnWidth}`}
          height={`${theme.waitingList.controlColumnHeight}`}
        ></TableCell>
        <TableCell />
        <TableCell>
          <TextField
            id="newName"
            label="name"
            className={classes.textField}
            value={addingRow.name}
            onChange={ev =>
              actions.setAddingRowNameActionCreator(dispatch)(ev.target.value)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            id="newTargetSection"
            label="targetSection"
            className={classes.textField}
            value={addingRow.targetSection}
            onChange={ev =>
              actions.setAddingRowTargetSectionActionCreator(dispatch)(
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
            value={addingRow.points}
            onChange={ev =>
              actions.setAddingRowPointsActionCreator(dispatch)(ev.target.value)
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
              inputValue={addingRow.dateJoinedWaitingList}
              onChange={date =>
                actions.setAddingRowDateJoinedWaitingListActionCreator(
                  dispatch
                )(date.format(theme.dateFormat))
              }
              autoOk
            />
          </MuiPickersUtilsProvider>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell width="25" />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell align="right">
          <Button
            color="primary"
            variant="contained"
            aria-label="save"
            style={{ margin: theme.spacing(0, 1) }}
            onClick={() => setRowToFirestore()}
          >
            <i
              style={{ marginRight: theme.spacing(1) }}
              className="fa fa-save"
            />
            Save
          </Button>
          <Button
            color="primary"
            size="small"
            className={classes.margin}
            onClick={() =>
              adminWaitingListActions.setIsAddingActionCreator(dispatch)(false)
            }
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
