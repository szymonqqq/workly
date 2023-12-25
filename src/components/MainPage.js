import React from 'react';
import './style/main_page.css';

import { Link } from 'react-router-dom';
const MainPage = () => {
  return (
    <div className="theme">
      <div className="main_page">
        <h1>Planuj swój dzień dzięki zaawansowanej aplikacji!</h1>
        <Link to="/register">
          {' '}
          <button className="functional_button">Utwórz konto</button>
        </Link>
      </div>
    </div>
  );
};
export default MainPage;
