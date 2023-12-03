import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { faArrowRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Note = ({ setShowNote, data, setData, getNote, setMessage }) => {
  const [title, setTitle] = useState((data && data.title) || '');
  const [text, setText] = useState((data && data.text) || '');
  const [cookies] = useCookies(['user_id']);
  const [date, setDate] = useState(new Date());
  const getData = () => ({
    title: title ? title : 'Bez tytułu',
    text: text ? text : ' ',
    date: date.toISOString().slice(0, 10),
    hour: `${date.getHours()}:${date.getMinutes()}`,
  });

  const saveData = async () => {
    const { title, text, date, hour } = getData();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}add_note`,
        {
          title,
          text,
          date,
          hour,
          user_id: cookies.user_id,
        }
      );
      setMessage('Notatkę pomyślnie dodano!');
    } catch (error) {
      console.log(error);
    }
  };
  const editData = async () => {
    const { title, text, date, hour } = getData();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}edit_note`,
        {
          id: data._id,
          title,
          text,
          date,
          hour,
        }
      );
      setMessage('Notatkę pomyślnie edytowano!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="note_box">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />{' '}
        <button
          onClick={() => {
            setShowNote(false);
            setData('');
            getNote();
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} rotation={180} />
        </button>
        <button
          onClick={() => {
            setDate(new Date());
            getNote();
            data ? editData() : saveData();
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
};
export default Note;
