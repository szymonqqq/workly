import React from 'react';

const ShowAllWords = ({ data }) => {
  const words = data.map((e) => (
    <tr>
      <td>{e[0]}</td>
      <td>{e[1]}</td>
    </tr>
  ));
  return (
    <table>
      <tr>
        <th>Pojęcie</th>
        <th>Definicja</th>
      </tr>
      {words}
    </table>
  );
};
export default ShowAllWords;
