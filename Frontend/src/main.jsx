// // import React from "react";
// // import { StrictMode, useLayoutEffect } from "react";
// // import { createRoot } from "react-dom/client";
// // import {
// //   createBrowserRouter,
// //   createRoutesFromElements,
// //   Route,
// //   RouterProvider,
// //   Routes,
// // } from "react-router-dom";
// // import { Provider } from "react-redux";
// // // import { PersistGate } from "redux-persist/integration/react";
// // import ProtectedRoute from "./ProtectedRoute.jsx";
// // import AppInitializer from "./AppInitializer.jsx";
// // import store from "./App/store.js";
// // import AllBlogs from "./components/Blogs.jsx";
// // import Layout from "./components/Layout.jsx";
// // import About from "./components/About.jsx";
// // import Contact from "./components/Contact.jsx";
// // import UserProfile from "./components/UserProfile.jsx";
// // import Blog from "./components/Blog.jsx";
// // import UserBlogs from "./components/UserBlogs.jsx";
// // import AuthWrapper from "./components/AuthForms.jsx";

// // import "./index.css";
// // // import App from "./App.jsx";
// // import CreateBlog from "./components/CreateBlog.jsx";

// // const router = createBrowserRouter(
// //   createRoutesFromElements(
// //     <>
// //       <Route path="/" element={<Layout />}>
// //         <Route path="" element={<AllBlogs />} />
// //         <Route path="about" element={<About />} />
// //         <Route path="contact" element={<Contact />} />
// //         <Route element={<ProtectedRoute />}>
// //           <Route path="user/:id" element={<UserProfile />} />
// //           <Route path="blog/:slug" element={<Blog />} />
// //           <Route path=":id/my-blogs" element={<UserBlogs />} />
// //           <Route path="create-blog" element={<CreateBlog />} />
// //           <Route path="blog/edit/:slug" element={<CreateBlog />} />
// //         </Route>
// //       </Route>
// //       <Route path="/auth" element={<AuthWrapper />} />
// //     </>
// //   )
// // );

// // createRoot(document.getElementById("root")).render(
// //   <StrictMode>
// //     <Provider store={store}>
// //       <AppInitializer>
// //         <RouterProvider router={router} />
// //       </AppInitializer>
// //     </Provider>
// //   </StrictMode>
// // );

// import React from "react";
// import { StrictMode, useLayoutEffect } from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   Routes,
// } from "react-router-dom";
// import { Provider } from "react-redux";
// // import { PersistGate } from "redux-persist/integration/react";
// import ProtectedRoute from "./ProtectedRoute.jsx";
// import AppInitializer from "./AppInitializer.jsx";
// import store from "./App/store.js";
// import AllBlogs from "./components/Blogs.jsx";
// import Layout from "./components/Layout.jsx";
// import About from "./components/About.jsx";
// import Contact from "./components/Contact.jsx";
// import UserProfile from "./components/UserProfile.jsx";
// import Blog from "./components/Blog.jsx";
// import UserBlogs from "./components/UserBlogs.jsx";
// import AuthWrapper from "./components/AuthForms.jsx";
// import { ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

// import "./index.css";
// // import App from "./App.jsx";
// import CreateBlog from "./components/CreateBlog.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<Layout />}>
//         <Route path="" element={<AllBlogs />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route element={<ProtectedRoute />}>
//           <Route path="user/:id" element={<UserProfile />} />
//           <Route path="blog/:slug" element={<Blog />} />
//           <Route path=":id/my-blogs" element={<UserBlogs />} />
//           <Route path="create-blog" element={<CreateBlog />} />
//           <Route path="blog/edit/:slug" element={<CreateBlog />} />
//         </Route>
//       </Route>
//       <Route path="/auth" element={<AuthWrapper />} />
//     </>
//   )
// );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <AppInitializer>
//         <RouterProvider router={router} />
//       </AppInitializer>
//     </Provider>
//     {/* Include ToastContainer here */}
//     <ToastContainer
//       position="top-right"
//       autoClose={3000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover

//     />
//   </StrictMode>
// );

import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AppInitializer from "./AppInitializer.jsx";
import store from "./App/store.js";
import AllBlogs from "./components/Blogs.jsx";
import Layout from "./components/Layout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Blog from "./components/Blog.jsx";
import UserBlogs from "./components/UserBlogs.jsx";
import AuthWrapper from "./components/AuthForms.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import CreateBlog from "./components/CreateBlog.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<AllBlogs />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route element={<ProtectedRoute />}>
          <Route path="user/:id" element={<UserProfile />} />
          <Route path="blog/:slug" element={<Blog />} />
          <Route path=":id/my-blogs" element={<UserBlogs />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="blog/edit/:slug" element={<CreateBlog />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthWrapper />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppContent /> {/* Use a wrapper component to manage the theme state */}
    </Provider>
  </StrictMode>
);

// New component to encapsulate theme logic and render the main app
function AppContent() {
  const [currentToastTheme, setCurrentToastTheme] = useState(() => {
    // Initialize theme from localStorage on initial render
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Listen for changes to localStorage 'app-theme'
    const handleStorageChange = () => {
      setCurrentToastTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", handleStorageChange);

    // Initial sync with documentElement for CSS
    document.documentElement.setAttribute("theme", currentToastTheme);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [currentToastTheme]); // Re-run effect if currentToastTheme changes (e.g., initially)

  return (
    <>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
      {/* ToastContainer with dynamic theme */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={currentToastTheme} // Pass the dynamic theme here
      />
    </>
  );
}
