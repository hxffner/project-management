import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import eventReducer from "../features/event/eventSlice"
import projectReducer from "../features/project/projectSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
