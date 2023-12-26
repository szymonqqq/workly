import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBackward,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import ShowFlashCards from './ShowFlashcards';
import FlashCardsTest from './FlashCardsTest';
const FlashCardKit = ({ data, setData, rotateCard }) => {
  const [part, setPart] = useState(0);
  const [number, setNumber] = useState(0);
  const [word, setWord] = useState(data[number][part]);
  const [turnTest, setTurnTest] = useState(true);

  useEffect(() => {
    setWord(data[number][part]);
  }, [rotateCard, part, number]);

  return (
    <div className="flashCard_box">
      <button
        className="functional_button start_test"
        onClick={() => setTurnTest(!turnTest)}
      >
        {turnTest ? (
          'test'
        ) : (
          <FontAwesomeIcon icon={faArrowRight} rotation={180} />
        )}
      </button>

      {turnTest && (
        <>
          <div
            onClick={(e) => {
              part === 1 ? setPart(0) : setPart(1);
            }}
            className={`card ${part === 1 ? 'rotateCardR' : 'rotateCardL'}`}
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
          <div className="btn_box_flashCard">
            <button
              onClick={() => setNumber(number === 0 ? number : number - 1)}
              className="functional_button"
            >
              <FontAwesomeIcon icon={faArrowRight} rotation={180} />
            </button>
            <p>{number + 1}</p>

            <button
              onClick={() => {
                setNumber(number === data.length - 1 ? number : number + 1);
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
        </>
      )}
      {!turnTest && <FlashCardsTest data={data} />}
    </div>
  );
};
export default FlashCardKit;
