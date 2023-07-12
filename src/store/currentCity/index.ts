import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentCity } from "./thunks";
import { RootState } from "../index";

interface CurrentCityState {
  currentCity: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrentCityState = {
  currentCity: null,
  isLoading: false,
  error: null,
};

export const currentCitySlice = createSlice({
  name: "currentCity",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    deleteCurrentCityLocation: (state) => {
      state.currentCity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentCity.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.currentCity = action.payload;
      })
      .addCase(currentCity.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, deleteCurrentCityLocation } =
  currentCitySlice.actions;

export const selectCurrentCity = (state: RootState) => state.currentCity;

export default currentCitySlice.reducer;
