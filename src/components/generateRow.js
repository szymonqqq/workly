import React, { useEffect, useState } from 'react';

const GenerateRow = ({ text, setText, index, packText }) => {
  const [countRow, setCountRow] = useState(1);
  const [insideText, setInsideText] = useState(text);
  useEffect(() => {
    setInsideText(text);
  }, [text]);
  useEffect(() => {
    const unPack = [...packText];
    unPack[index] = insideText;
    setText(unPack);
  }, [insideText]);

  const handleInputChange = (e, i) => {
    const updatedInsideText = [...insideText];
    updatedInsideText[i] = e.target.value;
    setInsideText(updatedInsideText);
  };

  const rows = [];
  useEffect(() => {
    setCountRow(insideText.length);
  }, [insideText]);

  for (let i = 0; i < countRow; i++) {
    rows.push(
      <div key={i}>
        <input
          type="text"
          onChange={(e) => handleInputChange(e, i)}
          value={insideText[i]}
        />
      </div>
    );
  }

  return (
    <div className="plan_description">
      <div>{rows}</div>
      <button
        onClick={() => {
          setCountRow(countRow + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default GenerateRow;
