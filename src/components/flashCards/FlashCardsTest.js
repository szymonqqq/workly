import React, { useEffect, useState } from 'react';

const FlashCardsTest = ({ data }) => {
  const [points, setPoints] = useState(0);
  const [arrPoints, setArrPoints] = useState(new Array(data.length).fill(0));
  const [inputValue, setInputValue] = useState(new Array(data.length).fill(''));
  const [elements, setElements] = useState();
  const [check, setCheck] = useState(false);
  const handleInputValue = (e, i) => {
    const updatedInputValue = [...inputValue];
    updatedInputValue[i] = e.target.value;
    setInputValue(updatedInputValue);
  };
  useEffect(() => {
    setElements(
      data.map((ele, i) => (
        <div key={i}>
          <p>{ele[0]}</p>
          <input
            type="text"
            onChange={(e) => {
              handleInputValue(e, i);
              e.target.value === ele[1]
                ? (arrPoints[i] = 1)
                : (arrPoints[i] = 0);
            }}
            style={{
              border: `2px solid ${
                check ? (arrPoints[i] ? 'green' : 'red') : 'blue'
              }`,
            }}
            value={inputValue[i]}
          />
        </div>
      ))
    );
  }, [points, check, inputValue]);

  const getPoints = () => {
    let point = 0;
    arrPoints.forEach((e) => {
      if (e) point += 1;
    });
    setPoints(point);
  };
  return (
    <div className="test_box">
      {elements}
      <div className="btn_box_flashCard">
        <button
          onClick={() => {
            setCheck(true);
            getPoints();
          }}
          className="functional_button"
        >
          Sprawdz
        </button>
        <p>{points}</p>
        <button
          onClick={() => {
            setInputValue(new Array(data.length).fill(''));
            setCheck(false);
          }}
          className="functional_button"
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default FlashCardsTest;
