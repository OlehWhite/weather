import { axiosInstance } from "../config";
import { CONFIG_APP } from "../../config";

export const citiesApi = {
  async city(city: any) {
    const result = await axiosInstance.post(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG_APP.BASE_KEY}`
    );
    return result.data;
  },
};
