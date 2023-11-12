import React, { useState } from 'react';
import '../style/addTask.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ReturnInfo from '../returnInfo';

const date = new Date();
const setDate = new Date().toISOString().slice(0, 10);
let tomorrow = new Date(date);
tomorrow.setDate(date.getDate() + 1);
tomorrow = tomorrow.toISOString().slice(0, 10).toString();

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState(setDate);
  const [endDate, setEndDate] = useState(tomorrow);
  const [priority, setPriority] = useState(false);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [cookies] = useCookies(['user_id']);

  const handleAddTask = async () => {
    if (taskName === '') return setMessage('Uzupełnij dane!');
    else if (taskName.length > 20)
      return setMessage('Zbyt długa nazwa maksymalna długość to 20 znaków.');

    try {
      const response = await axios.post('http://localhost:3001/add_task', {
        taskName: taskName,
        startDate: startDate,
        endDate: endDate,
        priority: priority,
        description: description ? description : 'Brak opisu',
        user_id: cookies.user_id,
      });
    } catch (error) {
      setMessage('Nie udało się dodać zadania ');
    }
    setMessage('Zadanie dodano! ');
  };
  const resetValue = () => {
    setTaskName('');
    setStartDate(setDate);
    setEndDate(tomorrow);
    setPriority(false);
    setDescription('');
  };

  return (
    <div className="theme">
      <div className="task_box">
        {message && <ReturnInfo info={message} setMessage={setMessage} />};
        <h1>Dodaj zadanie</h1>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Nazwa..."
        />
        <div className="datebox">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <label htmlFor="priority">
          <input
            type="checkbox"
            id="priority"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
          />
          <span className="priority">piorytet</span>
        </label>
        <textarea
          placeholder="Dodaj komentarz do zadania (pole nieobowiązkowe)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="button_box">
          <button onClick={handleAddTask}>dodaj</button>
          <button onClick={resetValue}>zresetuj pola</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
