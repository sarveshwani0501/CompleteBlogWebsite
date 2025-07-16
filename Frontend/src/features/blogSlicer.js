import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:8000/api";

export const getAllBlogs = createAsyncThunk(
  "blogs/all",
  async (selectedTags, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/blogs`, {
        params: { tags: selectedTags.join(",") },
      });
      console.log(response);
      return response.data.blogs;
    } catch (error) {
      return rejectWithValue("Blogs cannot be retrieved");
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/new",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/blogs`, blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.blog;
    } catch (error) {
      return rejectWithValue("Blog upload failed");
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/blogs/id/${blogId}`);
      return response.data.blog;
    } catch (error) {
      return rejectWithValue("Blog delete failed");
    }
  }
);

export const getBlogById = createAsyncThunk(
  "blogs/id",
  async (blogId, { rejectWithValue }) => {
    try {
      console.log("defef");
      const response = await axios.get(`${API_URL}/blogs/id/${blogId}`);
      return response.data.blog;
    } catch (error) {
      console.error("Thunk error:", error);
      const message = error?.response?.data?.msg;
      //console.log(message);
      return rejectWithValue(message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async (updatedBlog, { rejectWithValue }) => {
    try {
      const blogId = updatedBlog.get("_id");
      console.log(blogId);
      const response = await axios.put(
        `${API_URL}/blogs/id/${blogId}`,
        updatedBlog,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.blog;
    } catch (error) {
      const message = error?.response?.data?.msg;
      //console.log(message);
      return rejectWithValue(message);
    }
  }
);

export const addComment = createAsyncThunk(
  "blog/addComment",
  async (commentBody, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/blogs/comments/${commentBody._id}`,
        commentBody
      );
      return response.data.blog;
    } catch (error) {
      return rejectWithValue("Failed to add comment");
    }
  }
);

export const toggleLikes = createAsyncThunk(
  "/blog/toggleLike",
  async (blog, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/blogs/likes/${blog._id}`,
        blog
      );
      return response.data.blog;
    } catch (error) {
      const message = error?.response?.data?.msg;
      return rejectWithValue(message);
    }
  }
);

function updateBlogInArray(array, updateBlog) {
  const index = array.findIndex((blog) => blog._id === updateBlog._id);
  if (index !== -1) {
    array[index] = updateBlog;
  }
}

function deleteBlogInArray(array, blogId) {
  const index = array.findIndex((blog) => blog._id === blogId);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

const initialState = {
  status: "idle",
  loading: false,
  recentBlogs: [],
  allBlogs: [],
  //userBlogs: [],
  blog: null,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        const blogs = action.payload;
        //state.recentBlogs = blogs.slice(0, 4);
        state.allBlogs = blogs;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        console.log("Dispatching actions", action);
        state.allBlogs.push(action.payload);
        //state.userBlogs.push(action.payload);
        state.recentBlogs = [action.payload, ...state.recentBlogs].slice(0, 4);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        console.log("Dispatching actions", action);
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        deleteBlogInArray(state.allBlogs, action.payload._id);
        deleteBlogInArray(state.recentBlogs, action.payload._id);
        //deleteBlogInArray(state.userBlogs, action.payload.blog._id);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.status = "fulfilled";
        state.loading = false;
      })
      .addCase(getBlogById.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        console.log(state.blog);
        state.error = action.payload;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = true;
        updateBlogInArray(state.allBlogs, action.payload);
        updateBlogInArray(state.recentBlogs, action.payload);
        //updateBlogInArray(state.userBlogs, action.payload.blog);
      })
      .addCase(updateBlog.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.blog = action.payload;
        updateBlogInArray(state.allBlogs, action.payload);
        updateBlogInArray(state.recentBlogs, action.payload);
      })
      .addCase(addComment.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleLikes.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.blog = action.payload;
        console.log(action.payload);
        updateBlogInArray(state.allBlogs, action.payload);
        updateBlogInArray(state.recentBlogs, action.payload);
      })
      .addCase(toggleLikes.pending, (state, action) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLikes.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllBlogs = (state) => state.blog.allBlogs;
export const selectUserBlogs = (state, userId) =>
  state.blog.allBlogs.filter((blog) => blog.author === userId);

export const selectRecentBlogs = (state) => state.blog.recentBlogs;
export const selectCurrentBlog = (state) => state.blog.blog;

export default blogSlice.reducer;
