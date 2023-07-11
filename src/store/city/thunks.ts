import { createAsyncThunk } from "@reduxjs/toolkit";
import { citiesApi } from "../../api";

export const cities = createAsyncThunk(
  "cities",
  async (city: string, { rejectWithValue }) => {
    try {
      return await citiesApi.city(city);
    } catch (e: any) {
      return rejectWithValue(e.message || "Something went wrong");
    }
  }
);
