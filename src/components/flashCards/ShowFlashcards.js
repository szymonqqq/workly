import React, { useEffect, useState } from 'react';
import RenderLabelFlashCards from './RenderLabelFlashCards';
import { getFlashCards } from './getFlashCards';
import { useCookies } from 'react-cookie';
import FlashCardKit from './FlashCardKit';
import ReturnInfo from '../returnInfo';

const ShowFlashCards = () => {
  const [message, setMessage] = useState('');
  const [dbData, setDbData] = useState([]);
  const [data, setData] = useState([]);
  const [cookies] = useCookies(['user_id']);
  useEffect(() => {
    getFlashCards(cookies.user_id, setDbData);
  }, []);
  const rotateCard = () => {
    const arr = [];
    const obj = data;
    data.data.forEach((e, i) => arr.push(e.reverse()));
    obj.data = arr;
    setData(obj);
  };
  return (
    <div className="theme">
      {message && <ReturnInfo info={message} setMessage={setMessage} />}
      {data.length === 0 ? (
        <RenderLabelFlashCards
          datas={dbData}
          setData={setData}
          getFlashCards={() => getFlashCards(cookies.user_id, setDbData)}
          setMessage={setMessage}
        />
      ) : (
        <FlashCardKit
          data={data.data}
          setData={setData}
          rotateCard={rotateCard}
        />
      )}
    </div>
  );
};
export default ShowFlashCards;
