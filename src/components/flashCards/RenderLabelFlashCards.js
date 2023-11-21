import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RenderLabelFlashCards = ({
  datas,
  setData,
  getFlashCards,
  setMessage,
}) => {
  const deleteFlashCard = async (data) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/del_flashCard/${data}`
      );
      setMessage('Pomyślnie usunięto zestaw!');
      getFlashCards();
    } catch (error) {
      console.log(data);
    }
  };
  const elements = datas.map((data, index) => (
    <div key={index} className="task_value card_data_box ">
      <div className="dark">
        <h1 onClick={() => setData(datas[index])}>{data.title}</h1>
        <button
          onClick={() => deleteFlashCard(data._id)}
          className="delete_note"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  ));
  return <>{elements}</>;
};
export default RenderLabelFlashCards;
