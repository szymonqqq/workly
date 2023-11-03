import './App.css';
import React, { useState } from 'react';
import Login from './components/login';
import TaskPanel from './components/taskPanel';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTask from './components/addTask';
import ShowTask from './components/showTask';
import Register from './components/register';
import CheckToken from './components/checkToken';
import AboutApp from './components/aboutApp';
import MainPanel from './components/MainPanel';
import AddTraining from './components/AddTraining';
import Note from './components/ShowNote';
import ShowNote from './components/ShowNote';
import AddFlashCards from './components/AddFlashcards';
import ShowFlashCards from './components/ShowFlashcards';
function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <CheckToken setToken={setToken} />
      <div className="App">
        <nav>
          <h1>workly</h1>
          <ul>
            <li>
              {' '}
              <Link to={token ? '/main_panel/' : 'login'}>Panel</Link>
            </li>
            <li>
              {' '}
              <Link to="/about_app">o aplikacji</Link>
            </li>
            {token ? (
              <li onClick={() => setToken(false)}>
                {' '}
                <Link to="/login"> wyloguj </Link>
              </li>
            ) : (
              <li>
                {' '}
                <Link to="/login">zaloguj</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/task" element={<TaskPanel />} />
          <Route path="/about_app" element={<AboutApp />} />
          <Route path="/login" element={<Login token={setToken} />} />
          <Route path="/add_task" element={<AddTask />} />
          <Route path="/show_task" element={<ShowTask />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main_panel" element={<MainPanel />} />
          <Route path="/add_flashcards" element={<AddFlashCards />} />
          <Route path="/show_flashcards" element={<ShowFlashCards />} />
          <Route
            path="/task_panel/training"
            element={<TaskPanel activity={['training', 'trening']} />}
          />
          <Route
            path="/task_panel/task"
            element={<TaskPanel activity={['task', 'zadanie', 'zadania']} />}
          />
          <Route
            path="/task_panel/note"
            element={<TaskPanel activity={['note', 'notatkę', 'notatki']} />}
          />
          <Route
            path="/task_panel/flashcards"
            element={
              <TaskPanel activity={['flashcards', 'fiszki', 'fiszka']} />
            }
          />
          <Route path="/add_training" element={<AddTraining />} />
          <Route path="/show_note" element={<ShowNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
