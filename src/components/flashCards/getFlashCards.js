import axios from 'axios';

export const getFlashCards = async (user_id, setDbData) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}get_flashCards?user_id=${user_id}`
    );

    response.data.length !== 0 && setDbData(response.data);
  } catch {
    console.log('bład w dodawaniu');
  }
};
