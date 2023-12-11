import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { RootState } from "../../app/store";

interface AuthState {
  user: null | {
    username: string;
    userId: string;
    email: string;
    avatarPath: string;
    createdAt: string;
  };
  jwtToken: null | string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  jwtToken: null,
  status: "idle",
  error: null,
};

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

if (storedUser && storedToken) {
  initialState.user = JSON.parse(storedUser);
  initialState.jwtToken = storedToken;
}

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

    return response;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(
        credentials.username,
        credentials.password
      );

      const { jwtToken, userId, username, email, avatarPath, createdAt } = response;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, username, email, avatarPath, createdAt })
      );

      return { user: { userId, username, email, avatarPath, createdAt }, jwtToken };
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
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
        (
          state,
          action: PayloadAction<{
            user: {
              userId: string;
              username: string;
              email: string;
              avatarPath: string | null | undefined;
              createdAt: string | undefined;
            };
            jwtToken: string;
          }>
        ) => {
          state.status = "succeeded";
          state.user = {
            userId: action.payload.user.userId,
            username: action.payload.user.username,
            email: action.payload.user.email,
            avatarPath: action.payload.user.avatarPath || "",
            createdAt: action.payload.user.createdAt || "",
          };
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
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
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
