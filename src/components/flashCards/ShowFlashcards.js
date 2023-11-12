import React, { useEffect, useState } from 'react';
import RenderLabelFlashCards from './RenderLabelFlashCards';
import { getFlashCards } from './getFlashCards';
import { useCookies } from 'react-cookie';
import FlashCardKit from './FlashCardKit';

const ShowFlashCards = () => {
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
      {data.length === 0 ? (
        <RenderLabelFlashCards
          datas={dbData}
          setData={setData}
          getFlashCards={() => getFlashCards(cookies.user_id, setDbData)}
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
