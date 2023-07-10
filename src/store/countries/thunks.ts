import { createAsyncThunk } from "@reduxjs/toolkit";
import { countriesApi } from "../../api";

export const countries = createAsyncThunk(
  "",
  async (_, { rejectWithValue }) => {
    try {
      return await countriesApi.countries();
    } catch (e: any) {
      return rejectWithValue(e.message || "Something went wrong");
    }
  }
);
