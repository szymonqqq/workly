import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const RenderLabelFlashCards = ({
  datas,
  setData,
  getFlashCards,
  setMessage,
}) => {
  const deleteFlashCard = async (data) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}del_flashCard/${data}`
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
        <div>
          <button
            onClick={() => deleteFlashCard(data._id)}
            className="delete_note"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <Link to="../add_flashcards">
            <button onClick={() => {}} className="edit_note">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  ));
  return <>{datas.length ? elements : <h1>Brak dostępnych zestawów</h1>}</>;
};
export default RenderLabelFlashCards;
