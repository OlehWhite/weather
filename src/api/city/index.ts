import { axiosInstance } from "../config";
import { CONFIG_APP } from "../../config";

interface ICurrentCity {
  latitude: number;
  longitude: number;
}

export const citiesApi = {
  async city(city: any) {
    const result = await axiosInstance.post(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG_APP.BASE_KEY}`
    );
    return result.data;
  },
  async currentCity({ latitude, longitude }: ICurrentCity) {
    const result = await axiosInstance.post(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${CONFIG_APP.BASE_KEY}`
    );
    return result.data;
  },
};
