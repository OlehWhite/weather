import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { countries } from "./thunks";
import { RootState } from "../index";

interface CountriesState {
  counties: null | any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  counties: null,
  isLoading: false,
  error: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(countries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(countries.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.counties = action.payload;
      })
      .addCase(countries.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.counties.counties;

export default countriesSlice.reducer;
