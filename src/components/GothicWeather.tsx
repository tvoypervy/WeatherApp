import React, { useState, useEffect } from "react";
import type { WeatherData, GothicMoodValue } from "./types";
import "./GothicWeather.css";
import { useLanguage } from "../context/LanguageContext";
import {
  WiNightClear,
  WiCloudy,
  WiRain,
  WiSprinkle,
  WiLightning,
  WiSnow,
  WiFog,
  WiDust,
} from "react-icons/wi";

const gothicMoods: Record<string, GothicMoodValue> = {
  Clear: {
    titleEn: "Clear Nightshade",
    titleUk: "Чистий Пасльон",
    descEn: "The stars bear witness to the cold void.",
    descUk: "Зорі свідчать про холодну порожнечу.",
    icon: <WiNightClear />,
  },
  Clouds: {
    titleEn: "Overcast Gloom",
    titleUk: "Суцільна Похмурість",
    descEn: "Mists drape the world in eternal shadows.",
    descUk: "Тумани огортають світ вічними тінями.",
    icon: <WiCloudy />,
  },
  Rain: {
    titleEn: "Weeping Skies",
    titleUk: "Рясні Сльози Небес",
    descEn: "A melancholic downpour washes away the light.",
    descUk: "Меланхолійна злива змиває залишки світла.",
    icon: <WiRain />,
  },
  Drizzle: {
    titleEn: "Spiritual Mist",
    titleUk: "Примарна Мжичка",
    descEn: "The veil between worlds grows thin.",
    descUk: "Завіса між світами стає тоншою.",
    icon: <WiSprinkle />,
  },
  Thunderstorm: {
    titleEn: "Wrath of the Heavens",
    titleUk: "Гнів Небес",
    descEn: "Nature rages. Perfect time for dark creation.",
    descUk: "Природа лютує. Ідеальний час для темної творчості.",
    icon: <WiLightning />,
  },
  Snow: {
    titleEn: "Frozen Silence",
    titleUk: "Замерзла Тиша",
    descEn: "A cold shroud covers the earth.",
    descUk: "Холодний саван покриває землю.",
    icon: <WiSnow />,
  },
  Mist: {
    titleEn: "Phantom Fog",
    titleUk: "Фантомний Туман",
    descEn: "The shadows walk among us.",
    descUk: "Тіні блукають серед нас.",
    icon: <WiFog />,
  },
  Smoke: {
    titleEn: "Ashen Veil",
    titleUk: "Пилюга Пепелу",
    descEn: "The horizon is veiled in ash and forgotten sorrow.",
    descUk: "Горизонт укрито попелом і забутою тугою.",
    icon: <WiDust />,
  },
  Haze: {
    titleEn: "Cursed Haze",
    titleUk: "Проклята Імар",
    descEn: "The air itself seems to whisper forbidden names.",
    descUk: "Наче повітря шепоче заборонені імена.",
    icon: <WiFog />,
  },
  Dust: {
    titleEn: "Sand of the Lost",
    titleUk: "Пісок Загублених",
    descEn: "The world is being slowly buried beneath a grim desert of memory.",
    descUk: "Світ повільно занурюється в похмурий пісок пам'яті.",
    icon: <WiDust />,
  },
};

interface GothicWeatherProps {
  city: string;
  onRemove: () => void;
}

export const GothicWeather: React.FC<GothicWeatherProps> = ({
  city,
  onRemove,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Витягуємо поточну мову з контексту
  const { lang } = useLanguage();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (!city || city.trim() === "") {
      setError("Unknown Territory");
      setLoading(false);
      return;
    }

    if (!apiKey) {
      setError("API key is missing in the shadows...");
      setLoading(false);
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Silent skies...");
        return res.json();
      })
      .then((data: WeatherData) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  const isUk = lang === "uk";

  if (loading) {
    return (
      <div className="gothic-weather gothic-weather--loading">
        <button
          type="button"
          className="gothic-weather__remove"
          onClick={onRemove}
          aria-label={isUk ? `Видалити ${city}` : `Remove ${city}`}
        >
          ×
        </button>
        {isUk
          ? `Прикликання духів для ${city}...`
          : `Summoning spirits for ${city || "unknown"}...`}
      </div>
    );
  }

  if (error || !weather) {
    return (
      <article className="gothic-weather gothic-weather--error">
        <button
          type="button"
          className="gothic-weather__remove"
          onClick={onRemove}
          aria-label={isUk ? `Видалити ${city}` : `Remove ${city}`}
        >
          ×
        </button>
        <div className="gothic-weather__location">
          {city || (isUk ? "Забута Земля" : "Forgotten Land")}
        </div>
        <h3 className="gothic-weather__status">
          {isUk ? "Безодня Порожнечі" : "Abyssal Void"}
        </h3>
        <p className="gothic-weather__description">
          "
          {error ||
            (isUk
              ? "Це місце загублене в часі."
              : "This place is lost in time.")}
          "
        </p>
      </article>
    );
  }

  const mainCondition = weather.weather[0]?.main || "Clouds";
  const mood = gothicMoods[mainCondition] || {
    titleEn: "Mysterious Ether",
    titleUk: "Містичний Ефір",
    descEn: "The atmosphere is unreadable.",
    descUk: "Атмосфера залишається нерозгаданою.",
    icon: <WiDust />,
  };

  return (
    <article className="gothic-weather">
      <button
        type="button"
        className="gothic-weather__remove"
        onClick={onRemove}
        aria-label={isUk ? `Видалити ${city}` : `Remove ${city}`}
      >
        ×
      </button>
      <div className="gothic-weather__location">
        {weather.name} — {isUk ? "Царство" : "Realm"}
      </div>

      <div className="gothic-weather__icon">{mood.icon}</div>

      <div className="gothic-weather__temp">
        {Math.round(weather.main.temp)}°C
      </div>

      <h3 className="gothic-weather__status">
        {isUk ? mood.titleUk : mood.titleEn}
      </h3>

      <p className="gothic-weather__description">
        "{isUk ? mood.descUk : mood.descEn}"
      </p>

      <div className="gothic-weather__meta">
        <span className="gothic-weather__humidity">
          {isUk ? "Вологість" : "Humidity"}: {weather.main.humidity}%
        </span>
      </div>
    </article>
  );
};
