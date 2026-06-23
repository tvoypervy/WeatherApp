import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { GothicWeather } from "./components/GothicWeather";
import "./App.css";

const MainPortal: React.FC = () => {
  const { lang, toggleLanguage } = useLanguage();

  const [showThemeAlert, setShowThemeAlert] = useState<boolean>(false);

  const gothicCities: string[] = [
    "KYIV",
    "VINNYTSIA",
    "NEW YORK",
    "PORTO",
    "LISABON",
    "MADRID",
    "BARCELONA",
    "MILAN",
    "ROME",
  ];

  return (
    <div className="gothic-portal">
      <main className="gothic-portal__content">
        <div className="gothic-portal__controls">
          <button className="gothic-portal__btn" onClick={toggleLanguage}>
            {lang === "en" ? "🔮 EN" : "🔮 UK"}
          </button>

          <button
            className="gothic-portal__btn"
            onClick={() => setShowThemeAlert(true)}
          >
            {lang === "en" ? "🌙 THEME" : "🌙 ТЕМА"}
          </button>
        </div>

        <h1 className="gothic-portal__title">
          {lang === "en" ? "Nocturnal Weather Grid" : "Матриця Нічної Погоди"}
        </h1>

        <div className="gothic-portal__grid">
          {gothicCities.map((cityName, index) => (
            <GothicWeather key={index} city={cityName} />
          ))}
        </div>
      </main>

      {showThemeAlert && (
        <div
          className="gothic-modal-overlay"
          onClick={() => setShowThemeAlert(false)}
        >
          <div className="gothic-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gothic-modal__content">
              <h2 className="gothic-modal__title">
                {lang === "en" ? "ABYSSAL WARNING" : "ПОПЕРЕДЖЕННЯ БЕЗОДНІ"}
              </h2>
              <p className="gothic-modal__text">
                {lang === "en"
                  ? "There is no light here. Embrace the eternal darkness."
                  : "Тут немає місця світлу. Прийми вічну темряву."}
              </p>
              <button
                className="gothic-modal__close-btn"
                onClick={() => setShowThemeAlert(false)}
              >
                {lang === "en" ? "Obey" : "Підкоритися"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MainPortal />
    </LanguageProvider>
  );
}

export default App;
