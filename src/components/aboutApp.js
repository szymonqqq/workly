import React from 'react';
import './style/aboutApp.css';
const AboutApp = () => {
  return (
    <div className="theme">
      <h1>Aplikacja Workly</h1>
      <div className="describe">
        <p>
          <span> WORKLY </span>
          to wygodna aplikacja internetowa stworzona do efektywnego planowania
          zadań. Dzięki niej użytkownicy mogą zarządzać swoimi obowiązkami w
          sposób przejrzysty i efektywny. Poniżej przedstawiamy główne funkcje i
          możliwości aplikacji:
        </p>
        <h2>Dodawanie Zadań:</h2>
        <p>
          Przy pomocy WORKLY możesz łatwo dodawać nowe zadania. Każde zadanie
          może zawierać informacje, takie jak nazwa, opis oraz priorytet.
        </p>
        <h2>Planowanie z Datą:</h2>
        <p>
          Aplikacja umożliwia przypisywanie dat wykonania do każdego zadania.
          Dzięki temu możesz tworzyć harmonogramy zadań i śledzić terminy.
        </p>

        <h2>Zarządzanie Priorytetami:</h2>
        <p>
          Każde zadanie może być oznaczone priorytetem, co pomaga w określeniu,
          które zadania są najważniejsze. To pomaga w skoncentrowaniu się na
          najważniejszych obowiązkach.
        </p>
      </div>
    </div>
  );
};
export default AboutApp;
