import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { React, useState } from 'react';

const LoginBox = ({ setPassword, id }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="login_pass_box">
      <input
        type={showPass ? 'text' : 'password'}
        id={id}
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
  );
};
export default LoginBox;
