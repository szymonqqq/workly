import React, { useState } from 'react';
import './style/mainPanel.css';
import './style/taskPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPersonRunning,
  faListCheck,
  faPen,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import TaskPanel from './taskPanel';
import { Routes, Route, Link } from 'react-router-dom';
const MainPanel = () => {
  return (
    <div className="theme">
      <div className="activity">
        <div className="task">
          <Link to="/training/add_training">
            <button className="box_activity ">
              <span>
                <FontAwesomeIcon icon={faPersonRunning} />
              </span>
            </button>
          </Link>
          <Link to="/task_panel/task">
            <button className="box_activity ">
              <span>
                <FontAwesomeIcon icon={faListCheck} />
              </span>
            </button>
          </Link>
          <Link to="/show_note">
            <button className="box_activity ">
              <span>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </button>
          </Link>
          <Link to="/task_panel/flashcards">
            <button className="box_activity ">
              <span>
                <FontAwesomeIcon icon={faGraduationCap} />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MainPanel;
