import React, { useEffect, useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { GothicWeather } from "./components/GothicWeather";
import "./App.css";

const STORAGE_KEY = "gothic-weather-cities";
const MAX_CITIES = 9;

const MainPortal: React.FC = () => {
  const { lang, toggleLanguage } = useLanguage();

  const [showThemeAlert, setShowThemeAlert] = useState<boolean>(false);
  const [showCityModal, setShowCityModal] = useState<boolean>(false);
  const [cityInput, setCityInput] = useState<string>("");
  const [cityMessage, setCityMessage] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);
      return Array.isArray(parsed)
        ? parsed.filter(
            (item): item is string =>
              typeof item === "string" && item.trim().length > 0,
          )
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  }, [cities]);

  const openCityModal = () => {
    setCityInput("");
    setCityMessage(null);
    setShowCityModal(true);
  };

  const handleAddCity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextCity = cityInput.trim().toUpperCase();

    if (!nextCity) {
      setCityMessage(
        lang === "en" ? "Enter a city name." : "Введіть назву міста.",
      );
      return;
    }

    if (cities.some((city) => city.toUpperCase() === nextCity)) {
      setCityMessage(
        lang === "en"
          ? "This city is already on the list."
          : "Це місто вже є в списку.",
      );
      return;
    }

    if (cities.length >= MAX_CITIES) {
      setCityMessage(
        lang === "en"
          ? "You can track up to 9 cities."
          : "Можна відстежувати до 9 міст.",
      );
      return;
    }

    setCities((prev) => [...prev, nextCity]);
    setCityInput("");
    setCityMessage(null);
    setShowCityModal(false);
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setCities((prev) => prev.filter((city) => city !== cityToRemove));
  };

  return (
    <div className="gothic-portal">
      <main className="gothic-portal__content">
        <div className="gothic-portal__controls">
          <button className="gothic-portal__btn" onClick={openCityModal}>
            {lang === "en" ? "🕯 ADD CITY" : "🕯 ДОДАТИ МІСТО"}
          </button>

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
          {cities.length === 0 ? (
            <div className="gothic-portal__empty-grid">
              {lang === "en"
                ? "The weather mirrors will awaken once a city is chosen."
                : "Погода з'явиться, коли обереш місто."}
            </div>
          ) : (
            cities.map((cityName) => (
              <GothicWeather
                key={cityName}
                city={cityName}
                onRemove={() => handleRemoveCity(cityName)}
              />
            ))
          )}
        </div>
      </main>

      {showCityModal && (
        <div
          className="gothic-modal-overlay"
          onClick={() => setShowCityModal(false)}
        >
          <div className="gothic-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="gothic-modal__title">
              {lang === "en" ? "RITUAL CHOICE" : "РИТУАЛЬНИЙ ВИБІР"}
            </h2>
            <p className="gothic-modal__text">
              {lang === "en"
                ? "Name a city to add it to your weather circle."
                : "Вкажіть місто, щоб додати його до кола погоди."}
            </p>
            <form className="gothic-portal__city-form" onSubmit={handleAddCity}>
              <input
                className="gothic-portal__input"
                type="text"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
                placeholder={lang === "en" ? "e.g. Kyiv" : "наприклад Київ"}
              />
              {cityMessage && (
                <p className="gothic-modal__message">{cityMessage}</p>
              )}
              <div className="gothic-portal__city-actions">
                <button className="gothic-modal__close-btn" type="submit">
                  {lang === "en" ? "Add" : "Додати"}
                </button>
                <button
                  className="gothic-modal__close-btn"
                  type="button"
                  onClick={() => setShowCityModal(false)}
                >
                  {lang === "en" ? "Close" : "Закрити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
