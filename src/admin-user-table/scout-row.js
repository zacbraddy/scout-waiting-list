import styled from 'styled-components';
import TableRow from '@material-ui/core/TableRow';

export default styled(TableRow)`
  background-color: ${props => (props.isdragging === 'true' ? '#fff' : 'auto')};
  ${props =>
    props.isdragging === 'true'
      ? 'display: table !important; table-layout: fixed'
      : ''}
`;
