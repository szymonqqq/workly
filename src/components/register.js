import React, { useState } from 'react';
import axios from 'axios';
import ReturnInfo from './returnInfo';
import LoginBox from './LoginBox';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const handleRegister = async () => {
    if (!username) return setMessage('Podaj nazwę użytkownika!');
    else if (password !== password2) return setMessage('Hasła są niezgodne!');
    else if (password.length < 8)
      return setMessage(
        'Hasła są za krótkie, hasło powinno składać się z conajmniej 8 znaków'
      );
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}register`,
        {
          username: username,
          password: password,
        }
      );

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
      {message && <ReturnInfo info={message} setMessage={setMessage} />}
      <h1 className="register_name">Rejestracja</h1>
      <div className="account">
        <label htmlFor="username">Nazwa użytkownika</label>{' '}
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="user_password">hasło</label>{' '}
        <LoginBox setPassword={setPassword} />
        <label htmlFor="user_password2">Powtórz Hasło</label>{' '}
        <LoginBox setPassword={setPassword2} />
        <button type="button" className="button_link" onClick={handleRegister}>
          Zarejestruj
        </button>
      </div>
    </div>
  );
};

export default Register;
