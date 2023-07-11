import { axiosInstance } from "../config";
import { CONFIG_APP } from "../../config";

export const weatherApi = {
  async weather(weather: any) {
    const result = await axiosInstance.post(
      `https://api.openweathermap.org/data/2.5/forecast?q=${weather}&appid=${CONFIG_APP.BASE_KEY}`
    );
    return result.data;
  },
};
