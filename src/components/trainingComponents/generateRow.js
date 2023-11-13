import React, { useEffect, useState } from 'react';

const GenerateRow = ({ text, setText, index, packText }) => {
  const [insideText, setInsideText] = useState(text);

  const handleInputChange = (e, i) => {
    const updatedInsideText = [...insideText];
    updatedInsideText[i] = e.target.value;
    setInsideText(updatedInsideText);
  };

  const rows = insideText.map((value, i) => (
    <div key={i}>
      <input
        type="text"
        onChange={(e) => handleInputChange(e, i)}
        value={value}
      />
    </div>
  ));

  return (
    <div className="plan_description">
      <div>{rows}</div>
      <button
        onClick={() => {
          setInsideText([...insideText, '']);
        }}
      >
        +
      </button>
    </div>
  );
};

export default GenerateRow;
