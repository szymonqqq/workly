import { React, useEffect, useState } from 'react';

const FlashCardScore = ({
  cardCount,
  setCorrectWord,
  correctWord,
  setEndKnowledge,
  setNumber,
  repeatTest,

  setSumScore,
  sumScore,
}) => {
  const [actualPoints, setActualPoints] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setActualPoints(correctWord.length);
    setScore(correctWord.filter((e) => e === null).length);

    setCorrectWord((prev) => {
      const arr = prev.filter((e) => e !== null);
      return arr;
    });
  }, []);
  useEffect(() => {
    setSumScore((prev) => prev + score);
  }, [score]);
  const resetCheckKnowledge = () => {
    setEndKnowledge(false);
    setNumber(0);
  };
  return (
    <div className="dark_bg">
      <div className="flashcard_score">
        <h1>Wynik</h1>
        <p>
          Udało Ci się osiągnąć {score}/{actualPoints}
        </p>
        <p>
          Wszystkie punkty: {sumScore}/{cardCount}
        </p>
        {correctWord.length !== 0 && (
          <button onClick={resetCheckKnowledge} className="functional_button">
            Powtórz
          </button>
        )}
        <button onClick={repeatTest} className="functional_button">
          Spróbuj od nowa
        </button>

        <button
          onClick={() => window.location.reload()}
          className="functional_button"
        >
          Zakończ
        </button>
        <div className="progress_box">
          <div
            className="progress_bar"
            style={{ width: `${(sumScore * 100) / cardCount}%` }}
          >
            {Math.floor(`${(sumScore * 100) / cardCount}`)}%
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlashCardScore;
