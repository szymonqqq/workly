import React, { useState } from 'react';
import './style/login.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReturnInfo from './returnInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
  const [cookies, setCookie] = useCookies(['access_key', 'user_id']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [info, setInfo] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        const jwtToken = data.token;
        window.history.pushState(null, '', '/main_panel/');

        setCookie('access_key', jwtToken);
        setCookie('user_id', data._id);
        const event = new Event('popstate');
        window.dispatchEvent(event);
      } else {
        setInfo(data.error);
      }
    } catch (error) {
      setInfo(error);
    }
  };

  return (
    <div className="theme">
      {info && <ReturnInfo info={info} setMessage={setInfo} />}
      <h1 className="text_login">Logowanie</h1>
      <div className="account">
        <label htmlFor="username">Nazwa użytkownika</label>{' '}
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="user_password">Hasło</label>{' '}
        <div className="login_pass_box">
          <input
            type={showPass ? 'text' : 'password'}
            id="user_password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        <p className="or_register">
          Jeśli nie posiadasz konta <Link to="/register">kliknij</Link>{' '}
          {cookies.user}
        </p>
        <button type="submit" onClick={handleLogin}>
          zaloguj
        </button>
      </div>
    </div>
  );
};
export default Login;
