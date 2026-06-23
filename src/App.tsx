import React from 'react';
import './App.css';
import { GothicWeather } from './components/GhoticWeather';

function App() {
  const gothicCities: string[] = [
    "KYIV", // 1
    "VINNYTSIA", // 2
    "NEW YORK", // 3
    "PORTO", // 4
    "LISABON", // 5
    "MADRID", // 6
    "BARCELONA", // 7
    "MILAN", // 8
    "ROME", // 9 and more!
  ];

  return (
    <div className="gothic-portal">
      <main className="gothic-portal__content">
        <h1 className="gothic-portal__title">Nocturnal Weather Grid</h1>
        <div className="gothic-portal__grid">
          {gothicCities.map((cityName, index) => (
            <GothicWeather key={index} city={cityName} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;