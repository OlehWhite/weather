import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { weather } from "./thunks";
import { RootState } from "../index";

interface WeatherState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

const initialState: WeatherState = {
  isLoading: false,
  error: null,
  data: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(weather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(weather.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(weather.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = weatherSlice.actions;

export const selectWeather = (state: RootState) => state.weather.data;

export default weatherSlice.reducer;
