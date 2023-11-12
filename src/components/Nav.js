import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskPanel from './taskPanel';
import AboutApp from './aboutApp';
import Login from './login';
import AddTask from './taskComponents/addTask';
import ShowTask from './taskComponents/showTask';
import Register from './register';
import MainPanel from './MainPanel';
import AddFlashCards from './flashCards/AddFlashcards';
import ShowFlashCards from './flashCards/ShowFlashcards';
import AddTraining from './trainingComponents/AddTraining';
import ShowNote from './notes/ShowNote';

const App = ({ token, setToken }) => {
  return (
    <>
      <Router>
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
          <Route path="add_flashcards" element={<AddFlashCards />} />
          <Route path="/show_flashcards" element={<ShowFlashCards />} />

          <Route
            path="/task_panel/task"
            element={<TaskPanel activity={['task', 'zadanie', 'zadania']} />}
          />
          <Route
            path="/task_panel/flashcards"
            element={
              <TaskPanel activity={['flashcards', 'fiszki', 'fiszka']} />
            }
          />
          <Route path="training/add_training" element={<AddTraining />} />
          <Route path="/show_note" element={<ShowNote />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
