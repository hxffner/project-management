// authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { RootState } from "../../app/store";

interface AuthState {
  user: null | { username: string; email: string };
  jwtToken: null | string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const user = JSON.parse(localStorage.getItem("user") as string);
const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: user || null,
  jwtToken: token || null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    const response = await authService.login(
      credentials.username,
      credentials.password
    );

    const { jwtToken, username, email } = response;

    // Store user details in localStorage
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify({ username, email }));

    return { user: { username, email }, jwtToken };
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await authService.register(
      credentials.username,
      credentials.email,
      credentials.password
    );

    const { jwtToken, username, email } = response;

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify({ username, email }));

    return { user: { username, email }, jwtToken };
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  // Add logic for logging out on the server if necessary

  // Remove user details from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return { user: null, jwtToken: null };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: { username: string; email: string }; jwtToken: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.jwtToken = action.payload.jwtToken;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ user: { username: string; email: string }; jwtToken: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.jwtToken = action.payload.jwtToken;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registration failed";
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        logout.fulfilled,
        (state, action: PayloadAction<{ user: null; jwtToken: null }>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.jwtToken = action.payload.jwtToken;
        }
      );
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.jwtToken;

export default authSlice.reducer;
