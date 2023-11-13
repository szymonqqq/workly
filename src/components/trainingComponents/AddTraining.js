import React, { useState, useEffect } from 'react';
import GenerateColumn from './generateColumn';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ReturnInfo from '../returnInfo';
const AddTraining = () => {
  const [optionValue, setOptionValue] = useState('', 0);
  const [previousData, setPreviousData] = useState([]);
  const [day] = useState([
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
  ]);
  const [data, setData] = useState(
    day.map((day, i) => ({
      day: day,
      name: [''],
      data: [''],
    }))
  );
  const [title, setTitle] = useState('');
  const [cookies] = useCookies(['user_id']);
  const [method, setMethod] = useState('add');
  const [message, setMessage] = useState('');
  const generatePrevData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/trainings?user_id=${cookies.user_id}`
      );
      if (!response.ok) {
        setMessage('Wystąpił błąd z połączeniem!');
      }
      const idata = await response.json();
      if (data !== idata) {
        setPreviousData(idata);
        setData(idata[optionValue[1]].data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generatePrevData();
  }, [optionValue[1]]);

  const addData = async () => {
    try {
      const response = await axios.post('http://localhost:3001/add_training', {
        title: title,
        data: data,
        user_id: cookies.user_id,
      });
      setMessage('Pomyślnie dodano plan treningowy!');
    } catch (error) {
      setMessage('Błąd dodawania danych!');
    }
  };

  const editData = async () => {
    const id = previousData[optionValue[1]]._id;

    try {
      const response = await axios.put('http://localhost:3001/edit_training', {
        id: id,
        data: data,
        title: title,
      });
    } catch (error) {
      setMessage('Błąd aktualizacji danych!');
    }
  };
  return (
    <div className="theme">
      <div className="training_box">
        <h1>Plan Treningowy</h1>
        {message && <ReturnInfo info={message} setMessage={setMessage} />}
        {method === 'add' ? (
          <button
            className="turn_edit functional_button"
            onClick={() => setMethod('edit')}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        ) : (
          <select
            onChange={(e) => {
              const selectedIndex = e.target.selectedIndex;
              setOptionValue([e.target.value, e.target.selectedIndex]);
              setTitle(
                selectedIndex >= 0 ? previousData[selectedIndex].title : ''
              );
              setMethod('edit');
            }}
            onClick={() => generatePrevData()}
          >
            {previousData.map((data, index) => (
              <option key={index}>{data.title}</option>
            ))}
            {method === 'add' && <option>d</option>}
          </select>
        )}

        <GenerateColumn
          setData={setData}
          setTitle={setTitle}
          title={title}
          prevData={previousData[optionValue[1]]}
          method={method}
          generatePrevData={generatePrevData}
          setMethod={setMethod}
          editData={editData}
          addData={addData}
          data={data}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};
export default AddTraining;
