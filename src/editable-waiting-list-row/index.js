import React from 'react';
import EditRow from './edit-row';
import ViewRow from './view-row';

export default props => (
  <>
    {props.row.id === props.isEditing ? (
      <EditRow {...props} />
    ) : (
      <ViewRow {...props} />
    )}
  </>
);
