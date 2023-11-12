import React from 'react';
import './style/taskPanel.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const TaskPanel = ({ activity }) => {
  return (
    <>
      <div className="task">
        <Link to={`/add_${activity[0]}`}>
          <div className="box">
            <span> Dodaj {activity[1]} </span>
            <span>+</span>
          </div>
        </Link>

        <Link to={`/show_${activity[0]}`}>
          <div className="box">
            <span>Pokaż {activity[2] ? activity[2] : activity[1]}</span>
            <span>
              <FontAwesomeIcon icon={faEye} />
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default TaskPanel;
