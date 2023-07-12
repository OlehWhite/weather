import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cities } from "./thunks";
import { RootState } from "../index";

interface CountriesState {
  cities: any[];
  isLoading: boolean;
  error: string | null;
}

const savedCities = localStorage.getItem("cities");

const initialState: CountriesState = {
  cities: savedCities ? JSON.parse(savedCities) : [],
  isLoading: false,
  error: null,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    deleteCity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.cities) {
        state.cities.splice(index, 1);
        localStorage.setItem("cities", JSON.stringify(state.cities));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cities.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const newCity = action.payload;
        const existingIndex = state.cities?.findIndex(
          (city) => city.id === newCity.id
        );
        if (existingIndex !== -1) {
          state.cities![existingIndex as number] = newCity;
        } else {
          if (!state.cities) {
            state.cities = [];
          }
          state.cities.unshift(newCity);
        }
        localStorage.setItem("cities", JSON.stringify(state.cities));
      })
      .addCase(cities.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, deleteCity } = citiesSlice.actions;

export const selectCities = (state: RootState) => state.cities;

export default citiesSlice.reducer;
