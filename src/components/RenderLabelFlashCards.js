import React from 'react';

const RenderLabelFlashCards = ({ datas, setData }) => {
  const elements = datas.map((data, index) => (
    <div
      key={index}
      className="task_value card_data_box "
      onClick={() => setData(datas[index])}
    >
      <div className="dark">
        <h1>{data.title}</h1>
      </div>
    </div>
  ));
  return <>{elements}</>;
};
export default RenderLabelFlashCards;
