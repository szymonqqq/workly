import React, { useState } from 'react';

const ConvertFlashCards = ({ setData, setCountCards, setCanImport }) => {
  const [importValue, setImportValue] = useState('');
  const convert = () => {
    let str = '';

    let arr = [];
    let len = 0;

    for (let i = 0; i < importValue.length; i++) {
      if (importValue[i] === ';') {
        if (str.length > 0) {
          arr[len] = str;
          len += 1;
          str = '';
        }
      } else {
        str += importValue[i];
      }
    }

    if (str.length > 0) {
      arr[len] = str;
    }
    const arr2 = [];

    for (let i = 0; i < arr.length; i++) {
      const lastIndexOfUnderscore = arr[i].lastIndexOf("+'_");

      if (lastIndexOfUnderscore !== -1) {
        arr2.push([
          arr[i].slice(0, lastIndexOfUnderscore),
          arr[i].slice(lastIndexOfUnderscore + 3),
        ]);
      } else {
        arr2.push([arr[i], '']);
      }
    }
    setData(arr2);
    setCountCards(arr2.length);
  };
  return (
    <div className="import_cards">
      <div className="dark">
        <div>
          <h1>Importuj fiszki</h1>
          <button
            onClick={() => setCanImport(false)}
            className="functional_button"
          >
            x
          </button>
          <input
            type="text"
            onChange={(e) => setImportValue(e.target.value)}
            value={importValue}
          />
          <button
            onClick={() => {
              setCanImport(false);
              convert();
            }}
            className="functional_button"
          >
            dodaj
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConvertFlashCards;
