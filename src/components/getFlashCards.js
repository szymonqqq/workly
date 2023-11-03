import axios from 'axios';

export const getFlashCards = async (user_id, setDbData) => {
  try {
    const response = await axios.get('http://localhost:3001/get_flashCards', {
      id: user_id,
    });
    setDbData(response.data);
  } catch {
    console.log('bład w dodawaniu');
  }
  return console.log(user_id);
};
