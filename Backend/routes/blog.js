const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogbyId,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogsByUser,
} = require("../controllers/blog");

router.get("/blogs", getAllBlogs);

router.post("/blogs", createBlog);

router.get("/blogs/:slug", getBlogbyId);

router.delete("/blogs/:id", deleteBlog);

router.put("/blogs/:id", updateBlog);

router.get("/blogs/user/:userId", getBlogsByUser);

// router.get("/blogs/:id/likes");

module.exports = router;
