import React, { useState } from 'react';
import '../style/editTask.css';
import axios from 'axios';
const EditTask = ({ data, changeEdit, turnEdit }) => {
  const { taskName, startDate, endDate, priority, description, _id } = data;
  const [editTaskName, setTaskName] = useState(taskName);
  const [editStartDate, setStartDate] = useState(startDate);
  const [editEndDate, setEndDate] = useState(endDate);
  const [editPriority, setPriority] = useState(priority);
  const [editDescription, setDescription] = useState(description);
  const [message, setMessage] = useState('');

  const editValue = () => {
    console.log(_id);
    const updatedData = {
      taskName: editTaskName,
      startDate: editStartDate,
      endDate: editEndDate,
      priority: editPriority,
      description: editDescription,
    };

    axios.put(`${process.env.REACT_APP_API_URL}tasks/${_id}`, updatedData);
    setMessage('Zadanie zostało zaktualizowane.');

    changeEdit(!turnEdit);
  };

  return (
    <div key={data._id} className="edit_box">
      <input
        type="text"
        value={editTaskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <div className="datebox">
        <input
          type="date"
          value={editStartDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span>do</span>
        <input
          type="date"
          value={editEndDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <label htmlFor="priority">
        <input
          type="checkbox"
          id="priority"
          checked={editPriority}
          onChange={(e) => setPriority(e.target.checked)}
        />
        ważne
      </label>
      <textarea
        placeholder="dodaj komentarz do zadania (pole nieobowiązkowe)"
        value={editDescription}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={250}
      ></textarea>
      <div>
        <button onClick={editValue} className="functional_button">
          Edytuj wartość
        </button>
        <button
          onClick={() => changeEdit(!turnEdit)}
          className="functional_button"
        >
          anuluj
        </button>
      </div>
    </div>
  );
};
export default EditTask;
