import React from 'react';

function Row(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.type}</td>
      <td>{props.value}</td>
    </tr>
  );
}

export default Row;
