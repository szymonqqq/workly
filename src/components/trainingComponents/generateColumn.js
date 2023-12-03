import React, { useEffect, useState } from 'react';
import GenerateRow from './generateRow';
import '../style/addTraining.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const GenerateColumn = ({
  setData,
  setTitle,
  title,
  prevData,
  method,
  generatePrevData,
  setMethod,
  addData,
  editData,
  data,
  setMessage,
}) => {
  const [names, setNames] = useState(new Array(7).fill(' '));
  const [text, setText] = useState(
    new Array(7).fill([]).map(() => new Array(1).fill([' ']))
  );
  useEffect(() => {
    const newText = [...text];
    const newNames = [...names];

    data.forEach((e, i) => {
      newText[i] = e.data;
      newNames[i] = e.name;
    });

    setText(newText);
    setNames(newNames);
  }, [data]);

  const columns = [];

  const deleteTraining = async () => {
    console.log(prevData);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}del_training/${prevData._id}`
      );

      generatePrevData();
      setMessage('Pomyślnie usunięto plan treningowy!');
    } catch (error) {
      setMessage('Wystąpił błąd z usuwaniem danych');
    }
  };

  for (let i = 0; i < 7; i++) {
    columns.push(
      <div className="plan" key={i}>
        <div className="name">
          <p>{data[i].day}</p>
          <input
            type="text"
            value={names[i]}
            onChange={(e) => {
              const updatedNames = [...names];
              updatedNames[i] = e.target.value;
              setNames(updatedNames);
            }}
          />
        </div>

        <GenerateRow
          key={i}
          index={i}
          text={text[i]}
          packText={text}
          setText={setText}
          method={method}
        />
      </div>
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Nazwa planu"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        className="title"
      />
      <button
        onClick={() => {
          setMethod('add');
          setData(
            data.map((data, i) => ({
              day: data.day,
              name: [''],
              data: [''],
            }))
          );
          setTitle('');
        }}
        className="functional_button"
      >
        +
      </button>
      <button onClick={deleteTraining} className="functional_button">
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        onClick={() => {
          data.forEach((e, i) => {
            data[i] = {
              day: e.day,
              name: names[i],
              data: text[i],
            };
          });
          method === 'edit' ? editData() : addData();
        }}
        className="functional_button"
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      {columns}
    </>
  );
};

export default GenerateColumn;
