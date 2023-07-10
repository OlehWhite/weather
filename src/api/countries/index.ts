import { axiosInstance } from "../config";
import { CONFIG_APP } from "../../config";

export const countriesApi = {
  async countries() // { city }: string
  {
    const result = await axiosInstance.post(
      ""
      // `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG_APP.BASE_KEY}`
    );
    return result.data;
  },
};
