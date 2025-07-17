// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:8000/api";
// axios.defaults.withCredentials = true;
// export const registerUser = createAsyncThunk(
//   "user/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/signup`, userData);
//       return response.data.user;
//     } catch (error) {
//       const message = error.response?.data?.message || "User login failed";
//       return rejectWithValue(message);
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/login`, userData);
//       return response.data;
//     } catch (error) {
//       const message = error.response?.data?.message || "User login failed";
//       return rejectWithValue(message);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "user/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/auth/logout`);
//       return response.data;
//     } catch (error) {
//       rejectWithValue("Logout Failed");
//     }
//   }
// );

// const initialState = {
//   user: null,
//   loading: false,
//   token: null,
//   isAuthenticated: false,
//   error: null,
//   status: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       if (state.user) state.isAuthenticated = true;
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.status = "pending";
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.status = "fulfilled";
//         // console.log(action.payload);
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.status = "rejected";
//         state.error = action.payload.error | "Register failed";
//         state.loading = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.status = "pending";
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log(action.payload);
//         state.status = "fulfilled";
//         state.loading = false;
//         state.error = null;
//         state.isAuthenticated = true;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = "rejected";
//         state.error = action.payload.error || "Login failed";
//         state.loading = false;
//         state.isAuthenticated = false;
//       })
//       .addCase(logoutUser.pending, (state) => {
//         state.status = "pending";
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.status = "fulfilled";
//         state.loading = false;
//         state.error = null;
//         state.isAuthenticated = false;
//         state.token = null;
//         state.user = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.status = "rejected";
//         state.error = action.payload.error || "Logout failed";
//         state.loading = false;
//         state.isAuthenticated = true;
//       });
//   },
// });

// export const selectisAuthenticated = (state) => state.auth.isAuthenticated;
// export const selectUser = (state) => state.auth.user;
// export const selectAuthError = (state) => state.auth.error;
// export const selectToken = (state) => state.auth.token;
// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const API_URL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      // Success toast for registration
      toast.success("Registration successful! Please log in. 🎉");
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      // Error toast for registration
      toast.error(`Registration failed: ${message} 😟`);
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      // Success toast for login
      toast.success("Logged in successfully! Welcome back. 👋");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "User login failed";
      // Error toast for login
      toast.error(`Login failed: ${message} ❌`);
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/logout`);
      // Success toast for logout
      toast.info("Logged out successfully. See you soon! 👋");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      // Error toast for logout
      toast.error(`Logout failed: ${message} 😥`);
      return rejectWithValue(message);
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
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (state.user) state.isAuthenticated = true;
    },
  },
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
        // Ensure error payload is correctly accessed
        state.error = action.payload || "Register failed";
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
        // Ensure error payload is correctly accessed
        state.error = action.payload || "Login failed";
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
        // Ensure error payload is correctly accessed
        state.error = action.payload || "Logout failed";
        state.loading = false;
        state.isAuthenticated = true; // User might still be authenticated on frontend if logout failed on backend
      });
  },
});

export const selectisAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;