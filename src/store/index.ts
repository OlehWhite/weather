import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import citiesReducer from "./city";
import weatherReducer from "./weather";
import currentCityReducer from "./currentCity";

const rootReducer = {
  cities: citiesReducer,
  weather: weatherReducer,
  currentCity: currentCityReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
