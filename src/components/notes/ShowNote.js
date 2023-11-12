import React, { useEffect, useState } from 'react';
import Note from './Note';
import axios from 'axios';
import '../style/note.css';
import { useCookies } from 'react-cookie';
import RenderLabelNote from './RenderLabelNote';
import ReturnInfo from '../returnInfo';
const ShowNote = () => {
  const [showNote, setShowNote] = useState(false);
  const [cookies] = useCookies(['user_id']);
  const [datas, setDatas] = useState();
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const getNote = async () => {
    const id = cookies.user_id;
    try {
      const response = await axios.get(
        `http://localhost:3001/get_note?user_id=${id}`
      );

      setDatas(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNote();
  }, []);

  return (
    <>
      {message && <ReturnInfo info={message} setMessage={setMessage} />}
      <div className="theme">
        {showNote ? (
          <Note
            setShowNote={setShowNote}
            data={data}
            setData={setData}
            getNote={getNote}
            setMessage={setMessage}
          />
        ) : (
          <div className="show_note">
            <button
              onClick={!showNote ? () => setShowNote(true) : undefined}
              className="functional_button"
            >
              +
            </button>
            {datas && (
              <RenderLabelNote
                datas={datas}
                setData={setData}
                setShowNote={setShowNote}
                getNote={getNote}
                setMessage={setMessage}
              />
            )}{' '}
          </div>
        )}
      </div>
    </>
  );
};

export default ShowNote;
