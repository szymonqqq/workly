import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const RenderLabelNote = ({
  datas,
  setData,
  setShowNote,
  getNote,
  setMessage,
}) => {
  const deleteNote = async (data) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}del_note/${data}`
      );
      setMessage('Notatkę pomyślnie usunięto');
      getNote();
    } catch (error) {
      console.log(data);
    }
  };

  const elements = datas.map((data, index) => (
    <div key={index} className="task_value note_data_box ">
      <div className="dark">
        <h1
          onClick={() => {
            setData(data);
            setShowNote(true);
          }}
        >
          {' '}
          {data.title}
        </h1>
        <div>
          {' '}
          <p>{data.date}</p>
          <p>{data.hour}</p>
        </div>
        <button className="delete_note" onClick={() => deleteNote(data._id)}>
          {' '}
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  ));
  return <>{elements}</>;
};

export default RenderLabelNote;
