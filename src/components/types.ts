import React from 'react';

export interface WeatherData {
  name: string; 
  main: {
    temp: number; 
    humidity: number; 
  };
  weather: Array<{
    main: string; 
    description: string; 
    icon: string;
  }>;
}

export interface GothicMoodValue {
  titleEn: string;
  titleUk: string;
  descEn: string;
  descUk: string;
  icon: React.ReactNode; 
}