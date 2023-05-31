type Weather = {
  current: {
    time: string;
    temperature: number;
    temperatureFeelsLike: number;
    condition: string;
    conditionIcon: string;
    windSpeed: number;
    windGustSpeed: number;
    windDirection: string;
    pressure: number;
    humidity: number;
  };
  forecast: {
    dayOne: {
      date: string;
      temperatureHigh: number;
      temperatureLow: number;
      condition: string;
      conditionIcon: string;
      chanceOfRain: number;
    };
    dayTwo: {
      date: string;
      temperatureHigh: number;
      temperatureLow: number;
      condition: string;
      conditionIcon: string;
      chanceOfRain: number;
    };
    dayThree: {
      date: string;
      temperatureHigh: number;
      temperatureLow: number;
      condition: string;
      conditionIcon: string;
      chanceOfRain: number;
    };
  };
};
