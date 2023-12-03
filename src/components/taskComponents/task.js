import React, { useState } from 'react';
import EditTask from './editTask';
import '../style/task.css';
import {
  faInfo,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReturnInfo from '../returnInfo';

import axios from 'axios';
const Task = ({ data, fetchTasks }) => {
  const { taskName, startDate, endDate, priority, description, _id } = data;
  const [turnEdit, changeEdit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [valueY, setValueY] = useState('');
  const [message, setMessage] = useState(false);

  const deleteTask = async (e) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}del_task/${_id}`);
    } catch (error) {
      console.error('Błąd podczas usuwania zadania:', error);
    }

    fetchTasks();
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    setValueY(e.clientY + window.scrollY - 200);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div key={data._id}>
        {message && <ReturnInfo info={message} setMessage={setMessage} />}

        {isHovered && (
          <div className="info_about_element" style={{ top: valueY }}>
            <div className="dark">
              <h1>Szczegółowe informacje</h1>
              <p>Data rozpoczęcia: {startDate}</p>
              <p>Data zakończenia: {endDate}</p>
              <p>opis: {description}</p>
            </div>
          </div>
        )}
        <div
          className="task_value"
          style={message ? { display: 'none' } : null}
        >
          <div className="dark">
            {turnEdit ? (
              <EditTask
                data={data}
                turnEdit={turnEdit}
                changeEdit={changeEdit}
                fetchTasks={fetchTasks}
                setMessage={setMessage}
                message={message}
              />
            ) : (
              <>
                <p style={priority ? { color: 'red' } : null}>{taskName}</p>
                {priority && <div className="important"></div>}
                <div className="data">
                  <button onClick={(e) => deleteTask(e)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={() => {
                      fetchTasks();
                      changeEdit(!turnEdit);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faInfo} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Task;
