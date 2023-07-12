export interface City {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  dt: number;
  weather: {
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
}

export interface IContent {
  city: City;
  temp: number;
  feelsLike: number;
  index: number;
}
