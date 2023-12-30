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
import Card from './Card';
const FlashCardKit = ({ data, setData, rotateCard }) => {
  const [turnTest, setTurnTest] = useState('off');
  const [testKnowlange, setTestKnowlange] = useState(false);
  return (
    <div className="flashCard_box">
      <div className="test_box">
        <button
          className="functional_button start_test "
          onClick={() => setTurnTest(turnTest === 'test' ? 'off' : 'test')}
        >
          {turnTest ? (
            'test'
          ) : (
            <FontAwesomeIcon icon={faArrowRight} rotation={180} />
          )}
        </button>
        <button
          className="functional_button "
          onClick={() => setTestKnowlange(!testKnowlange)}
        >
          sprawdź wiedzę
        </button>
      </div>

      {turnTest === 'off' && (
        <Card
          data={data}
          rotateCard={rotateCard}
          setData={setData}
          test={testKnowlange}
        />
      )}
      {turnTest === 'test' && <FlashCardsTest data={data} />}
    </div>
  );
};
export default FlashCardKit;
