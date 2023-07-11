import { createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi } from "../../api";

export const weather = createAsyncThunk(
  "weather",
  async (weather: string, { rejectWithValue }) => {
    try {
      return await weatherApi.weather(weather);
    } catch (e: any) {
      return rejectWithValue(e.message || "Something went wrong");
    }
  }
);
