import React from "react";
import { StrictMode, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./App/store.js";

import AllBlogs from "./components/Blogs.jsx";
import Layout from "./components/Layout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Blog from "./components/Blog.jsx";
import UserBlogs from "./components/UserBlogs.jsx";

import "./index.css";
import App from "./App.jsx";
import CreateBlog from "./components/CreateBlog.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<AllBlogs />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:id" element={<UserProfile />} />
      <Route path="blog/:slug" element={<Blog />} />
      <Route path="/:id/my-blogs" element={<UserBlogs />} />
      <Route path="/create-blog" element={<CreateBlog />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
