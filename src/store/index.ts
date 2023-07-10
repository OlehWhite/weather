import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import countiesReducer from "./countries";

const rootReducer = {
  counties: countiesReducer,
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
