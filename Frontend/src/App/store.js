import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlicer";
import blogReducer from "../features/blogSlicer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
});
export default store;
