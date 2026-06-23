import React, { useState, useEffect } from "react";
import type { WeatherData } from "./types";
import "./GothicWeather.css"; 

const gothicMoods: Record<string, { title: string; desc: string }> = {
  Clear: {
    title: "Clear Nightshade",
    desc: "The stars bear witness to the cold void.",
  },
  Clouds: {
    title: "Overcast Gloom",
    desc: "Mists drape the world in eternal shadows.",
  },
  Rain: {
    title: "Weeping Skies",
    desc: "A melancholic downpour washes away the light.",
  },
  Drizzle: {
    title: "Spiritual Mist",
    desc: "The veil between worlds grows thin.",
  },
  Thunderstorm: {
    title: "Wrath of the Heavens",
    desc: "Nature rages. Perfect time for dark creation.",
  },
  Snow: { title: "Frozen Silence", desc: "A cold shroud covers the earth." },
  Mist: { title: "Phantom Fog", desc: "The shadows walk among us." },
};

interface GothicWeatherProps {
  city: string;
}

export const GothicWeather: React.FC<GothicWeatherProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="gothic-weather gothic-weather--loading">
        Summoning spirits for {city || "unknown"}...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <article className="gothic-weather gothic-weather--error">
        <div className="gothic-weather__location">
          {city || "Forgotten Land"}
        </div>
        <h3 className="gothic-weather__status">Abyssal Void</h3>
        <p className="gothic-weather__description">
          "{error || "This place is lost in time."}"
        </p>
      </article>
    );
  }

  const mainCondition = weather.weather[0]?.main || "Clouds";
  const mood = gothicMoods[mainCondition] || {
    title: "Mysterious Ether",
    desc: "The atmosphere is unreadable.",
  };

  return (
    <article className="gothic-weather">
      <div className="gothic-weather__location">{weather.name} — Realm</div>
      <div className="gothic-weather__temp">
        {Math.round(weather.main.temp)}°C
      </div>
      <h3 className="gothic-weather__status">{mood.title}</h3>
      <p className="gothic-weather__description">"{mood.desc}"</p>
      <div className="gothic-weather__meta">
        <span className="gothic-weather__humidity">
          Humidity: {weather.main.humidity}%
        </span>
      </div>
    </article>
  );
};
