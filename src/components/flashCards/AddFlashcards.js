import axios from 'axios';
import '../style/flashCards.css';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getFlashCards } from './getFlashCards';
import ConvertFlashCards from './convertFlashCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faFileImport,
  faTrash,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import ReturnInfo from '../returnInfo';
const AddFlashCards = () => {
  const [title, setTitle] = useState('');
  const [countCards, setCountCards] = useState(5);
  const [data, setData] = useState([[''], [''], [''], [''], [''], ['']]);
  const [dbData, setDbData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardElements = [];
  const [method, setMethod] = useState('add');
  const [canImport, setCanImport] = useState(false);
  const [cookies] = useCookies(['user_id']);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const newData = data;
    newData[countCards] = [[''], ['']];
    setData(newData);
  }, [countCards]);

  useEffect(() => {
    if (method === 'edit') {
      setData(dbData[selectedIndex].data);
      setCountCards(dbData[selectedIndex].data.length - 1);
      setTitle(dbData[selectedIndex].title);
    }
  }, [dbData]);
  const addCards = () => setCountCards(countCards + 1);
  for (let i = 0; i < data.length; i++) {
    cardElements.push(
      <div className="value_card_box" key={i}>
        <input
          type="text"
          onChange={(e) => {
            const newText = [...data];
            newText[i][0] = e.target.value;
            setData(newText);
          }}
          value={data[i][0] || ''}
        />

        <input
          type="text"
          onChange={(e) => {
            const newText = [...data];
            newText[i][1] = e.target.value;
            setData(newText);
          }}
          value={data[i][1] || ''}
        />
      </div>
    );
  }
  const addFleshCards = async () => {
    try {
      const user_id = cookies.user_id;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}add_flashCards`,
        {
          title,
          data,
          user_id,
        }
      );
      setMessage('Pomyślnie dodano zestaw!');
    } catch {
      console.log('bład w dodawaniu');
    }
  };
  const editFleshCards = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}edit_flashCards`,
        {
          id: dbData[selectedIndex]._id,
          title,
          data,
        }
      );
      setMessage('Pomyślnie zedytowano zestaw!');
    } catch {
      console.log('bład w dodawaniu');
    }
  };

  return (
    <div className="theme">
      {message && <ReturnInfo info={message} setMessage={setMessage} />}
      <div className="flash_cards">
        <div className="operation_box">
          {method === 'edit' ? (
            <select
              onClick={() => {
                getFlashCards(cookies.user_id, setDbData);
                setMethod('edit');
              }}
              onChange={(e) => {
                setSelectedIndex(e.target.selectedIndex);
              }}
            >
              {dbData.map((e, index) => (
                <option key={index}>{e.title}</option>
              ))}
            </select>
          ) : (
            <button
              onClick={() => setMethod('edit')}
              className="functional_button edit_btn"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}

          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="title"
          />
          <button
            className="functional_button"
            onClick={() => {
              setData([[''], [''], [''], [''], [''], ['']]);
              setCountCards(5);
              setTitle('');
              setDbData([]);
              setMethod('add');
              console.log(process.env.REACT_APP_API_URL);
            }}
          >
            +
          </button>
          <button
            onClick={() => setCanImport(true)}
            className="functional_button"
          >
            <FontAwesomeIcon icon={faFileImport} />
          </button>
          <button className="functional_button">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {cardElements}
        <div className="save_add_box ">
          <button onClick={addCards} className="add_element functional_button">
            +
          </button>
          <button
            onClick={method === 'add' ? addFleshCards : editFleshCards}
            className="save_flash_card functional_button"
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
        {canImport && (
          <ConvertFlashCards
            setData={setData}
            setCountCards={setCountCards}
            setCanImport={setCanImport}
          />
        )}
      </div>
    </div>
  );
};
export default AddFlashCards;
