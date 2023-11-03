import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBackward,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
const FlashCardKit = ({ data, setData, rotateCard }) => {
  const [part, setPart] = useState(0);

  const [number, setNumber] = useState(0);
  const [insideData, setInsideData] = useState(data[0]);
  const [word, setWord] = useState(data[number][part]);
  useEffect(() => {
    setWord(data[number][part]);
  }, [rotateCard, part, number]);

  return (
    <div className="flashCard_box">
      <div
        onClick={() => {
          part === 1 ? setPart(0) : setPart(1);
        }}
        className="card"
      >
        <h1>{word}</h1>
      </div>
      <button
        onClick={() => {
          setWord(data[number][1]);
          rotateCard();
        }}
        className="rotate functional_button"
      >
        <FontAwesomeIcon icon={faRotateLeft} />
      </button>
      <div>
        <button
          onClick={() => setNumber(number === 0 ? number : number - 1)}
          className="functional_button"
        >
          <FontAwesomeIcon icon={faArrowRight} rotation={180} />
        </button>
        <p>{number}</p>

        <button
          onClick={() => {
            setNumber(number === data.length - 2 ? number : number + 1);
            setPart(0);
          }}
          className="functional_button"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <button onClick={() => setData([])} className="functional_button">
        <FontAwesomeIcon icon={faBackward} />
      </button>
    </div>
  );
};
export default FlashCardKit;
