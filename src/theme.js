import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

export const dateFormat = 'DD/MM/YYYY';

export default createMuiTheme({
  palette: {
    primary: {
      ...purple,
      main: purple[800],
    },
    secondary: teal,
    error: red,
    muted: {
      '200': purple[200],
    },
    success: {
      '500': green[500],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  waitingList: {
    controlColumnWidth: 144,
    controlColumnHeight: 53.5,
  },
  dateFormat,
});
