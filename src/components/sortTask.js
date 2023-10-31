import React, { useState } from 'react';
import './style/sortTask.css';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const SortTask = ({ tasks, setTasks }) => {
  const [option, setOption] = useState('');
  const sortTask = (e, sort) => {
    const value = e ? e.target.value : option;
    sort = sort ? sort : 'asc';
    const sortedTasks = [...tasks];
    console.log(sort);
    if (value === 'taskName') {
      sortedTasks.sort((a, b) => {
        const nameA = a.taskName.toLowerCase();
        const nameB = b.taskName.toLowerCase();

        if (sort === 'asc') {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else if (sort === 'desc') {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }

        return 0;
      });
    } else if (value === 'date') {
      sortedTasks.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        if (sort === 'asc') return dateA - dateB;
        else if (sort === 'desc') return dateB - dateA;
      });
    } else if (value === 'priority') {
      sortedTasks.sort((a, b) => {
        if (sort === 'asc') return b.priority - a.priority;
        else if (sort === 'desc') return a.priority - b.priority;
      });
    }
    setTasks(sortedTasks);
  };

  return (
    <div className="sort_box">
      <div className="dark">
        <select onChange={sortTask} onClick={(e) => setOption(e.target.value)}>
          <option value="date">Według daty</option>
          <option value="taskName">Według nazwy</option>
          <option value="priority">Według piorytetu</option>
        </select>
        <button
          onClick={() => {
            sortTask(null, 'asc');
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} fontSize="30px" />
        </button>
        <button
          onClick={() => {
            sortTask(null, 'desc');
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={180} fontSize="30px" />
        </button>
      </div>
    </div>
  );
};
export default SortTask;
