import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import RowIcon from './row-icon';

export default () => {
  const theme = useTheme();

  return (
    <Button>
      <RowIcon>
        <i className="fa fa-pen" color={theme.palette.muted[200]} />
      </RowIcon>
    </Button>
  );
};
