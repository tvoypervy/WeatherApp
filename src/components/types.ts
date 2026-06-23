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