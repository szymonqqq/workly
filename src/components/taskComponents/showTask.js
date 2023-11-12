import React, { useState, useEffect } from 'react';
import Task from './task.js';
import '../style/showTask.css';
import SortTask from './sortTask.js';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const ShowTask = () => {
  const [tasks, setTasks] = useState([]);
  const [cookies] = useCookies(['user_id']);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const id = cookies.user_id;

    try {
      const response = await axios.get(
        `http://localhost:3001/tasks?user_id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const jsonData = response.data;
      setTasks(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  const task = tasks.map((task) => (
    <Task data={task} fetchTasks={fetchTasks} key={task._id} />
  ));
  return (
    <div className="theme">
      <SortTask tasks={tasks} setTasks={setTasks} />
      <div className="show_task_box">
        {tasks.length === 0 && <h1>Nie masz zadań </h1>}
        {tasks && <div key={task._id}>{task}</div>};
      </div>
    </div>
  );
};

export default ShowTask;
