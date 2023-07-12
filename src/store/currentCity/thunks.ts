import { createAsyncThunk } from "@reduxjs/toolkit";
import { citiesApi } from "../../api";

interface ICurrentCity {
  latitude: number;
  longitude: number;
}

export const currentCity = createAsyncThunk(
  "currentCity",
  async ({ latitude, longitude }: ICurrentCity, { rejectWithValue }) => {
    try {
      return await citiesApi.currentCity({ latitude, longitude });
    } catch (e: any) {
      return rejectWithValue(e.message || "Something went wrong");
    }
  }
);
