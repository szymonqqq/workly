import React, { useState, useEffect } from 'react';
import './style/returnInfo.css';
const ReturnInfo = ({ info, setMessage }) => {
  const [visibility, setVisibility] = useState(true);

  setTimeout(() => {
    setVisibility(false);
    setMessage(false);
  }, 1500);

  return (
    <>
      {visibility && (
        <div className="return_info">
          <h1>{info}</h1>
        </div>
      )}
    </>
  );
};

export default ReturnInfo;
