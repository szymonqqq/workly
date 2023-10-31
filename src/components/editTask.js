import React, { useState } from 'react';
import './style/editTask.css';
import axios from 'axios';
import ReturnInfo from './returnInfo';
const EditTask = ({ data, changeEdit, turnEdit, fetchTasks }) => {
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

    axios.put(`http://localhost:3001/tasks/${_id}`, updatedData);
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
        priorytet
      </label>
      <textarea
        placeholder="dodaj komentarz do zadania (pole nieobowiązkowe)"
        value={editDescription}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={editValue}>Edytuj wartość</button>
    </div>
  );
};
export default EditTask;
