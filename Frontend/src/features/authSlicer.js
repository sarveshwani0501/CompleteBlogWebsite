import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue("User login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/logout`);
      return response.data;
    } catch (error) {
      rejectWithValue("Logout Failed");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  token: null,
  isAuthenticated: false,
  error: null,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "fulfilled";
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.error | "Register failed";
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.error || "Login failed";
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "fulfilled";
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.error || "Logout failed";
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const selectisAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
