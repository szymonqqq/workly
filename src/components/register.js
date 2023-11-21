import React, { useState } from 'react';
import axios from 'axios';
import ReturnInfo from './returnInfo';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const handleRegister = async () => {
    if (!username) return setMessage('Podaj nazwę użytkownika!');
    if (password !== password2) return setMessage('Hasła są niezgodne!');
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username: username,
        password: password,
      });

      window.history.pushState(null, '', '/login');

      const event = new Event('popstate');
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="theme">
      {console.log(message)}
      {message && <ReturnInfo message={message} setMessage={setMessage} />}
      <h1>Rejestracja</h1>
      <div className="account">
        <label htmlFor="username">Nazwa użytkownika</label>{' '}
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="user_password">Powtórz hasło</label>{' '}
        <input
          type="password"
          id="user_password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="user_password2">Hasło</label>{' '}
        <input
          type="password"
          id="user_password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="button" className="button_link" onClick={handleRegister}>
          Zarejestruj
        </button>
      </div>
    </div>
  );
};

export default Register;
