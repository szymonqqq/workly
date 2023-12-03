import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const CheckToken = ({ setToken }) => {
  const [cookies] = useCookies(['access_key']);
  const access = cookies.access_key;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}check_token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();

          setToken(data);
        }
      } catch (error) {
        console.error('Błąd logowania:', error);
      }
    };

    getData();
  }, [cookies.access_key]);
};

export default CheckToken;
