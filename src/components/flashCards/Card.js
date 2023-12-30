import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBackward,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import FlashCardScore from './FlashCardScore';

const Card = ({ data, rotateCard, setData, test }) => {
  const [part, setPart] = useState(0);
  const [number, setNumber] = useState(0);
  const [word, setWord] = useState('');
  const [correctWord, setCorrectWord] = useState(data);
  const [endCheckKnowledge, setEndKnowledge] = useState(false);

  const [sumScore, setSumScore] = useState(0);
  useEffect(() => {
    if (test) {
      setWord(correctWord[number]?.[part] || '');
    } else {
      setWord(data[number]?.[part] || '');
    }
  }, [rotateCard, part, number, data, correctWord, test]);
  useEffect(() => {
    setNumber(0);
  }, [test]);
  const repeatTest = () => {
    setNumber(0);
    setCorrectWord(data);
    setEndKnowledge(false);
    setSumScore(0);
  };
  const nextCard = () => {
    number + 1 === correctWord.length
      ? setEndKnowledge(true)
      : setNumber((prevNumber) => {
          if (test)
            return prevNumber < correctWord.length ? (prevNumber += 1) : number;
          else return prevNumber < data.length ? (prevNumber += 1) : number;
        });
  };

  const handleProficiencyButtonClick = () => {
    nextCard();
    setCorrectWord((prevCorrectWord) => {
      const updatedCorrectWord = [...prevCorrectWord];
      updatedCorrectWord[number] = null;
      return updatedCorrectWord;
    });
    setPart(0);
  };

  return (
    <>
      {endCheckKnowledge && (
        <FlashCardScore
          cardCount={data.length}
          correctWord={correctWord}
          setCorrectWord={setCorrectWord}
          setEndKnowledge={setEndKnowledge}
          setNumber={setNumber}
          repeatTest={repeatTest}
          setSumScore={setSumScore}
          sumScore={sumScore}
        />
      )}
      <div
        onClick={() => {
          setPart((prevPart) => (prevPart === 1 ? 0 : 1));
        }}
        className={`card ${part === 1 ? 'rotateCardR' : 'rotateCardL'}`}
      >
        <h1>{word}</h1>
      </div>
      <button
        onClick={() => {
          setWord(data[number]?.[1] || '');
          rotateCard();
        }}
        className="rotate functional_button"
      >
        <FontAwesomeIcon icon={faRotateLeft} />
      </button>
      <div className="btn_box_flashCard">
        <button
          onClick={() => {
            test
              ? nextCard()
              : setNumber((prevNumber) => Math.max(prevNumber - 1, 0));
          }}
          style={test ? { backgroundColor: 'red' } : null}
          className="functional_button"
        >
          {test ? (
            'nie umiem'
          ) : (
            <FontAwesomeIcon icon={faArrowRight} rotation={180} />
          )}
        </button>
        <p>{number + 1}</p>

        <button
          onClick={() =>
            test
              ? handleProficiencyButtonClick()
              : setNumber((prevNumber) =>
                  Math.min(prevNumber + 1, data.length - 1)
                )
          }
          style={test ? { backgroundColor: 'green' } : null}
          className="functional_button"
        >
          {test ? 'umiem' : <FontAwesomeIcon icon={faArrowRight} />}
        </button>
      </div>
      <button onClick={() => setData([])} className="functional_button">
        <FontAwesomeIcon icon={faBackward} />
      </button>
    </>
  );
};

export default Card;
